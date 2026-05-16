// ============================================================
// servidor_express.js
// Versión migrada de miservidor.js usando Express
// ============================================================

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Esto es necesario en módulos ES (import/export) para poder usar __dirname,
// que nos dice en qué carpeta está corriendo el servidor.
// Con require() (CommonJS) venía automático, con import hay que hacerlo así.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// express() crea la aplicación. Es el equivalente a http.createServer()
// pero con muchísimas más funciones incluidas.
const app = express();

// express.json() le dice a Express que entienda el body de peticiones POST/PUT
// que vengan en formato JSON. Sin esto, req.body sería undefined.
app.use(express.json());

// express.static() sirve automáticamente todos los archivos de la carpeta indicada.
// Antes tenías que hacer fs.readFile() manualmente para CADA archivo HTML.
// Ahora Express los entrega solo cuando el navegador los pide.
// Ejemplo: si existe bienvenida.html, ya se puede ver en http://localhost:1984/bienvenida.html
app.use(express.static(__dirname));


// ============================================================
// RUTAS DE PÁGINAS HTML
// Antes: función mostrarX() con fs.readFile() para cada una.
// Ahora: res.sendFile() con la ruta absoluta del archivo.
// (__dirname + nombre del archivo = ruta completa, que es lo que sendFile necesita)
// ============================================================

// GET / → Página de bienvenida
app.get('/', (req, res) => {
    // sendFile necesita la ruta ABSOLUTA del archivo, por eso usamos path.join + __dirname
    res.sendFile(path.join(__dirname, 'bienvenida.html'));
});

// GET /usuarios → Página de perfil
app.get('/usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, 'perfil.html'));
});

// GET /movimientos → Página de movimientos
app.get('/movimientos', (req, res) => {
    res.sendFile(path.join(__dirname, 'movimientos.html'));
});

// GET /registro → Formulario de registro
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'registro.html'));
});

// GET /saldo → Página de saldo
app.get('/saldo', (req, res) => {
    res.sendFile(path.join(__dirname, 'saldo.html'));
});

// GET /equipo → Página del equipo
app.get('/equipo', (req, res) => {
    res.sendFile(path.join(__dirname, 'equipo.html'));
});

// GET /opinion → Página de opinión
app.get('/opinion', (req, res) => {
    res.sendFile(path.join(__dirname, 'opinion.html'));
});

// GET /prestamo → Página de solicitud de préstamo
app.get('/prestamo', (req, res) => {
    res.sendFile(path.join(__dirname, 'prestamo.html'));
});

// GET /estado-prestamo → Página de estado del préstamo
app.get('/estado-prestamo', (req, res) => {
    res.sendFile(path.join(__dirname, 'estado-prestamo.html'));
});

// GET /credito → Página de límite de crédito
app.get('/credito', (req, res) => {
    res.sendFile(path.join(__dirname, 'limite-credito.html'));
});

// GET /pagos → Página de pagos
app.get('/pagos', (req, res) => {
    res.sendFile(path.join(__dirname, 'pagos.html'));
});


// ============================================================
// ENDPOINTS DE API (devuelven JSON)
// Antes: res.writeHead(200, {'Content-Type': 'application/json'}) + res.end(JSON.stringify(...))
// Ahora: res.json() hace todo eso en UNA sola línea automáticamente.
// ============================================================

// GET /api/usuarios → Lista de usuarios
app.get('/api/usuarios', (req, res) => {
    const usuarios = [
        {
            id: "usr_001",
            nombre: "carlos",
            email: "carlos@email.com",
            telefono: "3312345678",
            status: "activo"
        },
        {
            id: "usr_002",
            nombre: "fernando",
            email: "fernando@email.com",
            telefono: "3398765432",
            status: "activo"
        }
    ];
    // res.json() equivale a writeHead(200, 'application/json') + end(JSON.stringify())
    // Express lo hace todo junto en una línea. Mucho más limpio.
    res.json(usuarios);
});

// GET /api/movimientos → Movimientos financieros
app.get('/api/movimientos', (req, res) => {
    const movimientos = [
        {
            id: "mov_001",
            usuario: "carlos",
            tipo: "cargo",
            monto: 500,
            fecha: "2026-04-20",
            descripcion: "Pago de préstamo semanal"
        },
        {
            id: "mov_002",
            usuario: "carlos",
            tipo: "abono",
            monto: 2000,
            fecha: "2026-04-15",
            descripcion: "Depósito de préstamo aprobado"
        },
        {
            id: "mov_003",
            usuario: "fernando",
            tipo: "cargo",
            monto: 1200,
            fecha: "2026-04-18",
            descripcion: "Pago de préstamo semanal"
        }
    ];
    res.json(movimientos);
});

