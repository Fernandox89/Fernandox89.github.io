/* ============================================================
 EJERCICIO 12: Parámetros en rutas
 EJERCICIO INVENTADO:
 "Como usuario de la app, quiero poder consultar mi información,
  mis préstamos y mis pagos usando mi ID de usuario en la URL,
  sin tener que recibir los datos de todos los demás usuarios."
 ============================================================*/

import express from 'express';
const app = express();
app.use(express.json());

// Base de datos simulada
const usuarios = [
    { id: "usr_001", nombre: "carlos",   email: "carlos@email.com",   telefono: "3312345678", status: "activo" },
    { id: "usr_002", nombre: "fernando", email: "fernando@email.com", telefono: "3398765432", status: "activo" }
];

const prestamos = [
    { id: "loan_001", usuario_id: "usr_001", monto: 5000, plazo: 12, semanas_pagadas: 4,  semanas_restantes: 8, status: "activo" },
    { id: "loan_002", usuario_id: "usr_002", monto: 3000, plazo: 8,  semanas_pagadas: 8,  semanas_restantes: 0, status: "pagado" }
];

const pagos = [
    { id: "pago_001", usuario_id: "usr_001", monto: 500,  fecha: "2026-04-20", status: "completado" },
    { id: "pago_002", usuario_id: "usr_002", monto: 1200, fecha: "2026-04-18", status: "completado" },
    { id: "pago_003", usuario_id: "usr_002", monto: 800,  fecha: "2026-04-30", status: "pendiente"  }
];

const saldos = [
    { usuario_id: "usr_001", saldo_disponible: 7000,  saldo_total: 10000, saldo_usado: 3000  },
    { usuario_id: "usr_002", saldo_disponible: 0,     saldo_total: 15000, saldo_usado: 15000 }
];


// ── RUTA 1: Obtener un usuario por su ID ─────────────────────────────────────
// :id es el parámetro — cambia según lo que escriba el usuario en la URL.
// req.params.id captura ese valor.
//
// Prueba en navegador o Postman:
//   GET http://localhost:1984/api/usuarios/usr_001
//   GET http://localhost:1984/api/usuarios/usr_002
//       http://localhost:1984/api/usuarios/usr_999 este debe dar error 404 porque no existe
app.get('/api/usuarios/:id', (req, res) => {
    // req.params.id contiene lo que vino en la URL (ej: "usr_001")
    const id = req.params.id;

    // .find() busca el primer elemento del array que cumpla la condición
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        // 404 = No encontrado. El usuario con ese ID no existe.
        return res.status(404).json({ error: `No existe el usuario con id: ${id}` });
    }

    // 200 = OK. Se encontró el usuario.
    res.json(usuario);
});


// ── RUTA 2: Obtener los préstamos de un usuario específico ───────────────────
// Combina dos parámetros de contexto: el usuario y el recurso que queremos.
// Esto sigue el patrón REST: /recurso-padre/:id/recurso-hijo
//
// Prueba:
//   GET http://localhost:1984/api/usuarios/usr_001/prestamos
//   GET http://localhost:1984/api/usuarios/usr_002/prestamos
app.get('/api/usuarios/:id/prestamos', (req, res) => {
    const id = req.params.id;

    // Verificamos primero que el usuario exista
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).json({ error: `No existe el usuario con id: ${id}` });
    }

    // .filter() devuelve TODOS los elementos que cumplan la condición
    // (un usuario puede tener varios préstamos)
    const prestamosDelUsuario = prestamos.filter(p => p.usuario_id === id);

    res.json({
        usuario: usuario.nombre,
        total_prestamos: prestamosDelUsuario.length,
        prestamos: prestamosDelUsuario
    });
});


// ── RUTA 3: Obtener los pagos de un usuario específico ───────────────────────
// Misma lógica que la ruta anterior pero para pagos.
//
// Prueba:
//   GET http://localhost:1984/api/usuarios/usr_002/pagos
app.get('/api/usuarios/:id/pagos', (req, res) => {
    const id = req.params.id;

    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).json({ error: `No existe el usuario con id: ${id}` });
    }

    const pagosDelUsuario = pagos.filter(p => p.usuario_id === id);

    // Si el usuario existe pero no tiene pagos, devolvemos array vacío (no es un error)
    res.json({
        usuario: usuario.nombre,
        total_pagos: pagosDelUsuario.length,
        pagos: pagosDelUsuario
    });
});


// ── RUTA 4: Obtener el saldo de un usuario específico ────────────────────────
// Prueba:
//   GET http://localhost:1984/api/usuarios/usr_001/saldo
app.get('/api/usuarios/:id/saldo', (req, res) => {
    const id = req.params.id;

    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).json({ error: `No existe el usuario con id: ${id}` });
    }

    const saldoDelUsuario = saldos.find(s => s.usuario_id === id);

    res.json({
        usuario: usuario.nombre,
        ...saldoDelUsuario   // spread operator: despliega todas las propiedades del objeto
    });
});


// ── RUTA 5: Obtener un préstamo específico por su ID ─────────────────────────
// Aquí el parámetro no es el usuario sino el ID del préstamo directamente.
//
// Prueba:
//   GET http://localhost:1984/api/prestamos/loan_001
//   GET http://localhost:1984/api/prestamos/loan_999  <- debe dar 404
app.get('/api/prestamos/:loan_id', (req, res) => {
    const loan_id = req.params.loan_id;

    const prestamo = prestamos.find(p => p.id === loan_id);

    if (!prestamo) {
        return res.status(404).json({ error: `No existe el préstamo con id: ${loan_id}` });
    }

    // Buscamos también el nombre del usuario para darlo en la respuesta
    const usuario = usuarios.find(u => u.id === prestamo.usuario_id);

    res.json({
        ...prestamo,
        nombre_usuario: usuario ? usuario.nombre : "Desconocido"
    });
});


// 404 para rutas no definidas
app.use((req, res) => {
    res.status(404).json({ error: '¡Ups! Esta página se fue a pedir un préstamo y no volvió 💸' });
});

app.listen(1984, () => {
    console.log('Servidor corriendo en http://localhost:1984');
    console.log('\nRutas con parámetros disponibles:');
    console.log('  GET /api/usuarios/:id');
    console.log('  GET /api/usuarios/:id/prestamos');
    console.log('  GET /api/usuarios/:id/pagos');
    console.log('  GET /api/usuarios/:id/saldo');
    console.log('  GET /api/prestamos/:loan_id');
});