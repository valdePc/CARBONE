// Registrar eventos básicos del Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activado');
});

// Registrar un evento para capturar solicitudes (opcional)
self.addEventListener('fetch', (event) => {
    console.log('Solicitud interceptada:', event.request.url);
});
