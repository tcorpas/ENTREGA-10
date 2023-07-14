self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('app-cache').then(function(cache) {
        return cache.addAll([
          '/',
          'ruta/al/archivo1',
          'ruta/al/archivo2',
          // Agrega aquí los archivos que deseas almacenar en caché
        ]);
      })
    );
  });
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName !== 'app-cache';
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          // El recurso se encuentra en la caché, lo devolvemos
          return response;
        } else {
          // El recurso no se encuentra en la caché, lo buscamos en la red
          return fetch(event.request);
        }
      })
    );
  });