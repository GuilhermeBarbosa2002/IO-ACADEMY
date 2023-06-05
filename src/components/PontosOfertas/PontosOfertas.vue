<template>
    <div>
      <div id="qrcode"></div>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  export default {
    mounted() {
      const socket = io('http://localhost:3000');
  
      socket.on('connect', () => {
        console.log('Conectado ao servidor WebSocket');
  
        // Simulação da leitura do QR code pelo cliente
        const qrCodeData = 'Dados do QR code';
        socket.emit('qrCodeRead', qrCodeData);
      });
  
      socket.on('qrCodeNotification', (data) => {
        console.log('Notificação de QR code:', data);
  
        // Exibir a notificação no cliente ou realizar outras ações
        alert('QR code lido por outro dispositivo!');
      });
    }
  };
  </script>
  