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
    height: 300px;
    float: left;
    overflow: hidden;
    border-radius: 10px;
    // img {
    //   background-size: cover;
    //   width: 100%;
    // }
  }
  .back {
    width: 300px;
    height: 300px;

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
      <div class="postbox" v-for="p in posts" :style="setBg(p.cover)">
        <!-- <img :src="p.cover"> -->
        <div class="move-panel">
          <h2>{{p.name}}</h2>
          <!-- <h4>{{p.title}}</h4>
          <p>{{p.description}}</p> -->
        </div>
      </div>
  </div>
</template>


<script>
import axios from 'axios'
import COMMON from './assets/common.js'

if (localStorage.getItem('user')) {
  COMMON.auth(axios)
}
export default {
  data:function(){
    return {
      posts:[],
      imgUrl: COMMON.URL.imgUrl
    }
  },
  methods: {
        getCate() {
      axios.get(`${COMMON.URL.merApi}categories`).then((res) => {
      res.data.data.map((item) => {
        if (item.id > 4) {
          this.posts.push({
            id: item.id,
            name: item.name,
            cover: this.imgUrl + item.showImg
          })
        }
        
      })
    }).catch((err) => {
      alert('草拟吗！')
      throw err
    })
    },
    setBg(url) {
      let ret = {}
      ret.background = `url(${url})`
      ret.backgroundSize = 'cover'
      return ret
    }
  },
  computed:{
    coverurl(){
      console.log(this.posts.cover)
      // if(this.posts.cover.indexOf("http")!=-1){
      //   return this.posts.cover ;
      // }else {
      //   return "http://zashare.org" + this.posts.cover ;
      // }
    },
  },
  mounted(){
    this.getCate()

  }
}

</script>