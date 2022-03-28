/* eslint-disable no-undef */
// 进行二次封装的js
import axios from 'axios';
// import getCookie from '../utils/getCookie';
import { errorToast } from '../utils/toast';
const baseURL = process.env.NODE_ENV === "development" ? 'http://localhost:3334/' : 'http://114.215.183.5:3334'
// const  {token, userNames} = getCookie()
const http = axios.create({
    // 请求的超时时间；如果该请求超过2000ms，那么该请求就停止
    baseURL,
    // transformRequest(data){
    //     // data: 就是post请求传递的参数
    //     let str ="";
    //     for(let key in data){
    //         str+=`${key}=${data[key]}&`
    //     }
    //     return str;
    // },
    // 给每一个请求拼接一个随机数，防止走缓存；
    params:{
        t:Math.random(),
    },
    // timeout: 2000,
});
// 请求拦截器 和响应拦截器 
http.interceptors.request.use(function(config){
    return config;
},function(error){
    return Promise.reject(error);
});
// 添加响应拦截器
http.interceptors.response.use(function(response){
    const {data} = response;
    const {code, msg} = data;
    if(code === 9999){
        window.location.href = '/login'
        return
    }
    return response.data
},function(err){
    return Promise.reject(err)
});
http.defaults.headers.post['Content-Type'] = 'application/json';
export default http;

