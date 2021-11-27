import { extend } from 'umi-request';
import {history} from 'umi'
import {message} from 'antd'

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
  return new Promise((resolve: any, reject: any) => {
    request((URL + url).toLocaleLowerCase()).then((res: any) => {
      if(res.code === 52005){
        history.replace('/login')
        reject()
        return
      }
      if(res.code !== 20000){
        message.error(res.message)
        reject()
        return
      }
      resolve(res.data)
    })
  })
};

export default HttpRequest;
