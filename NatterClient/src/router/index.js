import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },

    // Auth Routes
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/components/auth/Login.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('@/components/auth/Register.vue')
    },
    
    // Chat Routes
    {
      path: "/chats",
      name: 'chats',
      component: () => import('@/views/ChatsView.vue'),
      meta: {
        hideNav: true
      }
    }
  ]
})

export default router
