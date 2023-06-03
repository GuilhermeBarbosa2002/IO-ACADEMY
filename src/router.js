import { createRouter, createWebHistory } from 'vue-router';

import Novidades from "./components/Novidades/Novidades.vue";
import PontosOfertas from "./components/PontosOfertas/PontosOfertas.vue";
import Produtos from "./components/Produtos/produtos.vue";
import MinhaConta from "./components/MinhaConta/MinhaConta.vue";

const routes = [
  { path: '/pontos-ofertas', component: PontosOfertas },
  { path: '/produtos', component: Produtos },
  { path: '/minha-conta', component: MinhaConta },
  { path: '/novidades', component: Novidades },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
