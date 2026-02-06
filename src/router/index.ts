import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import { authState } from '../services/auth.service'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboardView,
      meta: { requiresAuth: true, adminOnly: true }
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/spectacle/:id',
      name: 'spectacle-detail',
      component: () => import('../views/SpectacleDetailView.vue')
    }
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const adminOnly = to.matched.some(record => record.meta.adminOnly)

  if (requiresAuth && !authState.isAuthenticated) {
    next('/login')
  } else if (adminOnly && authState.user?.role !== 'ADMIN') {
    // Redirect non-admin users trying to access admin pages
    next('/')
  } else {
    next()
  }
})

export default router
