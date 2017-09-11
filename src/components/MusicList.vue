<template>
  <div class="music-list">
    <div class="back-header back-header-music">
      <div class="back-header-all back-header-l" @click="back"><i class="el-icon-arrow-left"></i></div>
      <div class="back-header-all back-header-m">{{ title }}</div>
      <div class="back-header-all back-header-r"></div>
    </div>
		<div @scroll="srcollEvent" class="music-l">
			<ul @click="musicDetail">
        <li class="flex-c" v-for="item in data" :data-id="item.song_id" :key="item.song_id">
          <div class="flex-i flex-i1">
            <img :src="item.pic_small">
          </div>
          <p class="flex-i flex-i2" :title="item.title">{{ formateTitle(item.title) }}  {{item.author}} {{ duration(item.file_duration) }}</p>
        </li>   
      </ul>
      <div class="load-more"  v-if="isShowMore" v-loading="loadMore"></div>
		</div>	
	</div>
</template>

<script>
import _ from "underscore"
export default {
	components:{
		BackHead:require('./BackHead.vue')
	},
  name: 'music',
  data:function(){
    return {
    	data:[],
      loadMore:true,
      isShowMore:false
    }
  },
  computed:{
  	title:function(){
  		var data = this.$store.state.music,
  				i=0,
  				val=this.$route.params.id
  		for(var i=0;i<data.length;i++){
  			if(val == data[i].id) return data[i].alias
  		}
  	}
  },
  methods:{
    srcollEvent: _.throttle(function(event){
      this.isBottom()
    },1000),
    isBottom:function(){
      this.isShowMore = true
      var el = document.querySelector(".music-l")
      var elScrollTop = el.scrollTop
      var elScrollHeight = el.scrollHeight
      var elClientHeight = el.clientHeight
      if(elScrollHeight < (elScrollTop+elClientHeight+80)){
        this.getData()
      }
    },
    getData:function(){
      this.$http({
        url:API_PROXY+'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type='+this.$route.params.id+'&size=10&offset='+this.data.length,
        method:'get'
      }).then(function(response){
          //console.log(response.data.song_list)
          this.data = this.data.concat(response.data.song_list)
          this.isOpacity = 1
          this.isBottom()
          this.isShowMore = false
        }.bind(this))
        .catch(function(error){
          console.log(error)
        })
    },
    reset:function(){
    	this.data = [],
    	this.getData()
    },
    duration:function(val){
      if(!val) return "未知"
      return parseInt(val/60)+":"+(val%60)
    },
    formateTitle:function(val){
      if(val.length > 6){
        return val.slice(0,5)+"..."
      }
      return val
    },
    musicDetail:function(e){
      var target = e.target
      while(target.tagName != "LI"){
        if(!target.parentNode || target.tagName == "UL") return
        target = target.parentNode
      }
      //console.log(target.getAttribute("data-id"))
      this.$router.push({name:"musicDetail",params:{song_id:target.getAttribute("data-id")}})
      this.$store.commit("musicList",this.data)
    },
    back:function(){
      this.$router.go(-1)
    }
  },
  activated:function(){
    var musicListId = this.$store.state.musicListId,
        routeId = this.$route.params.id
    //console.log("actived",routeId,musicListId)
    this.$store.commit("musicListId",routeId)
    //console.log("actived",routeId,musicListId)
  	if(routeId != musicListId) this.reset()
  }
}
</script>

<style>
  .load-more{
    min-height:80px;
  }
  .back-header{
    height:50px;
    background-color:#2196f3;
    font-size:0;
    line-height:50px;
  }
  .back-header-all{
    font-size:1rem;
    color:white;
    vertical-align:middle;
    display:inline-block;
    width:20%;
    box-sizing:border-box;
  }
  .back-header-l{
    text-align:left;
    text-indent:1em;
  }
  .back-header-m{
    text-align:center;
    width:60%;
  }
  .back-header-music{
    position:fixed;
    width:100%;
    top:0;left:0;
  }
	.music-l{
    position: absolute;
		overflow-y:scroll;
    -webkit-overflow-scrolling:touch;
    top:50px;bottom:0px;
    width:100%;
	}
  .music-l::-webkit-scrollbar{
    display: none;
  }
  .flex-c{
    display:flex;
    align-items:center;
    margin-top:20px;
  }
  .flex-i1{
    width:20%;
  }
  .flex-i1 img{
    display:block;
    width:50%;
    border-radius:50%;
    margin:0 auto;
  }
  .flex-i2{
    width:80%;
    text-align:left;
    font-size:14px;
  }
</style>
