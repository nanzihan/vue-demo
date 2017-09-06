<template>
  <div class="nav">
		<div class="nav-items">
			<router-link v-for="(nav,index) in navs" :key="index" :to="nav.name"><div class="nav-item">
	    	<p>{{ nav.alias }}</p>	
	    </div></router-link>
		</div>
  </div>
</template>

<script>
export default {
  name: 'nav',
  data:function(){
    return {
    	navs:[
    		{name:"movie",alias:"电影"},
    		{name:"music",alias:"音乐"},
    		{name:"book",alias:"书籍"},
    		{name:"picture",alias:"图片"}
    	]
    }
  },
  methods:{
  	
  }
}
</script>

<style scoped>
	.nav{
		position:fixed;
		bottom:0;
		width:100%;
	}
	.nav-items{
		
		font-size:0;
		letter-spacing:2px;
		box-sizing:border-box;
	}
	.nav-item{
		width:25%;
		color:white;
		display:inline-block;
		vertical-align:middle;
		font-size:1rem;
		background-color:#2196f3;
		line-height:50px;
		box-sizing:border-box;
	}
	a:hover, a:visited, a:link, a:active, a:focus {
  	color:black;text-decoration:none;outline:none;
	}
	a:
</style>
