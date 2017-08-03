// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'  
import Layout from './Layout'
import VueRouter from 'vue-router'
import slides from './components/slides'
import game from './components/game'
import todo from './components/todo'
import calendar from './components/calendar'
import index from './index'


Vue.use(VueRouter)
let router = new VueRouter({
	model:'histor',
	routes:[
		{
			path:'/',
			component:index
		},
		{
			path:'/slides',
			component:slides
		},
		{
			path:'/game',
			component:game
		},
		{
			path:'/todo',
			component:todo
		},
		{
			path:'/calendar',
			component:calendar
		}
	]
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
