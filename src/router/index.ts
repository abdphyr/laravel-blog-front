import { createRouter, createWebHistory } from 'vue-router';
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

const auth = localStorage.getItem("auth");
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: auth ? [...publicRoutes, ...protectedRoutes] : publicRoutes 
})

export default router
