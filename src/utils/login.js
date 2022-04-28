import {removeToken} from "@/store/auth";
import Config from '@/settings'
import router from "@/router";
import request from "@/utils/request";

/**
 * 访问后端logout接口后 删除token
 */
export function logout(){
    request.delete('http://127.0.0.1:8000/auth/logout').then(res=>{
        removeToken(Config.TokenKey)
        router.replace('/').then(res=>{})
    })
}
