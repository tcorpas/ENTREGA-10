const OPPONENT_HEIGHT = 5,
    OPPONENT_PICTURE = "assets/malo.png",
    OPPONENT_PICTURE_DEAD = "assets/malo_muerto.png",
    OPPONENT_SPEED = 5,
    OPPONENT_WIDTH = 5,
    GAME_OVER_PICTURE = "assets/game_over.png",
    KEY_LEFT = "LEFT",
    KEY_RIGHT = "RIGHT",
    KEY_SHOOT = "SHOOT",
    MIN_TOUCHMOVE = 20,
    PLAYER_HEIGHT = 5,
    PLAYER_PICTURE = "assets/bueno.png",
    PLAYER_PICTURE_DEAD = "assets/bueno_muerto.png",
    PLAYER_SPEED = 20,
    PLAYER_WIDTH = 5,
    SHOT_HEIGHT = 1.5,
    SHOT_SPEED = 20,
    SHOT_PICTURE_PLAYER = "assets/shot1.png",
    SHOT_PICTURE_OPPONENT = "assets/shot2.png",
    SHOT_WIDTH = 1.5;

function getRandomNumber (range) {
    return Math.floor(Math.random() * range);
}

function collision (div1, div2) {
    const a = div1.getBoundingClientRect(),
        b = div2.getBoundingClientRect();
    return !(a.bottom < b.top || a.top > b.bottom || a.right < b.left || a.left > b.right);

}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // El Service Worker se ha registrado con éxito
        console.log('Service Worker registrado:', registration);
      })
      .catch(function(error) {
        // Error al registrar el Service Worker
        console.error('Error al registrar el Service Worker:', error);
      });
}

// Verificar si la PWA ya está instalada
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    hideInstallButton(); // La PWA ya está instalada, ocultar el botón de instalación
  } else {
    showInstallButton(); // La PWA no está instalada, mostrar el botón de instalación
  }
  
  // Función para instalar la PWA
  function installPWA() {
    const installButton = document.getElementById('install-button');
  
    // Ocultar el botón de instalación
    installButton.style.display = 'none';
  
    // Registrar el Service Worker y mostrar el mensaje de instalación
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      const promptEvent = event;
      promptEvent.prompt();
  
      // Escuchar el resultado de la instalación
      promptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // La PWA fue instalada
          hideInstallButton();
        } else {
          // La instalación de la PWA fue cancelada
          showInstallButton();
        }
      });
    });
  }
  
  // Función para mostrar el botón de instalación
  function showInstallButton() {
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block';
  }
  
  // Función para ocultar el botón de instalación
  function hideInstallButton() {
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'none';
  }
  

var game;
document.addEventListener("DOMContentLoaded", () => {
        game = new Game();
        game.start();
    }
);

  