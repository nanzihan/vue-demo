import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/movie',
      children:[
      	{
      		path:'movie',
      		component:require('@/components/Movie')
      	},
      	{
      		path:'music',
      		component:require('@/components/Music')
      	},
      	{
      		path:'book',
      		component:require('@/components/Book')
      	},
      	{
      		path:'picture',
      		component:require('@/components/Picture')
      	}
      ]
    },
    {
      path: '/movie/detail/:id',
      name:"movieDetail",
      component:require('@/components/MovieDetail')
    },
    {
      path: '/music/:id',
      name:"musicList",
      component:require('@/components/MusicList')
    },
    {
      path: '/music/:song_id',
      name:"musicDetail",
      component:require('@/components/MusicDetail')
    },
    {
      path: '/picture/:id',
      name:"pictureDetail",
      component:require('@/components/PictureDetail')
    }
  ]
})
