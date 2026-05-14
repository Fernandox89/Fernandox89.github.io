import axios from 'axios';

// Consumimos una API de tipo de cambio desde el SERVIDOR (Node.js)
// Esto es diferente a hacerlo desde el navegador — aquí lo ejecuta Node, no Chrome

const URL = 'https://api.exchangerate-api.com/v4/latest/MXN';

axios.get(URL)
  .then(response => {
    const datos = response.data;

    console.log('=== Tipo de cambio del Peso Mexicano ===');
    console.log('Fecha de actualización:', datos.date);
    console.log('1 MXN equivale a:');
    console.log('  USD (Dólar):', datos.rates.USD);
    console.log('  EUR (Euro): ', datos.rates.EUR);
    console.log('  CAD (Dólar canadiense):', datos.rates.CAD);
  })
  .catch(error => {
    console.error('Error al consultar la API:', error.message);
  });