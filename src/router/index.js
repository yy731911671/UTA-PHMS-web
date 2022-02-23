import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: 'Home', icon: 'home'}
    }]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/profile',
    children: [{
      path: 'profile',
      name: 'profile',
      component: () => import('@/views/profile/index'),
      meta: {title: 'Profile', icon: 'product-list'}
    }],
    hidden: true
  },
]

export const asyncRouterMap = [

  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/Medication',
    name: 'pms',
    meta: {title: 'Medication', icon: 'ums-menu'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: 'Records', icon: 'product-list'}
    },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {title: 'Search', icon: 'product-add'}
      },
    ]
  },
  {
    path:'/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: 'Vital signs', icon: 'ums-resource'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: 'Vital signs list', icon: 'order-return-reason'}
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {title: 'Vital MGMT.', icon: 'ums-menu'}
      },
    ]
  },

  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: 'Diet', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {title: 'Diet list', icon: 'order-return'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: 'Diet detail'},
        hidden:true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {title: 'Diet MGMT.', icon: 'ums-menu'}
      },
    ]
  },
  {
    path:'/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {title: 'Notes', icon: 'sms'},
    children: [
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: 'Notes List', icon: 'sms-flash'}
      },

      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: {title: 'Notes MGMT.', icon: 'ums-menu'}
      },
    ]
  },
  {
    path:'/comm',
    component: Layout,
    redirect: '/comm/Communication',
    name: ' Communication',
    meta: {title: 'COMM.', icon: 'ums-role'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: 'COMM. list', icon: 'sms-subject'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: 'APPT. list', icon: 'ums-admin'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

