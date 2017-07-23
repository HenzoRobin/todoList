<style scoped>
  .slide-show {
    position: relative;
    max-width:960px;
    height: 200px;
    overflow: hidden;
    border-radius: 5px;
    margin-bottom: 30px;
  }
  .slide-img {
    width: 100%;
  }
  .slide-img img {
    width: 100%;
    height: 250px;
    position: absolute;
    top: 0;
  }
  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 350px;
  }
  .slide-pages>li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
  }
  .slide-pages>li>a {
    font-weight: 900;
    color: black;
  }
  .left,
  .right {
    font-size: 50px;
    text-align: center;
    position: absolute;
    top: 0;
    display: block;
    width: 90px;
    height: 100%;
    cursor: pointer;
    background-color: rgba(0, 0, 0, .2)
  }
  .left:hover,
  .right:hover {
    background-color: rgba(0, 0, 0, .4)
  }
  .right {
    right: 0;
  }
  .ancho:hover {
    color: #666;
  }
  .slide-trans-enter-active {
    transition: all 5s;
  }
  .slide-trans-enter {
    transform: translateX(960px);
  }
  .slide-trans-old-leave-active {
    transition: all 5s;
    transform: translateX(-960px);
  }
</style>


<template>
  <div class="slide-show" @mouseover= "clearTimer" @mouseout="runTimer">
    <div class="slide-img">
      <a href="xxx">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    <a class="left" @click="goPrev()">&lt;</a>
    <ul class="slide-pages">
      <li v-for="(item,index) in slides" @click="goto(index)">
        <a class="ancho">{{ index+1 }}</a>
      </li>
    </ul>
    <a class="right" @click="goNext()">&gt;</a>
  </div>
</template>


<script>

export default {
  props:{
    slides:{
      type:Array,
      default: []
    },
    time:{
      type:Number,
      default:1000
    }
  },
  data:function(){
    return {
      nowIndex:0 ,
      isShow:true
    }
  },
  methods:{
    goto(index){
      this.isShow = false
      setTimeout(()=>{
        this.isShow = true
        this.nowIndex = index
      },10)
    },
    goPrev(){
      if(this.nowIndex == 0){
        return this.nowIndex = 3
      }else {
        this.nowIndex = this.nowIndex - 1
      }
    },
    goNext(){
      if(this.nowIndex == 3){
        return this.nowIndex = 0
      }else {
        this.nowIndex = this.nowIndex + 1 
      }
    },
    runTimer(){
      this.tId = setInterval(()=>{
        this.goNext()
      },this.time)
    },
    clearTimer(){
      clearInterval(this.tId)
    }
  },
  mounted (){
    this.runTimer()
  }
}

</script>