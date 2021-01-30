import axios from 'axios'
import { message } from 'ant-design-vue'
import { getCookieToken } from './utils'
import { BASEURL } from './config'

let reqConfig

const errorHandle = status => {
  // 判断状态码
  switch (status) {
    case 500:
      message.error('找不到此服务，可能是在路上~')
      break;
    case 503:
      message.error('服务器开小差了~请稍后')
      break;
    default:
      message.error('网络错误')
  }

  return { data: '' }
}


const service = axios.create({
  baseURL: BASEURL,
  // baseURL: '/api',
  timeout: 50000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: true
});

/**
 *  code：0：请求成功
    code：10：无权限，需要登录
 */

// request拦截器
service.interceptors.request.use(
  config => {
    reqConfig = config;
    config.headers['Authorization'] = encodeURIComponent(getCookieToken()) 
    // config.headers['Authorization'] = getCookieToken()
    return config
  },
  error => {
    Promise.reject(error)
  }
);

// response 拦截器
service.interceptors.response.use(
  // 请求成功
  res => {
    if(res.data.code === 0) {
      return res.data
    }else if (res.data.code === 10) {
      // Modal.confirm({
      //   title: '没权限,确定去登录?',
      //   content: '',
      //   okText: '确定',
      //   cancelText: '取消',
      //   onOk() {
      //     location.href = LOGINURL + '/user/login.html?redirect=' + encodeURIComponent(location.href);
      //   },
      //   onCancel() {},
      // })
    }else {
      message.error(res.data.msg)
    }
    if (reqConfig.method === 'put') {
      return Promise.resolve(res);
    }
    return Promise.resolve(res.data);
  },
  err => {
    const { response } = err;
    if (response) {
      errorHandle(response.status, response.data);
      return Promise.reject(response.data);
    }
    return { data: '' };
  }
);

export default service;

