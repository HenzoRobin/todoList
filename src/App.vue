<style>
*{
  box-sizing: border-box;
  font-family: 'microsoft yahei';
  transition: background-color .15s;
  outline: 0;
  margin: 0px;
  padding: 0px;
}
body {
  background-color: #1d7c80;
  color: #fff;
}
.container {
  max-width: 900px;
  margin:0 auto;
  position: relative;
  padding:0 15px;
}
ul {
  list-style: none;
}
li {
  display: block;
}
h1 {
  text-align: center;
  padding: 20px;
  margin: 0;
}
input ,
.task-item ,
button,
textarea,
.task-detail-mask ,
.task-detail  {
  padding:10px;
  border-radius: 3px;
}
textarea {
  min-height: 100px;
}

input[type=text],
input[type=date],
textarea {
  border: 0;
  width: 100%;  
  display: block;
  background-color: #eee;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.3);
}
textarea:hover,
textarea:focus,
input[type=text]:hover ,
input[type=date]:hover ,
input[type=text]:focus ,
input[type=date]:focus{
  background-color: #ddd;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
}
input[type="checkbox"]{
  display: inline-block;
  width: 18px;
  height: 18px;
}
button {
  color: #333;
  border: 0;
  cursor: pointer;
  display: inline-block;
}
.add-task input[type=text] {
  float: left;
  width: 84%;
  margin-right:1%;
}
button[type=submit] {
  background-color: #33b0b5;
}
.add-task button[type=submit] {
  width: 15%;
  background-color: #33b0b5;
}
.add-task button[type=submit] ,
.task-item {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
}
.add-task button[type=submit]:hover {
  background-color: #4fc9ce;
}
.task-item {
  background-color: #fff;
  color: #333;
  margin-bottom: 5px;
  cursor: pointer;
}
.task-item:hover {
  background-color: #ddd;
}
.task-list {
  margin:10px 0;
}
.action {
  color: #888;
  font-size: 90%;
}
.action:hover {
  color: #333;
}
.fr {
  float: right;
}
.task-content {
  margin-left: 10px;
}
.complete {
  opacity: 0.5;
  background-color: lightgrey;
}
.complete::after {
  content: '';
  height: 1px;
  background-color: #222;
  width: 97%;
  position: relative;
  top: -8px;
  display: block;
  float: right;
}
.task-detail {
  width: 35%;
  min-height: 340px;
  background-color: #fff;
  top: 20%;
  left: 30%;
  right: 30%;
}
.task-detail-mask,
.task-detail {
  position: fixed;
  /* display: none; */
}
.show {
  display: block;
}
.task-detail-mask{
  top:0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .6);
}
.task-detail .input-item{
  margin-bottom: 10px;
}
.task-detail .content {
  padding:10px;
  font-weight: 900;
  cursor: pointer;
  color: #222;
}
.remind>label {
  color: #222;
}
</style>

<template>
  <div id="app">

    <div class="container">
      <h1 v-text="title"></h1>
      <slider :slides="slides" :time="slideSpeed"></slider>
      <form class="add-task">
        <input type="text" name="content" autocomplete="off" autofocus placeholder="e.g.按时吃药,别弃疗....." v-model="newItem">
        <button type="submit" @click.prevent="addNew">提交</button>
      </form>
      <ul class="task-list">
        <li class="task-item" v-for='(item,id) in items' v-bind:class="{ complete: item.isComplete}" @dblclick="showDetail(item)" >
          <span><input type="checkbox" @click="toggleComplete(item)" v-model="item.isComplete"></span>
          <span class="task-content">{{ item.label }}</span>
          <span class="fr">
            <span class="action delete" @click="deleteItem(item)">删除</span>
          </span>
        </li>
      </ul>
      <div class="task-detail-mask" v-show="isShow" @click="hideDetail"></div>
      <div class="task-detail" v-show="isShow" v-for='(item,id) in items'>
        <form>
          <div class="content">{{ item.label }}</div>
          <div class="input-item">
            <input  type="text" name="content">
          </div>
          <div>
            <div class="desc input-item">
              <textarea name="desc"></textarea>
            </div>
          </div>
          <div class="remind input-item">
            <label>提醒时间：</label>
            <input class="datetime" name="remind_date" type="text">
          </div>
          <div class="input-item"><button type="submit">提交</button></div>
        </form>
      </div>
    </div>
    <calendar></calendar>
  </div>
</template>

<script>
import slider from './components/slider'
import Store from './store'
import calendar from './components/calendar'
export default {
  components:{
    slider,
    calendar,
  },
  data:function(){
    return {
      title:'Yo ! This My ToDo List',
      items:Store.fetch(),
      newItem:'',
      isShow:false,
      slideSpeed:2000,
      slides:[
        {
          src:require('./assets/slideShow/pic1.jpg'),
          title:'我是图片一'
        },
        {
          src:require('./assets/slideShow/pic2.jpg'),
          title:'我是图片二'
        },
        {
          src:require('./assets/slideShow/pic3.jpg'),
          title:'我是图片三'
        },
        {
          src:require('./assets/slideShow/pic4.jpg'),
          title:'我是图片四'
        }
      ]
    }
  },
  watch:{
    items:{
      handler:function(items){
        Store.save(items)
      },
      deep:true
    }
  },
  methods:{
    toggleComplete:function(item){
      item.isComplete = item.isComplete
    },
    showDetail:function(item) {
      this.isShow = true
    },
    hideDetail:function(item){
      this.isShow = false
    },
    addNew:function(){
      var value = this.newItem 
      if(value == ''){
        return
      }else {
          this.items.unshift({
          label:this.newItem,
          isComplete:false
        })
      }
      this.newItem = ''
    },
    deleteItem:function(item){
      var tmp = confirm('确认删除')
      if(tmp){
        this.items.splice(this.items.indexOf(item),1)
      }else {
        return
      }
    }
  }
}
</script>