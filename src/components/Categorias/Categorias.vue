<template>
  <br>
  <form @submit.prevent="submitCategory" class="my-4">
    <div class="form-group">
      <label for="categoria">Nome da Categoria</label>
      <input type="text" class="form-control" id="categoria" v-model="newCategory.nome" required>
    </div>
    <button type="submit" class="btn btn-primary">Adicionar Categoria</button>
  </form>
  <br>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.attributes.nome }}</td>
        </tr>
      </tbody>
    </table>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      newCategory: {
        nome: ''
      }
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      fetch('http://127.0.0.1:1337/api/categorias')
        .then(response => response.json())
        .then(data => {
          this.categories = data.data;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    submitCategory() {
      const categoryData = {
        nome: this.newCategory.nome
      };

      fetch('http://127.0.0.1:1337/api/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: categoryData }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Category submitted:', data);
          this.categories.push(data.data);
          this.newCategory.nome = '';
        })
        .catch(error => {
          console.error('Error submitting category:', error);
        });
    },
  },
};
</script>
