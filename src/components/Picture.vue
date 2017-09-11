<template>
  <div @scroll="srcollEvent" class="pictures">
    <div class="pic-box">
        <div v-for="(item,index) in data" :key="index" class="pic-item">
          <router-link :to="{name:'pictureDetail',params:{id:item._id,index:index,url:item.url}}">
            <img :src="item.url" >
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import _ from "underscore"
export default {
  name: 'picture',
  data:function(){
    return {
      page:1
    }
  },
  computed:{
    data:function(){
      return this.$store.state.pics
    }
  },
  methods:{
    getData:function(){
      this.$http({
        url:'https://gank.io/api/data/福利/10/'+this.page,
        method:'get'
      }).then(function(response){
          //console.log(response.data)
          this.$store.commit('addPics',response.data.results)
          this.page += 1
          this.isBottom()
        }.bind(this))
        .catch(function(error){
          console.log(error)
        })
    },
    srcollEvent: _.throttle(function(event){
      this.isBottom()
    },1000),
    isBottom:function(){
      var el = document.querySelector(".pictures")
      var elScrollTop = el.scrollTop
      var elScrollHeight = el.scrollHeight
      var elClientHeight = el.clientHeight
      //console.log(elScrollHeight,(elScrollTop+elClientHeight))
      if(elScrollHeight < (elScrollTop+elClientHeight+100)){
        this.getData()
      }
    }
  },
  mounted:function(){
    this.getData()
  }
}
</script>

<style>
.back-header-music{
  position:fixed;
  width:100%;
  top:0;left:0;
}
.pictures::-webkit-scrollbar{
  display: none;
}
.el-tab-pane::-webkit-scrollbar{
  display: none;
}
.pictures{
	position:absolute;
	top:50px;bottom:50px;
	width:100%;
  overflow-y:scroll;
  -webkit-overflow-scrolling:touch;
}
.el-tab-pane{
  overflow-y:scroll;
  -webkit-overflow-scrolling:touch;
}
.pic-box{
  display: flex;
  flex-wrap:wrap;
}
.pic-item{
  flex-grow:1;
  height: 100px;
  margin: 2px;
}
.pic-item  img{
  height: 100px;
  min-width: 100%;     
  max-width: 100%;
  object-fit: cover; 
  vertical-align: bottom;
}
@media (max-width: 1000px) and (min-width: 900px) {
  .pic-box::after {
      content: '';
      flex-grow: 999999999;
    }
}
@media (max-width: 1100px) and (min-width: 1000px) {
  .pic-box::after {
      content: '';
      flex-grow: 999999999;
    }
}
</style>
