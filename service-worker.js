async function obtenerUbicacion() {
    try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("No se pudo obtener la ubicación");
        const data = await response.json();
        return data.country_name || "Desconocido"; // Retorna el nombre del país
    } catch (error) {
        console.error("Error al obtener la ubicación:", error);
        return "Desconocido";
    }
}

// Modificación del Service Worker (si lo usas)
self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    if (url.includes('ipinfo.io') || url.includes('cdn.jsdelivr.net')) {
        return; // No interceptar estas solicitudes
    }
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
