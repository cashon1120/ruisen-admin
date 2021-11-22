export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
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
    name: '表格',
    icon: 'table',
    path: '/list',
    component: './TableList',
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
    path: '/form',
    component: './TableList',
  },
  {
    name: '结果',
    icon: 'check-circle',
    path: '/form',
    component: './TableList',
  },
  {
    name: '异常',
    icon: 'warning',
    path: '/form',
    component: './TableList',
  },
  {
    name: '个人',
    icon: 'warning',
    path: '/form',
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
