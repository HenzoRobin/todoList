<style>
  * {
    transition: all .3s;
    margin: 0px;
    padding: 0px;
  }
  body {
   /*  background-color: #eee; */
    background-color: #1d7c80;
  }
  .header
   {
    width: 100%;
    background-color: #111;
    height: 70px;
    display: flex;
    justify-content: center;
  }
  .footer {
    width: 100%;
    background-color: #111;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-wrap {
    width: 880px;
    background-color: ;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .logo span{
    font-size: 30px;
    color: #fff;
  }
  .logo {
    cursor: pointer;
    padding: 10px 10px 10px 0px;
  }
  li {
    list-style: none;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    font-family: 'microsoft yahei';
    font-size: 18px;
    color: #fff;
  }
  li:hover,
  .login a:hover{
   color: cyan; 
  }
  .login a{
    padding: 10px 5px;
    cursor: pointer;
    font-size: 18px;
    color: #fff;
  }
  .footer {
    font-size: 18px;
    color: #fff;
  }
</style>

<template>
  <div>
    <div class="header">
      <div class="nav-wrap">
        <router-link :to=" { path: '/' }" style="text-decoration:none">
          <div class="logo">
            <span>LOGO</span>
          </div>
        </router-link>
        <div class="nav-bar">
          <ul>
            <router-link :to=" { path: '/' }">
              <li>首页</li>
            </router-link>
            <router-link :to=" { path: '/todo' }">
              <li>备忘录</li>
            </router-link>
            <router-link :to=" { path: '/slides' }">
              <li>轮播图</li>
            </router-link>
            <router-link :to=" { path: '/game' }">
              <li>井字游戏</li>
            </router-link>
            <router-link :to=" { path: '/calendar' }">
             <li>日历</li>
            </router-link>
          </ul>
        </div>
        <div class="login">
          <a>登录</a>
          <a>注册</a>
        </div>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="footer">
      <span>CopyRight.2017</span>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data:function(){
    return {
 
    }
  },
  
}
</script>