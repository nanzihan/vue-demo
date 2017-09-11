import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		music:[
  		{id:2,soar_music:"飙升榜",route:"soar_music",alias:"飙升榜",img:"http://ovy7f685z.bkt.clouddn.com/soar_music.jpg"},
  		{id:1,new_music:"新歌榜",route:"new_music",alias:"新歌榜",img:"http://ovy7f685z.bkt.clouddn.com/new_music.jpg"},
  		{id:23,ktv_music:"ktv麦榜",route:"ktv_music",alias:"ktv麦榜",img:"http://ovy7f685z.bkt.clouddn.com/ktv_music.jpg"},
  		{id:25,original_music:"原创榜",route:"original_music",alias:"原创榜",img:"http://ovy7f685z.bkt.clouddn.com/original_music.jpg"},
  		{id:22,chinese_music:"华语金曲榜",route:"chinese_music",alias:"华语金曲榜",img:"http://ovy7f685z.bkt.clouddn.com/chinese_music.jpg"}
		],
		musicListId:0,
		musicArr:[],//音乐列表
		currentSongId:0,
		pics:[],
		picIndex:0
	},
	getters:{
		
	},
	mutations:{
		musicListId:function(state,id){
			state.musicListId = id
		},
		musicList:function(state,list){
			state.musicArr = list
			console.log(list)
		},
		addPics:function(state,picArr){
			state.pics = state.pics.concat(picArr)
		}
	}
})
