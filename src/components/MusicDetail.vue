<template>
  <div class="music-detail">
    <div class="back-header back-header-music">
      <div class="back-header-all back-header-l" @click="back"><i class="el-icon-arrow-left"></i></div>
      <div class="back-header-all back-header-m">{{ data.data.songinfo.title }}</div>
      <div class="back-header-all back-header-r"></div>
    </div>
    <div id="lrcBox">
      <div id="lrcs" v-html="lrcHtml"></div>
      <audio @timeupdate="timeUpdate" id="audio" :src="data.data.bitrate.show_link"></audio>
    </div>
    <div class="controls">
      <div class="controls-btns">
        <div class="btn btn-last"><i @click="preSong" class="el-icon-d-arrow-left"></i></div>
        <div class="btn btn-play"><i @click="isPlay">play</i></div>
        <div class="btn btn next"><i @click="nextSong" class="el-icon-d-arrow-right"></i></div>
      </div>
    </div>
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
      forIndex:0
    }
  },
  computed:{
    AudioEl:function(){
      return document.getElementById("audio")
    }
  },
  methods:{
    getSongSource:function(songId){
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
      var arr = this.filterLrc(this.data.lrc.split(/\n/)),
          i = 0,
          str=''
      for(i;i<arr.length;i++){
        str = arr[i]
        this.lrcArr.push(parseFloat((parseInt(str.slice(1,3))*60+parseFloat(str.slice(4,9))).toFixed(2)))
        this.lrcHtml = this.lrcHtml + '<p class="lrc-p" id="lrc'+i+'">'+arr[i].slice(0)+'</p>'
      }
    },
    timeUpdate:function(event){
      if(this.ended){//播放结束
        this.resetStatus()
      }
      var curTime = event.target.currentTime
      for(var i=0;i<this.lrcArr.length;i++){
        if(curTime <= this.lrcArr[i] && curTime <= this.lrcArr[i+1]){
          this.forIndex = i
          if(this.forIndex == i){
            this.forIndex = i+1
            var curI = i-1
            var el = document.getElementById("lrc"+curI)
            if(el){
              try{
                var elActive = document.querySelector(".lrcActive")
                if(el ==  elActive) return 
                var elId = elActive.id.match(/\d+/)[0]
                elActive.classList.remove("lrcActive")
              }catch(e){}
              document.getElementById("lrcBox").scrollTop = el.offsetTop
              el.classList.add("lrcActive")
              break
            }
          }
        }
      }
    },
    filterLrc:function(arr){
      return arr.filter(function(item){
        return /\[\d{2}\:\d{2}\.\d{2}\]/.test(item)
      })
    },
    back:function(){
      this.$router.go(-1)
      this.$destroy()
    },
    resetStatus:function(){
      this.forIndex = 0
      this.lrcHtml = ""
      this.lrcArr = []
      setTimeout(function(){
        document.getElementById("lrcBox").scrollTop = 0
      },100)
    },
    isPlay:function(){
      if(this.AudioEl.paused){
        console.log("pause")
        this.AudioEl.play()
      }else{
        console.log("play")
        this.AudioEl.pause()
      }
    },
    preSong:function(){
      console.log(1)
    },
    nextSong:function(){
      console.log(1)
    }
  },
  activated:function(){
    this.getSongSource(this.$route.params.song_id)
  }
}
</script>

<style>
  #app{height:100%;width:100%;}
  .music-detail{
    width:100%;min-height:100%;
  }
  .back-header-music{
    position:fixed;
    width:100%;
    top:0;left:0;
  }
  .controls{
    position: fixed;
    width:100%;left:0;bottom:0;height:100px;
  }
  .controls-btns{
    display: flex;
    line-height:100px;
  }
  .btn{
    flex-grow:1;
  }
  .btn i{
    padding:20px;
  }
  #lrcBox::-webkit-scrollbar{
    display: none;
  }
  #lrcBox{
    width:100%;
    background-color:#ccc;
    color:white;text-align:center;
    overflow-y:scroll;
    -webkit-overflow-scrolling:touch;
    box-sizing:border-box;
    position:absolute;
    top:50px;bottom:100px;left:0;right:0;
  }
  #lrcs{
    position:relative;box-sizing:border-box;
    width:100%;top:120px;
  }
  #audio{margin:0 auto;display:block;}
  .lrc-p{line-height:25px;font-size:14px;min-height:25px;}
  .lrcActive{color:green;transform:scale(1.2);transition:all .4s linear}
</style>
