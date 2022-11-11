import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView    
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView    
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


//TODO: Si no esta logueado lo mando al login. Cambiar cuando este hecho lo del jwt Bearer
router.beforeEach(async (to) => {
  const isAuthenticated = localStorage.getItem('user')
  if (
    !isAuthenticated && to.path !== '/login'
  ) {
    return { path: '/login' }
  }
})


export default router
