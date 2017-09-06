<template>
<div class="back-header">
  <div class="back-header-all back-header-l" @click="back">back</div>
  <div class="back-header-all back-header-m">{{ title }}</div>
  <div class="back-header-all back-header-r"></div>
</div>
</template>
<script>
export default {
  name:"BackHead",
  data:function(){
    return{
    }
  },
  props:{
    title:{
      type:String
    }
  },
  methods:{
    back:function(){
      this.$router.go(-1)
      this.$emit("refresh")
    }
  }
}
</script>
<style scoped>
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
    text-indent:1.5em;
  }
  .back-header-m{
    text-align:center;
    width:60%;
  }
</style>



