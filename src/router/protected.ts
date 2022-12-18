import { RouteRecordRaw } from "vue-router";

export const protectedRoutes: Array<RouteRecordRaw> = [
  {
    path: '/create/blog',
    name: 'blogCreate',
    component: () => import('../pages/blogpage/CreateBlogPost.vue')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../pages/NotificationPage.vue')
  },
  {
    path: '/blog/update/:id',
    name: 'blogUpdate',
    component: () => import('../pages/blogpage/UpdateBlogPost.vue')
  },
  {
    path: '/blog/delete/:id',
    name: 'blogDelete',
    component: () => import('../pages/blogpage/DeleteBlogPost.vue')
  },
  {
    path: '/confirm-password',
    name: 'confirmPassword',
    component: () => import('../pages/auth/PasswordConfirm.vue')
  }
]