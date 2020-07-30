import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import menu from './menu'
const Login = () => import("@/views/Login")
const Layout = () => import('@/views/layout/layout')
// const UserManage = () => import('@/views/pages/userManage')
// const InstituteManage = () => import('@/views/pages/instituteManage')
// const ProjectManage = () => import('@/views/pages/projectManage')
// const StudentManage = () => import('@/views/pages/studentManage')
// const StudentImport = () => import('@/views/pages/studentManage/studentImport')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/layout',
    name: 'Layout',
    redirect: '/layout/userManage',
    component: Layout,
    children: menu
  }
]
const router = new VueRouter({
  routes
})

export default router
