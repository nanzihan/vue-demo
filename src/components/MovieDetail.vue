<template>
<div>
	<back-head :title="title"></back-head>
  <div @refresh="reset" v-loading="loading" class="movie-detail">
    <div :style="{opacity:isOpacity}">
      <img :src="data.images ? data.images.large : ''">
      <p>{{ data.summary }}</p>
      <p><span v-for="i in data.genres">{{ i }}</span></p>
      <p>年份:{{ data.year }}</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data:function(){
    return{
    	data:{},
      title:this.$route.params.title,
      loading:true,
      isOpacity:0
    }
  },
  components:{
  	BackHead:require('./BackHead.vue')
  },
  mounted:function(){
  	console.log(this.$route)
    this.getData()
  },
  updated:function(){

  },
  methods:{
    getData:function(){
      this.$http({
        url:API_PROXY+'https://api.douban.com/v2/movie/subject/'+this.$route.params.id,
        method:'get'
      }).then(function(response){
          console.log(response.data)
          this.data = response.data
          this.loading = false
          this.isOpacity = 1
        }.bind(this))
        .catch(function(error){
          console.log(error)
        })
    },
    reset:function(){
      this.data = {}
      this.getData()
      this.title = this.$route.params.title
      this.loading = true
      this.isOpacity = 0
    }
  },
  activated:function(){
    this.reset()
  }
}
</script>
<style scoped>
	.movie-detail{
		padding:0 10px;
    min-height:50vh;
	}
</style>



