<template>
  <div class="picture-detail">
    <back-head title="图片"></back-head>
    <div class="picD">
      <img @click="fadeArrow" :src="imgSrc">
      <div @click="last" :style="{opacity:opacity}" class="last arrow">&lt</div>
      <div @click="next" :style="{opacity:opacity}" class="next arrow">&gt</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pictureDetail',
  components:{
  	backHead:require('./BackHead.vue')
  },
  data:function(){
    return {
      imgSrc:null,
      opacity:1,
      index:0
    }
  },
  computed:{
    pics:function(){
      return this.$store.state.pics
    }
  },
  activated:function(){
    var that = this
    that.opacity = 1
    this.imgSrc = this.$route.params.url
    setTimeout(function(){
      that.opacity = 0
    },3000)
    this.index = this.$route.params.index
  },
  methods:{
    fadeArrow:function(){
      var that = this
      this.opacity = 1
      setTimeout(function(){
        that.opacity = 0
      },3000)
    },
    last:function(){
      var that = this
      this.opacity = 1
      setTimeout(function(){
        that.opacity = 0
      },4000)
      this.index -= 1
      if(this.index < 0){
        this.$message({message:'已经是最前面一张了.',type:"warning"})
        this.index += 1
        return
      }
      this.imgSrc = this.pics[this.index].url
    },
    next:function(){
      var that = this
      this.opacity = 1
      setTimeout(function(){
        that.opacity = 0
      },4000)
      this.index += 1
      if(this.index > (this.pics.length-1)){
        this.$message({message:'已经是最后一张了.',type:"warning"})
        this.index -= 1
        return
      }
      this.imgSrc = this.pics[this.index].url
    }
  }
}
</script>

<style scoped>
.picD{
  position: absolute;
  top:50px;bottom:0;left:0;right:0;
}
.picD img{
  display: block;
  width:100%;
  position: absolute;
  top:50%;transform:translateY(-50%);
}
.arrow{
  font-size:20px;
  position: absolute;
  top:50%;transform:translateY(-50%);
  color:white;
  background:rgba(0,0,0,.4);
  width:30px;height:40px;
  line-height:40px;
  transition:all 1s ease;
}
.last{
  
}
.next{
  right:0;
}
</style>
