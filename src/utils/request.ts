import { extend } from 'umi-request';

interface IPramars {
  url: string;
  method?: 'GET' | 'POST' | 'get' | 'post';
  params?: any;
}

// export const URL = 'http://162.14.73.204:8081/';
export const URL = '/api/';

const HttpRequest = function (options: IPramars) {
  const { url, method, params } = options;
  const _method = method || 'POST';

  let formData: any = null;
  if (_method === 'POST' || _method === 'post') {
    formData = new FormData();
    Object.keys(params).map((item) => formData.append(item, params[item]));
  }
  const config: any = {
    method: _method,
    params: _method == 'GET' || _method == 'get' ? params : {}, // 如果是get请求使用 params
    data: _method == 'POST' || _method == 'post' ? formData : '', // 如果是post请求使用 data
    timeout: 60000,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      token: localStorage.getItem('token'),
    },

    errorHandler: function (error: any) {
      console.log('异常:', error);
      if (error.response) {
      }
      throw error.response; // 将错误抛出，可在catch中捕获错误
    },
  };
  const request = extend(config);
  // 注意这里的请求地址
  return request(URL + url);
};

export default HttpRequest;
