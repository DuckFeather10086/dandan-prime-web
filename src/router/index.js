

import {createRouter, createWebHistory} from 'vue-router'

import MoviePosterWall from '../components/MoviePosterWall.vue'
import SeasonDetail from '../components/SeasonDetail.vue'

const routes = [
  {
    path: '/',
    name: 'MoviePosterWall',
    component: MoviePosterWall
  },
  {
    path: '/season/:animeId',
    name: 'SeasonDetail',
    component: SeasonDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router