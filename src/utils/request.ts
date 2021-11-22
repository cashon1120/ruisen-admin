import { extend } from 'umi-request';

interface IPramars {
  url: string;
  method?: 'GET' | 'POST' | 'get' | 'post';
  params?: any;
}

const URL = '/';

const HttpRequest = function (options: IPramars) {
  const { url, method, params } = options;
  const _method = method || 'POST';
  const config = {
    method: _method,
    params: _method == 'GET' || _method == 'get' ? params : {}, // 如果是get请求使用 params
    data: _method == 'POST' || _method == 'post' ? params : '', // 如果是post请求使用 data
    timeout: 60000,
    headers: {
      token: '123123123123123',
    },
    prefix: '', // 统一设置 url 前缀
    suffix: '', // 统一设置 url 后缀

    errorHandler: function (error: any) {
      // 异常
      // console.log('异常:', error);
      if (error.response) {
      }
      throw error.response; // 将错误抛出，可在catch中捕获错误
    },
  };
  console.log(url + '请求参数:', config);

  const request = extend(config);
  // 注意这里的请求地址
  return request(URL + url);
};

export default HttpRequest;
