import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

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
    path: '/medication',
    component: Layout,
    redirect: '/medication/list',
    name: 'medication',
    meta: {title: 'Medication', icon: 'ums-menu'},
    children: [{
      path: 'medicationList',
      name: 'medicationList',
      component: () => import('@/views/medication/list/index'),
      meta: {title: 'Records', icon: 'product-list'},
    },
      {
        path: 'addMedication',
        name: 'addMedication',
        component: () => import('@/views/medication/add/index'),
        meta: {title: 'Search', icon: 'product-add'}
      },
    ]
  },
  {
    path:'/vital-signs',
    component: Layout,
    redirect: '/vital-signs/list',
    name: 'vital-signs',
    meta: {title: 'Vital signs', icon: 'ums-resource'},
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/vital-signs/list/index'),
        meta: {title: 'Vital signs list', icon: 'order-return-reason'}
      },
      {
        path: 'mgmt',
        name: 'mgmt',
        component: () => import('@/views/vital-signs/add/index'),
        meta: {title: 'Vital MGMT.', icon: 'ums-menu'}
      },
    ]
  },

  {
    path: '/diet',
    component: Layout,
    redirect: '/diet/list',
    name: 'diet',
    meta: {title: 'Diet', icon: 'order'},
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/diet/list/index'),
        meta: {title: 'Diet list', icon: 'order-return'}
      },
      {
        path: 'dietDetail',
        name: 'dietDetail',
        component: () => import('@/views/diet/dietDetail'),
        meta: {title: 'Diet detail'},
        hidden:true
      },
      {
        path: 'mgmt',
        name: 'mgmt',
        component: () => import('@/views/diet/add/index'),
        meta: {title: 'Diet MGMT.', icon: 'ums-menu'}
      },
    ]
  },
  {
    path:'/notes',
    component: Layout,
    redirect: '/notes/list',
    name: 'notes',
    meta: {title: 'Notes', icon: 'sms'},
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/notes/list/index'),
        meta: {title: 'Notes List', icon: 'sms-flash'}
      },

      {
        path: 'mgmt',
        name: 'mgmt',
        component: () => import('@/views/notes/add/index'),
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
        path: 'list',
        name: 'list',
        component: () => import('@/views/comm/list/index'),
        meta: {title: 'COMM. list', icon: 'sms-subject'}
      },
      {
        path: 'appt',
        name: 'appt',
        component: () => import('@/views/comm/appt/index'),
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

