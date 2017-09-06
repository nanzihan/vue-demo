<template>
  <div class="music-list">
  	<back-head :title="title"></back-head>
		<div class="music" v-loading="loading">
			<ul @click="musicDetail">
        <li class="flex-c" v-for="item in data.song_list" :data-id="item.song_id" :key="item.song_id">
          <div class="flex-i flex-i1">
            <img :src="item.pic_small">
          </div>
          <p class="flex-i flex-i2" :title="item.title">{{ formateTitle(item.title) }}  {{item.author}} {{ duration(item.file_duration) }}</p>
        </li>   
      </ul>
		</div>	
	</div>
</template>

<script>
export default {
	components:{
		BackHead:require('./BackHead.vue')
	},
  name: 'music',
  data:function(){
    return {
    	data:[],
    	loading:true
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
  mounted:function(){
  	
  },
  methods:{
    getData:function(){
      this.$http({
        url:API_PROXY+'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type='+this.$route.params.id+'&size=10&offset=0',
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
    	this.data = [],
    	this.loading = true
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

<style scoped>
	.music{
		min-height:50vh;
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
