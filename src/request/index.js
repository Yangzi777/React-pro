import axios from 'axios';
//  创建axios实例
const instance = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/307336'
})
//  axios请求之前拦截器
instance.interceptors.request.use(config => {
  config.headers = { ...config.headers, authToken: 'xxxx' }
  return config
})
// axios请求之后拦截器
instance.interceptors.response.use(res => {
  if (res.data.code === 200) {
    return res.data.data
  }
})

export {
  instance
}