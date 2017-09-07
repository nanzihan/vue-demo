<template>
  <div class="music-detail">
  	<back-head :title="data.data.songinfo.title"></back-head>
    <div id="lrcBox">
      <div :style="{top:top+'px'}" id="lrcs" v-html="lrcHtml"></div>
    </div>
    <audio @timeupdate="timeUpdate" id="audio" controls="controls" :src="data.data.bitrate.show_link"></audio>
  </div>
</template>

<script>
export default {
  name: 'musicDetail',
  components:{
  	backHead:require('./BackHead.vue')
  },
  data:function(){
    return {
      data:{
        data:{
          songinfo:{
            title:""
          },
          bitrate:{
            show_link:null
          }
        },
        lrc:null
      },
      lrcHtml:"",
      lrcArr:[],
      top:100
    }
  },
  methods:{
    getSongSource:function(){
      var songId = this.$route.params.song_id
      this.$http({
        url:API_PROXY+'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=' + songId,
        method:'get'
      }).then(function(response){
          //console.log(response.data)
          this.data.data = response.data
        }.bind(this))
        .catch(function(error){
          console.log(error)
        })
      this.$http({
        url:API_PROXY+'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=' + songId,
        method:'get'
      }).then(function(response){
          //console.log(response.data)
          this.data.lrc = response.data.lrcContent
          this.lrcHtml = ""
          this.parseLrcHtml()
        }.bind(this))
        .catch(function(error){
          console.log(error)
        })
    },
    parseLrcHtml:function(){
      if(!this.data.lrc) return
      var arr = this.data.lrc.split(/\n/),
          i = 0,
          str=''
      for(i;i<arr.length;i++){
        str = arr[i]
        this.lrcArr.push(parseFloat((parseInt(str.slice(1,3))*60+parseFloat(str.slice(4,9))).toFixed(2)))
        this.lrcHtml = this.lrcHtml + '<p class="lrc-p" id="lrc'+i+'">'+arr[i].slice(10)+'</p>'
      }
    },
    timeUpdate:function(event){
      var curTime = event.target.currentTime
      //console.log(curTime)
      for(var i=0;i<this.lrcArr.length;i++){
        if(curTime < this.lrcArr[i]){
          try{
            var elActive = document.querySelector(".lrcActive")
            var elId = elActive.id.match(/\d+/)[0]
            elActive.classList.remove("lrcActive")
          }catch(e){}
          var curI = i-1
          var el = document.getElementById("lrc"+curI)
          if(el){
            var top = 100 - el.offsetTop
            //console.log(elId,i,el.offsetTop,top)
            if((i-2) == elId){
              this.top = top
            }
            el.classList.add("lrcActive")
            break
          }
        }
      }
    }
  },
  activated:function(){
    this.getSongSource()
  },
  mounted:function(){
    this.getSongSource()
  }
}
</script>

<style>
  #lrcBox{width:300px;height:300px;background-color:#ccc;color:white;text-align:center;overflow:hidden;box-sizing:border-box;padding:10px 20px;position:relative;margin:50px auto 0;}
  #lrcs{position:relative;box-sizing:border-box;width:100%;transition:all .4s linear;}
  #audio{margin:0 auto;display:block;}
  .lrc-p{line-height:25px;font-size:14px;min-height:25px;}
  .lrcActive{color:green;transform:scale(1.2)}
</style>
