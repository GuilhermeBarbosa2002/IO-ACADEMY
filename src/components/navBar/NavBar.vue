<template>
  <nav class="navbar fixed-bottom navbar-light bg-light">
    <div class="container d-flex justify-content-around align-items-end">
      <div class="nav-item">
        <router-link to="/categorias" class="nav-link" active-class="active-link">
          <font-awesome-icon class="icon" icon="newspaper" />
          <p>Categorias</p>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/registo" class="nav-link" active-class="active-link">
          <font-awesome-icon class="icon" icon="folder-open" />
          <p>Registo</p>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/produtos" class="nav-link" active-class="active-link">
          <font-awesome-icon class="icon" icon="qrcode" />
          <p>Produtos</p>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/gerir-produtos" class="nav-link" active-class="active-link">
          <font-awesome-icon class="icon" icon="list" />
          <p>Gerir Produtos</p>
        </router-link>
      </div>
    </div>
  </nav>
</template>

  
<style>
.nav-link {
  display: flexbox;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #7d7a7a;
  text-decoration: none;
}

.nav-link i {
  margin-bottom: 0.25rem;
}

.active-link {
  color: black;
  /* Definir a cor preta para o item ativo */
}

.navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7%;
  border-top: 1px solid black;
  background-color: #f8f9fa;
}

.container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

span {
  font-size: 15px;
}

</style>
  
  
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faNewspaper, faTags, faStore, faUser, faList, faQrcode, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faNewspaper, faTags, faStore, faUser, faList, faQrcode, faFolderOpen);

export default {
  components: {
    FontAwesomeIcon
  }
};
</script>
  