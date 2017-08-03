<style scoped lang="less">
* {
  margin: 0;
  box-sizing: border-box;
}
.bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    display: block;
  }
}
</style>


<template>
  <div class="bg">
    <img  :src="bg[0].src">
  </div>
</template>


<script>
import $ from 'jquery'
export default {
  data:function(){
    return {
      bg:[{
        src: 'http://www.gmz88.com/picfile/news/contents/2016/06/17/2016061744232200.jpg'
      }],
      posts:[]
    }
  },
  mounted(){
    var vobj = this
    $.get('http://awiclass.monoame.com/api/command.php?type=get&name=post').then(function(res){
      vobj.posts=JSON.parse(res);
      console.log(vobj.posts)
    })
  }
}

</script>