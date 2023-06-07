<template>
  <button style="margin-left: 30%;" class="btn btn-primary mt-3" @click="toggleForm">{{ showForm ? 'Esconder' : 'Adicionar Produto' }}</button>
  <br>
  <div>
    <form v-show="showForm" @submit.prevent="submitProduct" class="my-4">
      <div class="form-group">
        <label for="nome">Nome do Produto</label>
        <input type="textArea" class="form-control" id="nome" v-model="newProduct.nome" required>
      </div>
      <div class="form-group">
        <label for="descricao">Descrição do Produto</label>
        <textarea class="form-control" id="descricao" v-model="newProduct.descricao" required></textarea>
      </div>      
      <div class="form-group">
        <label for="pontos">Pontos para redimir</label>
        <input type="number" class="form-control" id="pontos" v-model="newProduct.pontos" required>
      </div>
      <div class="form-group">
        <label for="preco">Preço</label>
        <input type="text" class="form-control" id="preco" v-model="newProduct.preco" required>
      </div>
      <div class="form-group">
        <label for="imagem">Imagem</label>
        <input type="file" class="form-control" id="imagem" @change="handleImageUpload" required>
      </div>
      <div class="form-group">
        <label for="categoria">Categoria</label>
        <select class="form-control" id="categoria" v-model="newProduct.categoria" required>
          <option value="">Seleciona uma Categoria</option>
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id.toString()">{{
            categoria.attributes.nome
          }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Submeter</button>
    </form>
    <br>
    <br>
    <section style="background-color: #eee;">

      <div class="row">
        <div class="col-6" v-for="(produto, index) in produtos" :key="index">
          <div class="card" style="border-radius: 15px; margin-bottom: 20px;" @click="openModal(produto)">
            <img :src="produto.attributes.imagem" class="card-img-top" alt="Imagem do Produto"
              style="height: 150px; object-fit: cover; padding-top: 5%;" />
            <div class="card-body">
              <h5 class="card-title">{{ produto.attributes.nome }}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>


    <ProductModal v-if="showModal" :produto="selectedProduct" :showModal="showModal" @closeModal="closeModal" />
  </div>
</template>

<script>
import ProductModal from './ModalGerirProdutos.vue';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  components: {
    ProductModal
  },
  data() {
    return {
      produtos: [],
      showModal: false,
      selectedProduct: null,
      showForm: false,
      newProduct: {
        nome: '',
        descricao: '',
        pontos: null,
        preco: null,
        imagem: '',
        categoria: ''
      },
      categorias: []
    }
  },

  mounted() {
    this.fetchProdutos(); // Chama o método fetchProdutos ao montar o componente
    this.fetchCategorias();
  },

  methods: {
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
    fetchCategorias() {
      fetch('http://127.0.0.1:1337/api/categorias')
        .then(response => response.json())
        .then(data => {
          this.categorias = data.data;
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },

    openModal(produto) {
      this.selectedProduct = produto;
      this.showModal = true;

    },

    closeModal() {
      this.showModal = false;
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    async submitProduct() {
    const fileInput = document.getElementById("imagem");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select an image");
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `product_images/${file.name}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      const productData = {
        nome: this.newProduct.nome,
        pontos: this.newProduct.pontos,
        descricao: this.newProduct.descricao,
        preco: this.newProduct.preco,
        imagem: downloadURL,
        categoria: this.newProduct.categoria,
      };

      fetch("http://127.0.0.1:1337/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: productData }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Product submitted:", data);
        })
        .catch((error) => {
          console.error("Error submitting product:", error);
        });

      this.newProduct = {
        nome: "",
        descricao: "",
        pontos: null,
        preco: null,
        imagem: "",
        categoria: "",
      };
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  },


  }
};
</script>

<style>
.row {
  bs-gutter-x: 1rem;
}

.card {
  margin-left: 5%;
  margin-right: 5%;
}

form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form .form-group {
  margin-bottom: 15px;
}

form label {
  font-weight: bold;
}

form input[type="text"],
form input[type="number"],
form input[type="url"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

form button[type="submit"] {
  padding: 10px 20px;
}
</style>
