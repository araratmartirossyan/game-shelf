import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/create',
    name: 'search-game',
    component: () => import('@/views/SearchGame.vue')
  },
  {
    path: '/create/form/:id',
    name: 'create-game',
    component: () => import('@/views/CreateGame.vue')
  },
  {
    path: '/overview/:id',
    name: 'game-overview',
    component: () => import('@/views/OverviewGame.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
