export default [
  {
    path: '/login',
    layout: false,
    routes: [
      {
        path: '/login',
        routes: [
          {
            name: '登录',
            path: '/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/home',
    name: '首页',
    icon: 'smile',
    component: './Home',
  },
  {
    path: '/admin',
    name: '管理',
    icon: 'crown',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Home',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '资讯管理',
    icon: 'table',
    path: '/news',
    redircet: '/news/list',
    // hideChildrenInMenu: true,
    routes: [
      {
        name: '资讯列表',
        path: '/news/list',
        component: './news/index',
      },
      {
        name: '添加资讯',
        path: '/news/create',
        component: './news/create',
      },
    ],
  },
  // {
  //   name: '资讯管理',
  //   icon: 'table',
  //   path: '/news',
  //   redirect: '/news/list',
  //   hideChildrenInMenu: true,
  //   routes: [
  //     {
  //       name: '资讯列表',
  //       path: '/news/list',
  //       hideInMenu: true,
  //       component: './news/index',
  //     },
  //     {
  //       name: '添加资讯',
  //       path: '/news/create',
  //       component: './news/create',
  //     },
  //   ],
  // },
  {
    name: '表格',
    icon: 'table',
    path: '/list',
    component: './Table',
  },
  {
    name: '表单',
    icon: 'form',
    path: '/form',
    component: './form',
  },
  {
    name: '详情',
    icon: 'profile',
    path: '/detail',
    component: './TableList',
  },
  {
    name: '结果',
    icon: 'check-circle',
    path: '/result',
    component: './TableList',
  },
  {
    name: '异常',
    icon: 'warning',
    path: '/warning',
    component: './TableList',
  },
  {
    name: '个人',
    icon: 'user',
    path: '/user',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
