import { createRouter, createWebHistory } from 'vue-router'
import { useTicketStore } from '@/stores/ticketStore'
import Landing from '@/views/Landing.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Dashboard from '@/views/Dashboard.vue'
import Tickets from '@/views/Tickets.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: Tickets,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const ticketStore = useTicketStore()
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !ticketStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
