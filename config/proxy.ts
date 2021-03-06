/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // 要代理的地址
      target: 'http://47.104.131.247:8081/',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^/api': '/' },
    },
    '/new/8088/': {
      // 要代理的地址
      target: 'http://47.104.131.247:8088/',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^/new/8088': '/' },
    },
    '/old/8088/': {
      // 要代理的地址
      target: 'http://162.14.73.204:8088/',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^/old/8088': '/' },
    },
  },
  test: {
    '/api/': {
      target: 'http://162.14.73.204:8081/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'http://162.14.73.204:8081/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
