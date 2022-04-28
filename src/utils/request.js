/**
 * 该js文件用于 构造拦截器
 */
import axios from "axios";
import Element from "element-ui";
import {getToken} from "@/store/auth";

let request = axios.create()

//添加响应拦截器
request.interceptors.response.use(response=>{
        console.log(response);
        console.log('响应拦截器');
        //一定要加 这行代码
        return response
    },

    error => {
        //使用element ui 返回错误信息
        Element.Message.error('请求失败'+error)

        //一定要加这行代码
        return Promise.reject(error)
    },
)


/**
 * 添加请求拦截器 每次请求都加上token
 * onFullfilled 成功时...
 * onRejected   失败时...
 */
request.interceptors.request.use(config=>{
        console.log('请求拦截')
        if(getToken()){
            config.headers['Authorization'] = getToken()
        }
        return config
    },error => {
        return Promise.reject(error)
    }
)




export default request
