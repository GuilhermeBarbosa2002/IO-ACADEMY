<script>
import Navbar from './components/navbar/NavBar.vue'; // Importe o componente da navbar

export default {
  components: {
    Navbar, // Registre o componente da navbar para uso no template
  },
}
</script>

<template>
  <header>
    <router-view /> <!-- Renderiza as rotas da aplicação -->
    <Navbar /> <!-- Inclua o componente da navbar aqui -->
  </header>


</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