app.post('/api/registro', (req, res) => {
    // req.body contiene los datos que mandó el cliente (nombre, email, etc.)
    // Por ahora simulamos el registro con datos fijos.
    const nuevoUsuario = {
        id: "usr_003",
        nombre: "Nuevo Usuario",
        email: "nuevo@email.com",
        telefono: "3310000000",
        status: "activo"
    };
    // status(201) = "Created". Antes era res.writeHead(201, ...)
    res.status(201).json({
        status: "exitoso",
        mensaje: "Usuario registrado correctamente",
        usuario: nuevoUsuario
    });
});

// GET /api/saldo → Saldo disponible de los usuarios
app.get('/api/saldo', (req, res) => {
    const saldos = [
        {
            usuario: "carlos",
            saldo_disponible: 7000,
            saldo_total: 10000,
            saldo_usado: 3000
        },
        {
            usuario: "fernando",
            saldo_disponible: 0,
            saldo_total: 15000,
            saldo_usado: 15000
        }
    ];
    res.json(saldos);
});

// GET /api/prestamos → Préstamos activos
app.get('/api/prestamos', (req, res) => {
    const prestamos = [
        {
            usuario: "carlos",
            monto: 5000,
            plazo: 12,
            semanas_pagadas: 4,
            status: "aprobado"
        },
        {
            usuario: "fernando",
            monto: 3000,
            plazo: 8,
            semanas_pagadas: 8,
            status: "pendiente"
        }
    ];
    res.json(prestamos);
});

// GET /api/estado-prestamo → Estado detallado de cada préstamo
app.get('/api/estado-prestamo', (req, res) => {
    const estados = [
        {
            loan_id: "loan_001",
            usuario: "carlos",
            monto: 5000,
            plazo: 12,
            semanas_pagadas: 4,
            semanas_restantes: 8,
            status: "activo"
        },
        {
            loan_id: "loan_002",
            usuario: "fernando",
            monto: 3000,
            plazo: 8,
            semanas_pagadas: 8,
            semanas_restantes: 0,
            status: "pagado"
        }
    ];
    res.json(estados);
});

// GET /api/credito → Límites de crédito por usuario
app.get('/api/credito', (req, res) => {
    const limites = [
        { usuario: "carlos",   limite_total: 10000, limite_usado: 3000,  limite_disponible: 7000 },
        { usuario: "fernando", limite_total: 15000, limite_usado: 15000, limite_disponible: 0 }
    ];
    res.json(limites);
});

// GET /api/pagos → Historial de pagos
app.get('/api/pagos', (req, res) => {
    const pagos = [
        { id: "pago_001", usuario: "carlos",   monto: 500,  fecha: "2026-04-20", status: "completado" },
        { id: "pago_002", usuario: "fernando", monto: 1200, fecha: "2026-04-18", status: "completado" },
        { id: "pago_003", usuario: "fernando", monto: 800,  fecha: "2026-04-30", status: "pendiente"  }
    ];
    res.json(pagos);
});

// GET /arbol → Página del árbol con nombre científico
app.get('/arbol', (req, res) => {
    res.sendFile(path.join(__dirname, 'arbol.html'));
});


// ============================================================
// RUTA 404 — Debe ir AL FINAL, después de todas las demás rutas.
// Express recorre las rutas en orden. Si ninguna coincidió,
// cae aquí. Antes era el else final del if/else gigante.
// app.use() sin ruta específica = "atrapa todo lo que no matcheó arriba"
// ============================================================
app.use((req, res) => {
    res.status(404).send('¡Ups! Esta página se fue a pedir un préstamo y no volvió 💸');
});


// ============================================================
// Iniciar el servidor
// Antes: servidor.listen(puerto, callback)
// Ahora: app.listen(puerto, callback) — exactamente igual pero con Express
// ============================================================
const puerto = 1984;
app.listen(puerto, () => {
    console.log(`Servidor Express corriendo en http://localhost:${puerto}`);
    // Me parece que Express es mucho más ordenado que http puro.
    // El código es más fácil de leer y mantener, y no hay que
    // escribir los headers manualmente en cada respuesta.
});