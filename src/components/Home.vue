<template>
  <div class="home">
    <div class="header">
      <div @click="toggleSlide" class="header-side slide-bar">
        <div class="slide-btn">侧边栏</div>
      </div>
      <div class="header-side title">{{ title }}</div>
      <div class="header-side"></div>
    </div>
    <navigation></navigation>
    <!-- <alert title="成功提示的文案"></alert> -->
    <keep-alive><router-view></router-view></keep-alive>
    <slide @closeSlide="toggleSlide" :slideShow="slideShow"></slide>
    <!-- <render-ex></render-ex> -->
  </div>
</template>

<script>
export default {
  name: 'home',
  components:{
    navigation:require('./Nav.vue'),
    slide:require('./Slide.vue'),
    alert:require('./alert.vue'),
    renderEx:require('./renderEx.vue')
  },
  data:function(){
    return {
    	slideShow:false
    }
  },
  computed:{
    title:function(){
      var titleVal = this.$route.path.slice(1)
      var navs =  {
        "movie":"电影",
        "music":"音乐",
        "book":"书籍",
        "picture":"图片"
      }
      return navs[titleVal]
    }
  },
  watch:{

  },
  methods:{
    toggleSlide:function(){
      this.slideShow = !this.slideShow
    }
   }
}
</script>

<style scoped>
.header{
 text-align:left;
 box-sizing:border-box;
 font-size:0;
 text-align:center;
 line-height:50px;
 background:#2196f3;
 color:white;
 height:50px;
 position:fixed;
 width:100%;
 top:0;
}
.header-side{
  display:inline-block;
  width:20%;
  box-sizing:border-box;
  font-size:1rem;
}
.slide-bar{
}
.title{
  width:60%;
}

</style>
