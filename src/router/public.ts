import { RouteRecordRaw } from "vue-router";

export const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/.*',
    name: 'notfound',
    component: () => import('../pages/NotFound.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/auth/RegisterPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/auth/LoginPage.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/MainPage.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../pages/blogpage/BlogPage.vue')
  },
  {
    path: '/blog/:id',
    name: 'singleBlog',
    component: () => import('../pages/blogpage/DetailBlogPage.vue')
  },
  {
    path: '/service',
    name: 'service',
    component: () => import('../pages/ServicePage.vue')
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../pages/PortfolioPage.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/ContactPage.vue')
  }
]