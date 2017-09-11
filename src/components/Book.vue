<template>
  <div class="books">
    <div class="book">
      <swipe class="my-swipe">
        <swipe-item class="slide1"></swipe-item>
        <swipe-item class="slide2"></swipe-item>
        <swipe-item class="slide3"></swipe-item>
      </swipe>
<!-- 		  <el-carousel :interval="50000" arrow="never">
		    <el-carousel-item v-for="(img,index) in imgs" :key="index">
		      <img class="carouseel-img" :src="img.src">
		    </el-carousel-item>
		  </el-carousel> -->
      <div class="books-box" v-loading="loading">
        <div class="book-item" v-for="(book,index) in books">
          <div class="book-l">
            <img :src="book.book.images.small" >
          </div>  
          <div class="book-m">
            <p>{{ book.book.title }}</p>
            <p><span v-for="au in book.book.author">{{ formatau(au) }}</span>{{ formatAuther(book.book.author_intro) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vue-swipe'
export default {
  name: 'hello',
  components:{
    Swipe,
    SwipeItem
  },
  data:function(){
    return {
    	imgs:[
    	 {src:"../../static/img/book1.png"},
    	 {src:"../../static/img/book2.png"}
    	],
    	books:[],
      loading:true
    }
  },
  methods: {
    getData:function(){
      this.$http({
        url:API_PROXY+'https://api.douban.com/v2/book/user/alex1504/collections',
        method:'get'
      })
      .then(function(res) {
        console.log(res.data)
        this.books = res.data.collections
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    formatAuther:function(val){
      if(!val) return
      if(val.length>30) return val.slice(0,27) + "..."
    },
    formatau:function(val){
      return "作者:"+val+" "
    }
  },
   mounted:function(){
    console.log(1)
    this.getData()
  },
}
</script>

<style>
.books::-webkit-scrollbar{
  display: none;
}
.books{
	position:absolute;
	top:50px;bottom:50px;
	width:100%;
  overflow-y:scroll;
  -webkit-overflow-scrolling:touch;
}
.my-swipe {
  width: 100%;
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;

}
.my-swipe .mint-swipe-item{
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.mint-swipe-items-wrap{
    height: 100% !important;
}
.slide1 {
  background: url('https://img3.doubanio.com/lpic/s27102925.jpg');
  color: #fff;
}

.slide2 {
  background: url('https://img3.doubanio.com/lpic/s6989253.jpg');
  color: #000;
}

.slide3 {
  background: url('https://img3.doubanio.com/lpic/s24468373.jpg');
  color: #fff;
}
.books-box{
  min-height:20vh;
}
.book-m{
  text-align:left;
}
.book-item{
  font-size:0;
  margin-top:15px;
}
.book-l{
  display:inline-block;
  width:20%;
  vertical-align:middle;
  box-sizing:border-box;
  padding:0 5px;
}
.book-l img{
  width:60%;
  margin:0 auto;
  box-sizing:border-box;
}
.book-m{
  font-size:14px;
  display:inline-block;
  width:80%;
  vertical-align:middle;
  box-sizing:border-box;
  padding:0 5px;
}
</style>
