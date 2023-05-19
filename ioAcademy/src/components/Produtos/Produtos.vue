<template>
  <section style="background-color: #eee;">
    <H1>ASASDASD</H1>
    <div class="container py-5">
      <div class="row">
        <div class="col-6 col-md-6" v-for="(produto, index) in produtos" :key="produto.id">
          <div class="card" style="border-radius: 15px; margin-bottom: 20px;">
            <img :src="produto.imagem" class="card-img-top" alt="Imagem do Produto" style="max-height: 200px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">{{ produto.nome }}</h5>
              <p class="card-text">{{ produto.descricao }}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Categoria: {{ produto.categoria }}</li>
              <li class="list-group-item">Avaliação: 
                <span v-for="n in produto.avaliacao" :key="n" class="text-danger">
                  <i class="fas fa-star"></i>
                </span>
              </li>
              <li class="list-group-item">Preço: {{ produto.preco }}</li>
              <li class="list-group-item">Código: {{ produto.codigo }}</li>
              <li class="list-group-item">Cartão: {{ produto.cartao }}</li>
            </ul>
            <div class="card-body">
              <a href="#" class="card-link text-dark fw-bold">Cancel</a>
              <button type="button" class="btn btn-primary">Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import produtosData from '../../JSON/produtos.json';

export default {
  data() {
    return {
      produtos: [],
    };
  },
  mounted() {
    this.produtos = produtosData;
  },
};
</script>

<style>

</style>
