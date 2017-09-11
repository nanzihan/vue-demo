<template>
  <div class="music">
		<div class="imgages">
			<router-link v-for="(nav,index) in navs" :key="index" :to="{name:'musicList',params:{id:nav.id}}">
				<div class="imgs">
					<img :src="nav.img" >
				</div>
			</router-link>
		</div>
  </div>
</template>

<script>
export default {
  name: 'music',
  data:function(){
    return {

    }
  },
  computed:{
    navs:function(){
      return this.$store.state.music
    }
  }
}
</script>

<style scoped>
.music::-webkit-scrollbar{
  display: none;
}
.music{
	position:absolute;
	top:50px;bottom:50px;
	width:100%;
	overflow:scroll;
	-webkit-overflow-scrolling:touch;
}
.imgages{
	display:flex;
	flex-wrap:wrap;
}
.imgages a{
	display:block;
	width:50%;
}
.imgs{
	flex-grow:1;
}
.imgages img{
	display:block;
	width:100%;
}
</style>
