import http from 'http';
import axios from 'axios';

const servidor = http.createServer(async (req, res) => {

      try{

      const API_KEY ='';
      const response = await axios.get('http://apilayer.net/api/validate?access_key=&number=&country_code=MX&format=1');
      console.log(response.data);
   
    const data = response.data;

    const info = {
      valido:data.valid,
      numero:data.number,
      formato_local:data.local_format,
      formato_internacional:data.international_format,
      pais:data.country_name,
    }


  
    console.log('Alguien me mandó una solicitud');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(info));
      }
        catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: "Error al validar número" }));
    }

    
});

const puerto = 1800;

servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
