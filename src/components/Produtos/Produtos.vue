

<template>
  <div>
    <Pontos></Pontos>
    <section style="background-color: #eee;">
      <div class="row">
        <div class="col-6" v-for="(produto, index) in produtos" :key="index">
          <div class="card" :class="{ 'disabled-card': produto.disabled }"  style="border-radius: 15px; margin-bottom: 20px;" @click="openModal(produto)">
            <img :src="produto.attributes.imagem" class="card-img-top" alt="Imagem do Produto"
              style="height: 150px; object-fit: cover; padding-top: 5%;" />
            <div class="card-body">
              <h5 class="card-title">{{ produto.attributes.nome }}</h5>
              <p>{{ produto.attributes.categoria.data.attributes.nome }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ProductModal v-if="showModal" :produto="selectedProduct" :showModal="showModal" @closeModal="closeModal" />
  </div>
</template>

<script>
import Pontos from './Pontos.vue';
import ProductModal from './ProductModal.vue';

export default {
  components: {
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
    this.fetchProdutos(); // Chama o método fetchProdutos ao montar o componente
    this.points = localStorage.getItem('points') || 0;
    this.startTimer();
  },

  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.points = localStorage.getItem('points');
        for (let i = 0; i < this.produtos.length; i++) {
          const produto = this.produtos[i];
          produto.disabled = this.points < produto.attributes.pontos;
        }
      }, 100);
    },

    fetchProdutos() {
      fetch('http://127.0.0.1:1337/api/produtos?populate=*')
        .then(response => response.json())
        .then(data => {
          this.produtos = data.data.map(produto => ({
            ...produto,
            disabled: true
          }));
        })
        .catch(error => {
          console.error('Erro ao obter produtos:', error);
        });
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
  }
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

.card{
  margin-left: 5%;
  margin-right: 5%;
}
</style>
