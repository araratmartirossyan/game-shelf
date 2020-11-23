// import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
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
  scrollBehavior(from, to, savedPosition) {
    const position = sessionStorage.getItem('top')
    console.log(position)
    if (position) {
      console.log('return position')
      return {
        left: 0,
        top: Number(position)
      }
    }

    return { left: 0, top: 0 }
  },
  history: createWebHashHistory(process.env.BASE_URL),
  routes,

})

export default router
