﻿export default [
  {
    path: '/home',
    name: '首页',
    icon: 'home',
    component: './home/index',
  },
  {
    name: '房产管理',
    icon: 'house',
    path: '/house',
    component: './house/index',
  },
  {
    name: '添加房产',
    path: '/house/create',
    component: './house/create',
    hideInMenu: true,
  },
  {
    name: '资讯管理',
    icon: 'news',
    path: '/news',
    component: './news/index',
  },
  {
    name: '添加资讯',
    path: '/news/create',
    component: './news/create',
    hideInMenu: true,
  },
  {
    name: '用户管理',
    icon: 'user',
    path: '/user',
    component: './userList/index',
  },
  {
    name: '管家服务',
    icon: 'service',
    path: '/service',
    component: './service/index',
  },
  {
    name: '添加管家',
    path: '/service/create',
    component: './service/create',
    hideInMenu: true,
  },
  {
    name: '待办事项',
    icon: 'todo',
    path: '/todo',
    component: './todo/index',
  },
  {
    name: '账号管理',
    icon: 'admin',
    path: '/admin',
    component: './admin/index',
  },
  {
    name: '订单管理',
    icon: 'order',
    path: '/order',
    component: './order/index',
  },
  {
    name: '添加账号',
    path: '/admin/create',
    component: './admin/create',
    hideInMenu: true,
  },
  {
    name: '资源管理',
    icon: 'crown',
    path: '/resources',
    component: './resource/index',
  },
  {
    name: '添加资源',
    path: '/resources/create',
    component: './resource/create',
    hideInMenu: true,
  },

  {
    name: '添加事项',
    path: '/todo/create',
    component: './todo/create',
    hideInMenu: true,
  },
  {
    name: '角色管理',
    icon: 'roles',
    path: '/roles',
    component: './roles/index',
  },
  {
    name: '添加角色',
    path: '/roles/create',
    component: './roles/create',
    hideInMenu: true,
  },
  {
    name: '菜单管理',
    icon: 'menus',
    path: '/menus',
    component: './menus/index',
  },
  {
    name: '添加菜单',
    path: '/menus/create',
    component: './menus/create',
    hideInMenu: true,
  },
  {
    name: '系统日志',
    icon: 'logs',
    path: '/operation/log',
    component: './logs/index',
  },
  {
    name: '出租记录',
    icon: 'rental',
    path: '/rental',
    component: './rental/index',
  },
  {
    name: '添加出租记录',
    path: '/rental/create',
    component: './rental/create',
    hideInMenu: true,
  },
  {
    name: '租金收益',
    icon: 'income',
    path: '/income',
    component: './income/index',
  },
  {
    name: '添加收益',
    path: '/income/create',
    component: './income/create',
    hideInMenu: true,
  },
  { path: '/404', component: './404' },
];
