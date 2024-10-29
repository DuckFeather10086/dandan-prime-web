

import {createRouter, createWebHistory} from 'vue-router'

import MoviePosterWall from '../components/MoviePosterWall.vue'
import SeasonDetail from '../components/SeasonDetail.vue'
import Player from '../components/Player.vue'
import PlaySettings from '../components/PlayerSettings.vue'

const routes = [
  {
    path: '/',
    name: 'MoviePosterWall',
    component: MoviePosterWall
  },
  {
    path: '/play/:episodeId',
    name: 'Player',
    component: Player
  },
  {
    path: '/season/:animeId(\\d+)',
    name: 'SeasonDetail',
    component: SeasonDetail
  },
  {
    path: '/settings',
    name: 'PlaySettings',
    component: PlaySettings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router