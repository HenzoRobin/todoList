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
  resize: none;
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
      <form class="add-task">
        <input type="text" name="content" autocomplete="off" autofocus placeholder="e.g.按时吃药,别弃疗....." v-model="newItem">
        <button type="submit" @click.prevent="addNew">提交</button>
      </form>
      <ul class="task-list">
        <li class="task-item" v-for='(item,id) in items' v-bind:class="{ complete: items[id].isComplete}" @dblclick="showDetail(id)" >
          <!-- <span><input type="checkbox" @click="toggleComplete(id)" v-model="item.isComplete"></span> -->
          <span><input type="checkbox" @click="toggleComplete(items[id])" v-model="items[id].isComplete"></span>
          <span class="task-content">{{ items[id].label }}</span>
          <span class="fr">
            <span class="action delete" @click="deleteItem(item)">删除</span>
          </span>
          <!-- <div class="task-detail-mask" v-show="isShow" @click="hideDetail(item)"></div>
          <div class="task-detail" v-show="isShow"> -->

          <div class="task-detail-mask" v-show="items[id].isShow" @click="hideDetail(id)"></div>
          <div class="task-detail" v-show="items[id].isShow">
            <form>
              <div class="content">{{ items[id].label }}</div>
              <div class="input-item">
                <input  type="text" name="content">
              </div>
              <div>
                <div class="desc input-item">
                  <textarea name="desc" v-model="newDetail"></textarea>
                </div>
              </div>
              <div class="remind input-item">
                <label>提醒时间：</label>
                <input name="remind_date" type="date">
              </div>
              <div class="input-item"><button type="submit" @click.prevent="edit">提交</button></div>
            </form>
          </div>
        </li>
      </ul>
    </div>
    <calendar></calendar>
    <slides></slides>
    <game></game>
  </div>
</template>

<script>
import Store from './store'
import calendar from './components/calendar'
import slides from './components/slides'
import game from './components/game'
export default {
  components:{
    calendar,
    slides,
    game
  },
  data:function(){
    return {
      title:'Yo ! This My ToDo List',
      items:Store.fetch(),
      newItem:'',
      Details:'',
      newDetail:'',
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
    toggleComplete:function(id){
      this.items[id].isComplete = !this.items[id].isComplete
    },
/*
    showDetail:function(item) {
      this.item.isShow = true
    },
    hideDetail:function(item){
      this.item.isShow = false}*/

    showDetail:function(id) {

      this.items[id].isShow = true
    },
    hideDetail:function(id){

      this.items[id].isShow = false
    },
    addNew:function(){
      var value = this.newItem 
      if(value == ''){
        return
      }else {
          this.items.unshift({
          label:this.newItem,
          isComplete:false,
          isShow:false
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
    },
    edit:function(){

    }
  }
}
</script>