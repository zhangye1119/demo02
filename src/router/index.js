import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../components/Recommend/recommend.vue'
import Singer from '../components/Singer/singer.vue'
import Rank from '../components/Rank/rank.vue'
import Search from '../components/Search/search.vue'
import Disc from '../Disc/disc.vue'
import home from "../views/home.vue"
import SongsPlay from '../components/Songsplay/songsplay.vue'
import SingerDetails from '../components/singerDetails/singerDetails.vue'
// import { component } from 'vue/types/umd'

Vue.use(VueRouter)

// const routerPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
//   }

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/recommend',
    component: home,
    children: [
      {
        path: '/recommend',
        component: Recommend,
      },
      {
        path: '/singer',
        component: Singer
      },
      {
        path: '/rank',
        component: Rank
      },
      {
        path: '/search',
        component: Search
      },
    ]
  },
  {
    name: 'disc',
    path: '/disc/:id',

    component: Disc
  },
  {
    name:'songsplay',
    path:'/songsplay/:id/:name/:picUrl/:arname',
    component:SongsPlay
  },
  {
    name:'singerDetails',
    path:'/singerDetails/:id/:picUrl/:name',
    component:SingerDetails,
  },
  
]

const router = new VueRouter({
  routes
})
// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push (to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }

export default router
