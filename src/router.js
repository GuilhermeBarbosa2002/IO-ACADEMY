import { createRouter, createWebHistory } from 'vue-router';

import Categorias from "./components/Categorias/Categorias.vue";
import Registo from "./components/Registo/Registo.vue";
import Produtos from "./components/Produtos/produtos.vue";
import MinhaConta from "./components/GerirProdutos/GerirProdutos.vue";

const routes = [
  { path: '/registo', component: Registo },
  { path: '/produtos', component: Produtos },
  { path: '/gerir-produtos', component: MinhaConta },
  { path: '/categorias', component: Categorias },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
