const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Manejar la actualización de la ubicación del cadete
  socket.on('updateLocation', (location) => {
    console.log('Ubicación actualizada:', location);
    // Hacer lo que necesites con la ubicación, como almacenarla en una base de datos o enviarla a otros clientes conectados
  });

  // Manejar la desconexión del cliente
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

http.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001');
});
