<template>
  <div>
    <Pontos></Pontos>
    <section style="background-color: #eee;">
      <div class="row">
        <div class="col-6" v-for="(produto, index) in produtos" :key="index">
          <div class="card" :class="{ 'disabled-card': produto.disabled }" style="border-radius: 15px; margin-bottom: 20px;" @click="openModal(produto)" :style="{ cursor: produto.disabled ? 'default' : 'pointer' }">
            <img :src="produto.imagem" class="card-img-top" alt="Imagem do Produto" style="max-height: 100px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">{{ produto.nome }}</h5>
              <p class="card-text">{{ produto.descricao }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ProductModal v-if="showModal" :produto="selectedProduct" :showModal="showModal" @closeModal="closeModal" />
  </div>
</template>


<script>
import produtosData from '../../JSON/produtos.json';
import Pontos from './Pontos.vue';
import ProductModal from './ProductModal.vue';

export default {
  components:{
    Pontos,
    ProductModal
  },
  data() {
    return {
      produtos: [],
      points: 0,
      timer: null,
      showModal: false,
      selectedProduct: null
    };
  },

  mounted() {
    this.produtos = produtosData.map(produto => {
      return {
        ...produto,
        disabled: true
      };
    });
    this.points = localStorage.getItem('points') || 0;
    this.startTimer();
  },

  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.points = localStorage.getItem('points')
        for (let i = 0; i < this.produtos.length; i++) {
          const produto = this.produtos[i];
          produto.disabled = this.points < produto.pontos;
        }
      }, 100);
    },
  
    openModal(produto) {
      if (!produto.disabled) {
        this.selectedProduct = produto;
        this.showModal = true;
      }
    },
  
    closeModal() {
      this.showModal = false;
    }
  },
};
</script>

<style>
.row {
  bs-gutter-x: 1rem;
}

.disabled-card {
  opacity: 0.5;
  /* Apply desired styling to disabled cards */
}
</style>
