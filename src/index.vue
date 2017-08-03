<style scoped lang="less">
* {
  margin: 0;
  box-sizing: border-box;
  font-family: 'microsoft yahei';
  color: #fff;
}
.post {
  max-width: 960px;
  background-color: pink;
  margin:0px auto; 
  .postbox {
    background-color:lightgrey;
    margin:10px;
    width: 300px;
    height: 200px;
    float: left;
    overflow: hidden;
  }
  .move-panel {
    background-color: rgba(0, 0, 0, 0.4);
    transform: translateY(85px);
    padding:5px;
    &:hover {
      transform: translateY(50px);
    }
  }
  h2 {
    font-weight: 500;
    font-size: 23px; 
  }
  h4 {
    font-weight: 500;
    padding:4px 0;
    color: #eee;
    font-style: italic;
  }
  p{
    font-size: 15px;
    padding-top:10px;
  }
}

</style>


<template>
  <div class="post">
      <div class="postbox" v-for="p in posts">
        <div class="move-panel">
          <!-- <img :src="coverurl"> -->
          <h2>{{p.name_cht}}</h2>
          <h4>{{p.title}}</h4>
          <p>{{p.description}}</p>
        </div>
      </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data:function(){
    return {
      posts:[]
    }
  },
  computed:{
    coverurl(){

      if(this.posts.cover.indexOf("http")!=-1){
        return this.posts.cover ;
      }else {
        return "http://zashare.org" + this.posts.cover ;
      }
    }
  },
  mounted(){
    this.$axios.get('http://awiclass.monoame.com/api/command.php?type=get&name=post').then((res) => {
      this.posts = res.data
      console.log(res)
    }).catch((err) => {
      console.log("err")
    })
  }
}

</script>