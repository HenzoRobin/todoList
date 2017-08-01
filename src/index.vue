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

export default {
  data:function(){
    return {
      bg:[{
        src: 'http://www.gmz88.com/picfile/news/contents/2016/06/17/2016061744232200.jpg'
      }]
    }
  }
}

</script>