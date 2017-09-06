<template>
  <div class="slide">
    <transition name="slide">
      <div v-show="slideShow" class="slide-main">
        <slot>
          <div class="slide-main-top">wang</div>
          <div class="slide-main-bottom"></div>
        </slot>
      </div>
    </transition>
    <transition name="slide2">
      <div v-show="slideShow" @click="close" class="slide-side"></div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'slide',
  data:function(){
    return {
    	
    }
  },
  props:{
    slideShow:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    close:function(){
      this.$emit("closeSlide") 
    }
  }
}
</script>

<style scoped>
.slide{
}
.slide-main{
  width:80%;
  height:100%;
  background:white;
  position:absolute;
  top:0;
  z-index:3;
  z-index:6;
}
.slide-side{
  top:0;
  z-index:5;
  position:absolute;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.45);
}
.slide-main-top{
  background:#2196f3;
  color:white;
  line-height:4;
}




.slide-enter{
  transform:translateX(-400px);
}
.slide-enter-active{
  transition: all .3s ease;
}
.slide-enter-to{
  
}
.slide-leave{

}
.slide-leave-active{
  transition: all .3s ease;
}
.slide-leave-to{
  transform:translateX(-400px);
}

.slide2-enter{
  opacity:0;
}
.slide2-enter-active{
  transition: all .6s ease;
}
.slide2-enter-to{
  
}
.slide2-leave{

}
.slide2-leave-active{
  transition: all .6s ease;
}
.slide2-leave-to{
  opacity:0;
}
</style>
