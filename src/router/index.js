import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import {getToken} from "@/store/auth";


Vue.use(VueRouter)

const routes = [
  {
    path:'',
    name: Login,
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    //懒加载
    component: ()=>import('@/views/Home')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//beforeEach 在每次请求前都进行一次判断
 router.beforeEach((to,from,next)=>{

   if(getToken()){
     if(to.name === 'Login'){
       //如果访问是登录页面 直接跳转到主页
       next('/dashboard')
     }
     else {
       //想去哪里去哪里
       next()
     }
   }else if (to.path!== '/'){
     //没有登录
     next({path:'/'})
   }else{
     //如果是登录页面 就直接放行
     next()
   }
 })


export default router
