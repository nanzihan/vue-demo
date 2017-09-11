<template>
  <div class="movie">
    <div class="movies">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="TOP250" name="first">
           <movie-top></movie-top>
        </el-tab-pane>
        <el-tab-pane label="正在热映" name="second">
           <movie-now></movie-now>
        </el-tab-pane>
        <el-tab-pane label="即将上映" name="third">
           <movie-will></movie-will>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'movie',
  components:{
    movieTop:require('./movieTop.vue'),
    movieNow:require('./movieNow.vue'),
    movieWill:require('./movieWill.vue')
  },
  data:function(){
    return {
    	activeName: 'first'
    }
  },
  methods:{
  	handleClick:function(tab,event){
  		//console.log(tab, event);
  	}
  }
}
</script>

<style>
.movie::-webkit-scrollbar, body::-webkit-scrollbar{
  display: none;
}
.movie{
  position:absolute;
  width:100%;
  top:50px;
  bottom:50px;
  overflow-y:scroll;
  -webkit-overflow-scrolling:touch;
}
.el-tabs__nav{
  position:fixed !important;
  top:50px;
  width:100%;
  z-index:4;
  background:white;
}
.el-tabs__header{
  margin:0  !important;
}
.el-tabs__nav{
	width:100%;
}
.el-tabs__item{
	width:33.3%;
}
</style>
