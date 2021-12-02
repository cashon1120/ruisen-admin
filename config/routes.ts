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
    name: '房产管理',
    icon: 'flag',
    path: '/house',
    component: './house/index',
    hideChildrenInMenu: true,
    routes: [
      {
        name: '添加房产',
        path: '/house/create',
        component: './house/create',
      },
    ],
  },
  {
    name: '资讯管理',
    icon: 'notification',
    path: '/news',
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
  {
    name: '用户管理',
    icon: 'user',
    path: '/userList',
    component: './userList/index',
  },
  {
    name: '资源管理',
    icon: 'crown',
    path: '/resource',
    routes: [
      {
        name: '资源列表',
        path: '/resource/list',
        component: './resource/index',
      },
      {
        name: '添加资源',
        path: '/resource/create',
        component: './resource/create',
      },
    ],
  },
  {
    name: '账号管理',
    icon: 'team',
    path: '/admin',
    routes: [
      {
        name: '管理员列表',
        path: '/admin/list',
        component: './admin/index',
      },
      {
        name: '添加管理员',
        path: '/admin/create',
        component: './admin/create',
      },
    ],
  },
  {
    name: '待办事项',
    icon: 'diff',
    path: '/todo',
    routes: [
      {
        name: '待办列表',
        path: '/todo/list',
        component: './todo/index',
      },
      {
        name: '添加事项',
        path: '/todo/create',
        component: './todo/create',
      },
    ],
  },
  {
    name: '角色管理',
    icon: 'lock',
    path: '/role',
    routes: [
      {
        name: '角色列表',
        icon: 'lock',
        path: '/role/list',
        component: './role/index',
      },
      {
        name: '添加角色',
        icon: 'lock',
        path: '/role/create',
        component: './role/create',
      },
    ],
  },
  {
    name: '菜单管理',
    icon: 'profile',
    path: '/menus',
    routes: [
      {
        name: '菜单列表',
        path: '/menus/list',
        component: './menus/index',
      },
      {
        name: '添加菜单',
        path: '/menus/create',
        component: './menus/create',
      },
    ],
  },

  {
    name: '系统日志',
    icon: 'crown',
    path: '/logs',
    component: './logs/index',
  },
  // {
  //   name: '表格',
  //   icon: 'table',
  //   path: '/list',
  //   component: './Table',
  // },
  // {
  //   name: '表单',
  //   icon: 'form',
  //   path: '/form',
  //   component: './form',
  // },
  // {
  //   name: '详情',
  //   icon: 'profile',
  //   path: '/detail',
  //   component: './TableList',
  // },
  // {
  //   name: '结果',
  //   icon: 'check-circle',
  //   path: '/result',
  //   component: './TableList',
  // },
  // {
  //   name: '异常',
  //   icon: 'warning',
  //   path: '/warning',
  //   component: './TableList',
  // },
  // {
  //   name: '个人',
  //   icon: 'user',
  //   path: '/user',
  //   component: './TableList',
  // },
  // {
  //   path: '/',
  //   redirect: '/home',
  // },
  {
    component: './404',
  },
];
