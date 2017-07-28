<style scoped>
* {
	margin: 0;
}
body {
	background-color: lightgrey;
}
.blockarea,
h2 {
	margin:  0 auto;
}

.block {
	width: 150px;
	height: 150px;
	border: 1px solid rgba(0, 0, 0, .4);
	box-sizing: border-box;
}
.circle,
.cross {
	position: relative;
}
.circle::after,
.circle::before,
.cross::after,
.cross::before {
	content: "";
	display: block;
	border-radius: 50%;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	transition: all .3s ;
}
.circle::before {
	width: 135px;
	height: 135px;
	background-color: #f35;
}
.circle::after {
	width: 90px;
	height: 90px;
	background-color: #1d7c80;
}
.cross::before,
.cross::after{
	width: 135px;
	height: 25px;
	background-color: #fff;
	border-radius: 20px;
}
.cross::before {
	transform: translate(-50%,-50%) rotate(45deg);
}
.cross::after {
	transform: translate(-50%,-50%) rotate(-45deg);
}
.smallnum {
	opacity: .5;
}
.blockarea {
	width: 450px;
	height: 450px;
	flex-wrap: wrap;
	display: flex;
}
.small {
	margin: 10px auto;
}
h2 {
	width: 150px;
	border: 2px solid #444;
	padding: 10px;
	cursor: pointer;
	transition: .2s;
	text-align: center;
	background-color: #fff;
	color: #222;
}
h2:hover {
	background-color: rgba(200, 200,200 .9);
	border-radius: 25px;
}
</style>


<template>
  <div>
	  		<h1>{{ wintext }}</h1>
			<div class="blockarea">
				<div class="block" v-for = "(block,id) in blocks" v-bind:class="{circle:block.type == 1 , cross:block.type == -1}" v-on:click = "playergo(block)">
					<div class="smallnum">
						{{ id + 1 }}
					</div>
				</div>
			</div>
			<div class="block small" v-bind:class="{circle:turn == 1 , cross:turn == -1}"></div>
			<h2 v-on:click="restart">Restart</h2>
  </div>
</template>


<script>

export default {
    data:function(){
        return {
    	    blocks:[],
		    turn:1
        }  
    },
    mounted(){
	    this.restart()
    },
	methods:{
		restart(){
			this.blocks = Array.from({length:9},function(d,i){
				return {
					id:i+1,
					type:0
				}
			})
		},
		playergo(block){
			if(block.type==0){
				block.type = this.turn
				this.turn = -this.turn
			}else {
				alert("not allowed")
			}
			
		}
	},
	computed:{
		pattern(){
			var verify = "123,456,789,147,369,258,159,357"
			var result =
			verify.split(",").map((vtext)=>{
				var add = this.blocks.filter((d,i)=>(vtext.indexOf(i+1)!=-1)).map((d,i)=>d.type).
					reduce((a,b)=>a+b,0)
				return {
					rule:vtext,
					value:add
				}
			})
			result = result.filter((obj)=>Math.abs(obj.value)==3)
			return result
		},
		wintext(){
			var winner = -1
			if(this.pattern.length > 0 ){
				winner = this.pattern[0].value
			}
			if(winner == 3){
				return "O wins"
			}else if(winner == -3){
				return "X wins"
			}
			return (this.turn == 1 ? 'O':'X')+ "'turn"
		}
	}
}

</script>