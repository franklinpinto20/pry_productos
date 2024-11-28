const { Client } = require('pg');

// Configuración de la conexión
const client = new Client({
  host: 'localhost',     // Dirección del servidor PostgreSQL (puede ser localhost o IP remota)
  port: 5432,            // Puerto por defecto de PostgreSQL
  user: 'postgres',    // Tu usuario de PostgreSQL
  password: 'Admin', // Tu contraseña de PostgreSQL
  database: 'Test' // El nombre de tu base de datos
});

// Conectar a PostgreSQL
client.connect()
  .then(() => {
    console.log('Conexión exitosa a PostgreSQL');
    
    // Realizar una consulta simple (opcional, para probar la conexión)
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log('Hora actual del servidor:', res.rows[0]);
    
    // Cerrar la conexión
    client.end();
  })
  .catch(err => {
    console.error('Error al conectar a PostgreSQL:', err.stack);
  });