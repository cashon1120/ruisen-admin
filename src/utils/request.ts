import { extend } from 'umi-request';
import { history } from 'umi';
import { message } from 'antd';
interface IPramars {
  url: string;
  method?: 'get' | 'post' | 'delete' | 'put';
  params?: any;
  type?: 'json' | 'formData';
}

interface RequestData{
  code: number
  message: string
  data: any
}

// 后端返回格式不统一, 处理一下
const shouldFormatRoutes = ['admin/menus', 'admin/resources', 'house/all/list'];
export const URL = process?.env?.NODE_ENV === 'development' ? '/api/' : 'http://162.14.73.204:8081/';
const HttpRequest = function (options: IPramars) {
  let { url, method, params, type } = options;
  method = method || 'post';
  let formData: any = params;
  // post 有的是用body,有的是用 json
  if (method === 'post' && type !== 'json') {
    formData = new FormData();
    Object.keys(params).map((item) => {
      if (params[item]) {
        formData.append(item, params[item]);
      }
    });
  }

  const config: any = {
    method,
    params: method === 'get' ? params : {},
    data: formData,
    timeout: 60000,
    headers: {
      token: localStorage.getItem('token'),
    },
    errorHandler: function (error: any) {
      if (error.response) {
        throw error.response;
      }
    },
  };
  const request = extend(config);
  return new Promise<RequestData>((resolve, reject) => {
    request((URL + url).toLocaleLowerCase()).then((res: RequestData) => {
      if (res.code === 52005) {
        history.replace('/login');
        message.error('登录已过期, 请重新登录');
        reject();
        return;
      }
      if (res.code !== 20000) {
        message.error(res.message);
        reject();
        return;
      }
      if (shouldFormatRoutes.includes(url)) {
        if(res.data){
          const data = res.data;
          res.data = {
            recordList: data,
            count: data.length,
          };
        }
      }
      resolve(res.data);
    });
  });
};

export default HttpRequest;
