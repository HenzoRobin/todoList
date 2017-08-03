<style scoped>

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.container {
	margin: 20px auto;
	width: 870px;
	height: 250px;
	overflow: hidden;
	position: relative;
	border-radius: 5px;
}
.slider {
	width: 6300px;
	height: 250px;
	position: absolute;
	transition: .4s;
}
.slider .show-img {
	float:left;
}
.show-img {
	width: 900px;
	height: 250px;
}
.container:hover .infos {
	transform: translateX(150px);
}
.container:hover .infos>h1 {
	transform: translateX(120px);
}
.container:hover .arrow {
	display: block;
}
.infos {
	margin-top: 90px;
	width: 350px;
	transform: translateX(100px);
	transition:  .5s;
}
.infos h1 {
	font-size: 40px;
	color: #fff;
	font-weight: 400;
	transition:  .3s;
}
.infos h3 {
	border-radius: 5px;
	color: #222;
	font-size: 19px;
	font-weight: 100;
	background-color: #fff;
	transition:  .5s;
	box-shadow:  0 0 0 3px #fff;
}
.arrow {
	cursor: pointer;
	line-height: 39px;
	text-align: center; 
	font-size: 36px;
	font-weight: bold;
	width: 40px;
	height: 40px;
	z-index: 3;
	display: none;
	position: absolute;
	top: 100px;
	background-color: rgba(0, 0, 0, .3);
	color: #fff;
	transition: .3s;
}
.next {
	left: 830px;
}
.prev {
	left: 0;
}
.prev:hover,
.next:hover {
	background-color: rgba(0, 0, 0, .5)
}
</style>


<template>
  	<div>
		<div class="container" @mouseover="cleartimer" @mouseout="autoplay">
			<a class="arrow prev" @click="goprev">&lt;</a>
			<a class="arrow next" @click="gonext">&gt;</a>
			<div class="slider" :style="computeleft">	
				<div class="show-img" v-for="item in slides" :style="bg(item.src)">
					<div class="infos">
						<h1>{{ item.title }}</h1>
						<h3>{{ item.des }}</h3>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>

export default {
	data:function(){
		return {
 			nowIndex: 0,
 			span : 900,
 			slides:[
 				{
 					title:'Hello World',
 					des:'Heros never die!Heros never die!Heros never die!Heros never die!Heros never die!',
 					src:'https://unsplash.it/900/250?image=4'
 				},
 				{
 					title:'Hello World',
 					des:'Heros never die!Heros never die!Heros never die!Heros never die!Heros never die!',
 					src:'https://unsplash.it/900/250?image=3'
 				},
 				{
 					title:'Hello World',
 					des:'Heros never die!Heros never die!Heros never die!Heros never die!Heros never die!',
 					src:'https://unsplash.it/900/250?image=2'
 				},
 				{
 					title:'Hello World',
 					des:'Heros never die!Heros never die!Heros never die!Heros never die!Heros never die!',
 					src:'https://unsplash.it/900/250?image=1'
 				}
 			]
		}
 	},
	computed:{
		computeleft(){
			var result = {"left":(-this.nowIndex * this.span) + "px"}
			return result
		}
	},
	methods:{
		goprev(){
			if(this.nowIndex == 0){
				this.nowIndex = 3
			}else {
				this.nowIndex = this.nowIndex - 1 
			}
		},
		gonext(){
			if(this.nowIndex == 3) {
				this.nowIndex = 0
			}else {
				this.nowIndex = this.nowIndex + 1
			} 
		},
		bg(src){
			return {
				"background-image":"url("+src+")"
			}
		},
		autoplay(){
			this.Id = setInterval(()=>{
				this.gonext()
			},2500)
		},
		cleartimer(){
			clearInterval(this.Id)
		}
	},
	mounted(){
		// this.autoplay()
	}
}

</script>