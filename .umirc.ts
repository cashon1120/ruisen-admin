import { defineConfig } from 'umi';
import routes from './config/routes';
import proxy from './config/proxy';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'

const { REACT_APP_ENV } = process.env;

const handleFlatRoutes = (routers: any[], res: any[] = []) => {
  routers.forEach((route: any) => {
    const { path, component, routes, redirect, id } = route;
    const newRoute: any = {
      id,
      path,
    };
    component ? (newRoute.component = component) : null;
    redirect ? (newRoute.redirect = redirect) : null;
    // 没有 path 这玩意居然会影响后面路由的打包, 导致不显示, 神奇....
    if (path && component) {
      res.push(newRoute);
    }
    if (routes) {
      handleFlatRoutes(routes, res);
    }
  });
  return res;
};

const flatRoutes = handleFlatRoutes(routes);

export default defineConfig({
  title: '瑞森海外房管家',
  metas: [
    { charset: 'utf-8' } as any,
    { 'http-equiv': 'Expires', content: '0' },
    { 'http-equiv': 'Pragma', content: 'no-cache' },
    { 'http-equiv': 'Cache-control', content: 'no-cache' },
    { 'http-equiv': 'Cache', content: 'no-cache' },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
    hmr: false
  },
  mfsu: {},
  proxy: proxy[REACT_APP_ENV || 'dev'],
  dynamicImport: {
    loading: '@/components/Loading',
  },
  // 替换momentjs为dayjs, 打包下来总体积少了接近700k....
  // chainWebpack(memo) {
  //   memo.plugin('AntdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin);
  // },
  routes: [
    { path: '/', component: '@/pages/login', exact: true },
    { path: '/login', component: '@/pages/login' },
    {
      component: '@/layouts',
      routes: flatRoutes,
    },
    {component: '@/pages/404' },
  ],
});
