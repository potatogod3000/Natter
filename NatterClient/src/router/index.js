import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "Home",
        navTransparent: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
      meta: {
        title: "About"
      }
    },

    // Auth Routes
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
      meta: {
        title: "Authenticate"
      }
    },

    // Profile Page Route
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: {
        title: "User Profile"
      }
    },

    // Chat Routes
    {
      path: "/chats",
      name: 'chats',
      component: () => import('@/views/ChatsView.vue'),
      meta: {
        title: "Natter Chat",
        hideNav: true
      }
    }
  ]
})

router.beforeEach((to, from) => {
  document.title = to.meta?.title ? `${to.meta.title} - Natter` : "Natter"
})

export default router
