<template>
<div id="movie-top">
  <div v-loading="loading" element-loading-target="document.querySelector('.movie-top-items')" class="movie-top-items">
    <div class="item" v-for="item in items" @click="MovieDetail(item)">
      <div class="item-all item-img">
        <img :src="item.images.medium" >
      </div>
      <div class="item-all item-main">
        <div class="item-all item-main-l">
          <p class="item-p1">{{ item.title }}</p>
          <p class="item-p2">{{ item.title }}平均分{{ item.rating.average }}</p>
        </div><div class="item-all item-main-r">
          <p>see</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data:function(){
    return{
      items:[],
      loading:true
    }
  },
  mounted:function(){
    this.getData()
  },
  methods:{
    getData:function(){
      this.$http({
        url:API_PROXY+'https://api.douban.com/v2/movie/coming_soon',
        method:'get'
      }).then(function(response){
          //console.log(response.data.subjects)
          this.items = response.data.subjects
          if(this.items) this.loading = false
        }.bind(this))
        .catch(function(error){
          console.log(error)
        })
    },
    MovieDetail:function(item){
      console.log(item)
      this.$router.push({name:'movieDetail',params:{id:item.id,title:item.title}})
    }
  }

}
</script>
<style scoped>
#movie-top{
  margin-top:50px;
  min-height:50vh;
}
.movie-top-items{
  overflow-y: scroll;
  min-height:50vh;
}
.item{
  font-size:0;
  margin-top:1rem;
}
.item-all{
  display:inline-block;
  vertical-align:middle;
  font-size:1rem;
}
.item-img{
  width:20%;
}
.item-img img{
  display:block;
  width:60%;
  margin:0 auto;
}
.item-main{
  width:80%;
  border-bottom:1px solid #ccc;
  text-align:left;
}
.item-main-l{
  width:80%;
}
.item-main-r{
  width:20%;
}
.item-p1{
  margin-top:1rem;
}
.item-p2{
  margin-bottom:1rem
}
</style>



