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
        <h1>{{ p.title}}</h1>
        <p>{{p.description}}</p>
      </div>
  </div>
</template>


<script>
import $ from 'jquery'
export default {
  data:function(){
    return {
      posts:[]
    }
  },
  mounted(){
    $.get('http://awiclass.monoame.com/api/command.php?type=get&name=post').then(function(res){
      this.posts = JSON.parse(res)
      console.log(this.posts) 
    })
  }
}

</script>