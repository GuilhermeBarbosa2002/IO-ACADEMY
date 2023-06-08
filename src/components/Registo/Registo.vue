<template>
  <br>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Data e Hora</th>
          <th>Nome do Produto</th>
          <th>Imagem</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="troca in trocas" :key="troca.id">
          <td>{{ formatDate(troca.attributes.createdAt) }}</td>
          <td>{{ troca.attributes.produto.data.attributes.nome }}</td>
          <td>
            <img :src="troca.attributes.produto.data.attributes.imagem" alt="Imagem do Produto" height="50">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trocas: [],
    };
  },
  mounted() {
    this.fetchTrocas();
  },
  methods: {
    fetchTrocas() {
      fetch('http://127.0.0.1:1337/api/trocas?populate=*')
        .then(response => response.json())
        .then(data => {
          this.trocas = data.data;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    formatDate(date) {
      const options = { 
        day: 'numeric', 
        month: 'numeric', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: false
      };
      return new Date(date).toLocaleString('en-US', options);
    },
  },
};

  /*
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
  */

  
</script>

