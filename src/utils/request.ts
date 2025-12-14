import axios, {type InternalAxiosRequestConfig,type AxiosResponse,type AxiosError} from 'axios';
import { ElMessage } from 'element-plus'

// 定义请求响应参数，不含data
export interface Result {
  code: number
  message?: string
}

// 请求响应参数，包含data
export interface ResultData<T = unknown> extends Result {
  data: T
}


const ErrorMap:{[key:string]:string}={
  '302':'接口重定向',
  '400':'参数不正确',
  '401':'TOKEN已过期，请重新登录',
  '403':'您没有权限操作',
  '404':'请求地址出错',
  '408':'请求超时',
  '500':'服务器错误',
  '502':'网络错误',
  '503':'服务不可用',
}
/**
 * 创建axios 实例
 */
const baseURL:string = import.meta.env.VITE_APP_BASE_API;
const httpClient = axios.create({
  baseURL,
  timeout:10000,
  headers:{
    'Content-Type':'application/json;charset=utf-8'
  }
})

/**
 * 请求拦截
 */
httpClient.interceptors.request.use(
  (config:InternalAxiosRequestConfig) => {
    // 添加一个 Authorization 头部，模拟 token 认证
    const token = localStorage.getItem('token') || ''
    if(token&& config.headers){
      config.headers.Authorization=token;
    }else{
       delete config.headers.Authorization;
    }
    return config
  },
  (error:AxiosError) =>{
    return Promise.reject(error)
  }
)
/**
 * 响应拦截
 */
httpClient.interceptors.response.use(
  (response:AxiosResponse) => {
    const {code,message} = response.data;
    //登录失效，清空本地缓存
    if(code===401){
      ElMessage.error(message||'TOKEN已过期，请重新登录');
      localStorage.clear();
      window.location.href='/'
      return Promise.reject(response.data)
    }
    //全局拦截操作
    if(code&&code!==200){
      ElMessage.error(message||'系统错误')
      return Promise.reject(new Error(message||'Error'))
    }
    return Promise.resolve(response.data);
  },
  (error:AxiosError)=>{
    const {response}=error;
    console.log('Error',response)
    if(!response){
      ElMessage.error('网络连接失败，请检查网络设置');
      return Promise.reject(error)
    }else{
      //处理错误
      // const {code,message}=response.data;
      // 如果token 过期，启动刷新
      //或跳转操作
      
      //其他操作
      ElMessage.error(ErrorMap[response?.status])

    }
    if(!window.navigator.onLine){
      ElMessage.error('网络连接失败')
      //其他操作
    }
    return Promise.reject(error?.message)
  }
)

export default httpClient;
