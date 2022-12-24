import { RouteRecordRaw } from "vue-router";

export const publicRoutes: Array<RouteRecordRaw> = [
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
    path: '/blog',
    name: 'blog',
    component: () => import('../pages/blogpage/BlogPage.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/ContactPage.vue')
  },
  {
    path: '/blog/:id',
    name: 'singleBlog',
    component: () => import('../pages/blogpage/DetailBlogPage.vue')
  }
]