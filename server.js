const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const server = http.createServer();
const io = socketIO(server);

// Configuração do CORS
const corsOptions = {
  origin: '*', // ou a lista de domínios permitidos separados por vírgula
};

// Aplicar middleware CORS ao servidor WebSocket
io.use((socket, next) => {
  cors(corsOptions)(socket.request, socket.request.res, next);
});

// Resto do código do servidor WebSocket
// ...


io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('qrCodeRead', (data) => {
    console.log('QR code lido:', data);

    // Lógica adicional com base na notificação do QR code

    socket.broadcast.emit('qrCodeNotification', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor WebSocket iniciado na porta ${port}`);
});
