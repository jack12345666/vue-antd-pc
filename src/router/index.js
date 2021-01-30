import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/views/index')
const LeaseDetail = () => import('@/views/leaseDetail')
const Outlets = () => import('@/views/outlets')



Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', component: Index, name: 'index', meta: {title: '空间厂房-杭州钱塘新区投资之家'} }, 
    { path: '/leaseDetail/:id', component: LeaseDetail, name: 'leaseDetail', meta: {title: '厂房详情-杭州钱塘新区投资之家'} }, 
    { path: '/outlets', component: Outlets, name: 'outlets', meta: {title: '生活钱塘-杭州钱塘新区投资之家'} }, 
  ]
})

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
    document.title = to.meta.title;
  }else{ 
    document.title = '杭州钱塘新区投资之家'
  }
  next()
})

export default router
 