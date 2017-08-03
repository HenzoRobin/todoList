<style scoped lang="less">
* {
  margin: 0;
  box-sizing: border-box;
}
.post {
  max-width: 960px;
  background-color: pink;
  margin:0px auto; 
  .postbox {
    background-color: grey;
    margin:10px;
    width: 300px;
    height: 200px;
    float: left;
    overflow: hidden;
  }
}

</style>


<template>
  <div class="post">
      <div class="postbox" v-for="p in posts">
        <!-- <img :src="coverurl"> -->
        <h1>{{p.name_cht}}</h1>
        <h4>{{p.title}}</h4>
        <p>{{p.description}}</p>
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
    // coverurl(){
    //   if(this.posts.cover.indexOf("http")!=-1){
    //     return this.posts.cover ;
    //   }else {
    //     return "http://zashare.org" + this.posts.cover ;
    //   }
    // }
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