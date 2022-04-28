<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside  width="220px">
        <el-menu style="font-family: myFont" text-color="#87CEFA" >
          <!-- 具名插槽的用法    -->
          <el-submenu :index="item.name" v-for="item in menuList" style="right: auto" >
            <template slot="title">
              <svg-icon slot="prefix" :icon-class="item.meta.icon"/>
              {{item.meta.title}}
            </template>
            <el-menu-item :index="child.name" v-for="child in item.children" style="right: auto" @click="selectMenu(item.path,child.path)">
              <template slot="title">
               <svg-icon slot="prefix" :icon-class="child.meta.icon"/>
                {{child.meta.title}}
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container style="height: 100%">
        <el-header style="text-align: right">
          <el-dropdown style="font-size: large">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <span style="color: purple"> Ni </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item @click.prevent.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!--  表格布局      -->
        <el-main>
         <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {removeToken} from "@/store/auth";
  import Config from "@/settings";

  export default {
    name:'Dashboard',

    created() {
      this.getMenus()
    },

    methods:{
      logout(){
        //请求后端接口删除该用户的token 同时前端Cookies也要删除该用户
        this.$request.delete('http://127.0.0.1:8000/auth/logout').then(res=>{
            removeToken(Config.TokenKey)
            this.$router.replace('/')
        })
      },

      getUserInfo(){
        this.$request.get('http://127.0.0.1:8000/auth/info').then(res=> {
            console.log("获取用户信息成功");
            console.log(res.data)
        },err=>err)
      },

      //选择菜单方法
      selectMenu(path1,path2){
        this.$router.replace(path1+'/'+path2).catch(err=>err)
      },

      //获取菜单接口
      getMenus(){
        this.$request.get('http://127.0.0.1:8000/api/menus/build').then(res=>{
          this.menuList = res.data
          console.log(this.menuList)
        })
      }
    },

    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        menuList:[],
      }
    },

  }
</script>

<style scoped>

</style>
