// http es un módulo de Node.js que permite crear servidores web y manejar solicitudes HTTP.
// Lo usamos para poder recibir peticiones desde el navegador o una extensión de Chrome.
import http from 'http';

// fs es un módulo de Node.js que permite leer, escribir y manipular archivos del sistema.
// Lo usamos para leer archivos HTML y enviarlos como respuesta al navegador.
import fs from 'fs';


// Muestra la página de bienvenida de la extensión Kueski
function darBienvenida(req, res) {
    fs.readFile('bienvenida.html', 'utf8', (error, data) => {
        if (error) {
            // 500 significa "Internal Server Error": algo falló dentro del servidor,
            // no fue culpa del usuario sino del código o del sistema.
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Oh no!!!!');
            return;
        }
        // 200 significa "OK": la solicitud fue exitosa y se devuelve el contenido pedido.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}


// Devuelve un JSON con los datos de los usuarios registrados
function getUsuarios(req, res) {
    // JSON.stringify convierte un objeto de JavaScript a texto en formato JSON,
    // porque res.end() solo puede enviar texto, no objetos directamente.
    const usuarios = [
        {
            id: "usr_001",
            nombre: "Punk",
            email: "punk@email.com",
            telefono: "3312345678",
            status: "activo"
        },
        {
            id: "usr_002",
            nombre: "Alvaro",
            email: "alvaro@email.com",
            telefono: "3398765432",
            status: "activo"
        }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(usuarios));
}


function mostrarPerfil(req, res) {
    fs.readFile('perfil.html', 'utf8', (error, data) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Oh no!!!!');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}


function mostrarMovimientos(req, res) {
    fs.readFile('movimientos.html', 'utf8', (error, data) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Oh no!!!!');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}


// Devuelve un JSON con los movimientos financieros del usuario
function getMovimientos(req, res) {
    const movimientos = [
        {
            id: "mov_001",
            usuario: "Punk",
            tipo: "cargo",
            monto: 500,
            fecha: "2026-04-20",
            descripcion: "Pago de préstamo semanal"
        },
        {
            id: "mov_002",
            usuario: "Punk",
            tipo: "abono",
            monto: 2000,
            fecha: "2026-04-15",
            descripcion: "Depósito de préstamo aprobado"
        },
        {
            id: "mov_003",
            usuario: "Alvaro",
            tipo: "cargo",
            monto: 1200,
            fecha: "2026-04-18",
            descripcion: "Pago de préstamo semanal"
        }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(movimientos));
}


// ── ENDPOINTS DE REGISTRO Y SALDO (mis endpoints) ──────────────────────────

// POST /api/registro — Registra un nuevo usuario en Kueski
// Parámetros obligatorios: nombre, email, password, telefono
// Códigos: 201 creado | 400 datos inválidos | 409 email duplicado | 500 error servidor
function registrarUsuario(req, res) {
    const nuevoUsuario = {
        id: "usr_003",
        nombre: "Nuevo Usuario",
        email: "nuevo@email.com",
        telefono: "3310000000",
        status: "activo"
    };
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: "exitoso",
        mensaje: "Usuario registrado correctamente",
        usuario: nuevoUsuario
    }));
}

function mostrarRegistro(req, res) {
    fs.readFile('registro.html', 'utf8', (error, data) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el formulario de registro');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}


// GET /api/saldo — Devuelve el saldo disponible de los usuarios
// Parámetros opcionales: usuario (filtra por nombre)
// Códigos: 200 exitoso | 404 usuario no encontrado | 500 error servidor
function getSaldo(req, res) {
    const saldos = [
        {
            usuario: "Punk",
            saldo_disponible: 7000,
            saldo_total: 10000,
            saldo_usado: 3000
        },
        {
            usuario: "Alvaro",
            saldo_disponible: 0,
            saldo_total: 15000,
            saldo_usado: 15000
        }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(saldos));
}

function mostrarSaldo(req, res) {
    fs.readFile('saldo.html', 'utf8', (error, data) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el saldo');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}


function mostrarEquipo(req, res) {
    fs.readFile('equipo.html', 'utf8', (error, data) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Oh no!!!!');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

function mostrarOpinion(req, res) {
    fs.readFile('opinion.html', 'utf8', (error, data) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Oh no!!!!');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}


function manejarRuta404(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    // Mensaje más divertido para rutas no encontradas
    res.end('¡Ups! Esta página se fue a pedir un préstamo y no volvió 💸');
}


// http.createServer crea un servidor HTTP que escucha peticiones entrantes.
const servidor = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        darBienvenida(req, res);
    } else if (url === '/api/usuarios') {
        getUsuarios(req, res);
    } else if (url === '/api/movimientos') {
        getMovimientos(req, res);
    } else if (url === '/api/registro') {
        registrarUsuario(req, res);
    } else if (url === '/api/saldo') {
        getSaldo(req, res);
    } else if (url === '/usuarios') {
        mostrarPerfil(req, res);
    } else if (url === '/movimientos') {
        mostrarMovimientos(req, res);
    } else if (url === '/registro') {
        mostrarRegistro(req, res);
    } else if (url === '/saldo') {
        mostrarSaldo(req, res);
    } else if (url === '/equipo') {
        mostrarEquipo(req, res);
    } else if (url === '/opinion') {
        mostrarOpinion(req, res);
    } else {
        manejarRuta404(req, res);
    }

    else if (url === '/api/prestamos') {
      getPrestamos(req, res);
  } else if (url === '/prestamo') {
      solicitarPrestamo(req, res);
  } else if (url === '/api/estado-prestamo') {
      getEstadoPrestamo(req, res);
  } else if (url === '/estado-prestamo') {
      mostrarEstadoPrestamo(req, res);
  } else if (url === '/api/credito') {
      getLimiteCredito(req, res);
  } else if (url === '/credito') {
      mostrarLimiteCredito(req, res);
  } else if (url === '/api/pagos') {
      getPagos(req, res);
  } else if (url === '/pagos') {
      mostrarPagos(req, res);
  }
});

const puerto = 1984;
servidor.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});

// APIs correspondientes a mis compañeros de mesa
function getPrestamos(req, res) {
            const prestamos = [
            {
                usuario: "Punk",
                monto: 5000,
                plazo: 12,
                semanas_pagadas: 4,
                status: "aprobado"
            },
            {
                usuario: "Alvaro",
                monto: 3000,
                plazo: 8,
                semanas_pagadas: 8,
                status: "pendiente"
            }
            ];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(prestamos));
    }

    function solicitarPrestamo(req, res) {
        fs.readFile('prestamo.html', 'utf8', (error, data) => {

        if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error al cargar la solicitud de préstamo');
        return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    }

    function getEstadoPrestamo(req, res) {
        const prestamos = [
            {
            loan_id: "loan_001",
            usuario: "Punk",
            monto: 5000,
            plazo: 12,
            semanas_pagadas: 4,
            semanas_restantes: 8,
            status: "activo"
            },
            {
            loan_id: "loan_002",
            usuario: "Alvaro",
            monto: 3000,
            plazo: 8,
            semanas_pagadas: 8,
            semanas_restantes: 0,
            status: "pagado"
            }
        ];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(prestamos));
    }

    function mostrarEstadoPrestamo(req, res) {
        fs.readFile('estado-prestamo.html', 'utf8', (error, data) => {
            if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el estado del préstamo');
            return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
    // Equipo
    //  api/credito
    function getLimiteCredito(req, res) {
        const limites = [
            { usuario: "Punk", limite_total: 10000, limite_usado: 3000, limite_disponible: 7000 },
            { usuario: "Alvaro", limite_total: 15000, limite_usado: 15000, limite_disponible: 0 }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(limites));
    }
    function mostrarLimiteCredito(req, res) {
        fs.readFile('limite-credito.html', 'utf8', (error, data) => {
            if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el estado del préstamo');
            return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    // api/pagos
    function getPagos(req, res) {
        const pagos = [
            { id: "pago_001", usuario: "Punk", monto: 500, fecha: "2026-04-20", status: "completado" },
            { id: "pago_002", usuario: "Alvaro", monto: 1200, fecha: "2026-04-18", status: "completado" },
            { id: "pago_003", usuario: "Alvaro", monto: 800, fecha: "2026-04-30", status: "pendiente" }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(pagos));
    }

    function mostrarPagos(req, res) {
        fs.readFile('pagos.html', 'utf8', (error, data) => {
            if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el estado del préstamo');
            return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }