<template>
  <div class="round-div">
    <div class="icon-container">
      <font-awesome-icon icon="info-circle" />
    </div>
    <div class="qr-code-container">
      <img ref="qrCodeImg" alt="QR Code" @click="handleQRCodeRead" />
    </div>
    <p class="cod-utf8">{{ codUTF8 }}</p>
    <p class="points-text">Pontos: <span>{{ points }}</span></p>
  </div>
  <br>
</template>

<script>
import QRCode from 'qrcode';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCircleInfo);

// Importe a biblioteca qrcode-reader
import QRCodeReader from 'qrcode-reader';
import jsQR from 'jsqr';

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      qrCodeValue: 'https://ioeduc.iotech.pt/',
      codUTF8: '',
      points: 0
    };
  },
  mounted() {
    this.generateQRCode();
    this.generateCodUTF8();
    this.points = localStorage.getItem('points') || 0;
    setInterval(this.incrementPoints, 6000);
  },
  methods: {
    generateQRCode() {
      const qrCodeImg = this.$refs.qrCodeImg;

      QRCode.toDataURL(this.qrCodeValue)
        .then(url => {
          qrCodeImg.src = url;
        })
        .catch(error => {
          console.error('Erro ao gerar o código QR:', error);
        });
    },
    generateCodUTF8() {
      const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      this.codUTF8 = randomCode;
    },
    incrementPoints() {
      this.points++;
      localStorage.setItem('points', this.points);
    },
    handleQRCodeRead() {
      const qrCodeImg = this.$refs.qrCodeImg;

      // Crie uma nova instância de QrCodeReader
      const qrReader = new QrCodeReader();

      // Configure a imagem do QR code
      qrReader.decode(qrCodeImg.src, (error, result) => {
        if (error) {
          console.error('Erro ao ler o QR code:', error);
        } else {
          console.log('QR code lido:', result);

          // Use a biblioteca jsQR para decodificar os dados do QR code
          const qrData = jsQR(result.imageData, result.width, result.height);
          if (qrData) {
            console.log('Dados do QR code:', qrData.data);
            // Ação a ser executada quando o QR code é lido por outro dispositivo
            this.points += 10; // Incrementar 10 pontos
            localStorage.setItem('points', this.points); // Atualizar a localStorage
            alert('QR code lido por outro dispositivo!'); // Exibir um alerta
          }
        }
      });
    }
  },
};
</script>


  
<style>
.round-div {
  position: relative;
  /* Add position: relative to the parent div */
  width: 90%;
  height: 28vh;
  border-radius: 10%;
  background-color: rgb(255, 255, 255);
  margin-left: 5%;
  margin-top: 5%;
  margin-right: 50%;
  padding-bottom: 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code-container {
  margin-bottom: 5px;
}

.round-div img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.cod-utf8 {
  font-size: 12px;
  font-weight: bold;
}

.icon-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.icon-container svg {
  width: 20px;
  height: 20px;
  padding-right: 10px;
  padding-top: 10px;
}

.points-text {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 10px;
  font-size: 14px;
  font-weight: bold;
}

.points-text span {
  margin-left: 5px;
}
</style>
