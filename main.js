const { app, BrowserWindow } = require("electron");

let mainWindow; // Declaración global de la ventana principal

// Evento que se ejecuta cuando la aplicación está lista
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: false, // Mejora de seguridad al desactivar Node.js en el frontend
        },
        icon: __dirname + "/image/android-chrome-192x192-removebg-preview.png" // Ruta al icono
    });

    // Cargar el archivo HTML en la ventana principal
    mainWindow.loadFile("index.html").catch((err) => {
        console.error("Error al cargar index.html:", err);
    });

    // Abrir herramientas de desarrollo en modo desarrollo (opcional)
    if (process.env.NODE_ENV === "development") {
        mainWindow.webContents.openDevTools();
    }
});

// Cerrar la aplicación cuando todas las ventanas estén cerradas
app.on("window-all-closed", () => {
    // En macOS, las aplicaciones suelen permanecer abiertas hasta que el usuario las cierra explícitamente
    if (process.platform !== "darwin") app.quit();
});

// Manejar la reactivación de la aplicación (especialmente para macOS)
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = new BrowserWindow({
            width: 1280,
            height: 720,
            webPreferences: {
                nodeIntegration: false,
            },
        });
        mainWindow.loadFile("index.html").catch((err) => {
            console.error("Error al cargar index.html:", err);
        });
    }
});
