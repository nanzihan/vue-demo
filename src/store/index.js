import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		music:[
  		{id:2,soar_music:"飙升榜",route:"soar_music",alias:"飙升榜",img:"../../static/img/soar_music.jpg"},
  		{id:1,new_music:"新歌榜",route:"new_music",alias:"新歌榜",img:"../../static/img/new_music.jpg"},
  		{id:23,ktv_music:"ktv麦榜",route:"ktv_music",alias:"ktv麦榜",img:"../../static/img/ktv_music.jpg"},
  		{id:25,original_music:"原创榜",route:"original_music",alias:"原创榜",img:"../../static/img/original_music.jpg"},
  		{id:22,chinese_music:"华语金曲榜",route:"chinese_music",alias:"华语金曲榜",img:"../../static/img/chinese_music.jpg"}
		],
		musicListId:0
	},
	getters:{
		
	},
	mutations:{
		musicListId:function(state,id){
			state.musicListId = id
		}
	}
})
