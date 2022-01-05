import moment from 'moment';
// 防抖
export const debouncing = (fn: Function, delay: number) => {
  let timer: any = null;
  return function (this: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
};

// 节流
export const throttle = (fn: Function, delay: number) => {
  let pre = Date.now();
  return function (this: any) {
    if (Date.now() - pre >= delay) {
      fn.apply(this, arguments);
      pre = Date.now();
    }
  };
};

export const getTimeStrByStamp = (timeStamp: string, format: string) => {
  const momentTime: any = moment(moment(parseInt(timeStamp) * 1000).format(format), format);
  if (momentTime._i === 'Invalid date') {
    return false;
  }
  return momentTime;
};

export const getTimeStrByStampms = (timeStamp: string, format: string) => {
  const momentTime: any = moment(moment(parseInt(timeStamp)).format(format), format);
  if (momentTime._i === 'Invalid date') {
    return false;
  }
  return momentTime;
};

// 图片路径用的http://, 在nginx里配置的代理
export const formatImgSrc = (src: string) => {
  if (!src) {
    return '/images/noimg.jpg';
  }
  const newSrc = src.split(':')[2];
  // 之前测试环境图片路径
  if (src.indexOf('http://162.14.73.204:8088') > -1) {
    return `/old/${newSrc}`;
  }
  // 正式环境图片路径
  if (src.indexOf('http://47.104.131.247:8088') > -1) {
    return `/new/${newSrc}`;
  }
  return newSrc;
};
