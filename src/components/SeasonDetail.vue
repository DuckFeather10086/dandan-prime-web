<template>
  <div class="season-detail-page">
    <div class="hero-banner" v-if="seasonData">
      <img :src="seasonData.image_url" :alt="seasonData.title" class="banner-image">
      <div class="banner-content">
        <h1>{{ seasonData.title }}</h1>
        <p class="description">{{ seasonData.summary }}</p>
        <div class="meta-info">
          <div class="meta-info-container">
            <span>上次看到: 第 {{ lastWatchedEpisode.episode_no }} 集 {{ lastWatchedEpisode.title }}</span>
            <span>⭐{{ seasonData.rate_score }} </span>
            <span>{{ seasonData.air_date }} </span>
            <span>{{ seasonData.total_episodes }} episodes </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p> <!-- 添加加载提示 -->
    </div>
    <!-- 剧集列表 -->
    <div class="episode-list" v-if="seasonData">
      <h2>Episodes</h2>
      <div v-for="(episodeGroup, dandanplayEpisodeId) in seasonData.episodes" :key="dandanplayEpisodeId"
        class="episode-group">
        <h3>{{ episodeGroup[0].title }}</h3>
        <div class="episode-details">
          <img v-if="episodeGroup[0].thumbnail" :src="episodeGroup[0].thumbnail" :alt="episodeGroup[0].title"
            class="episode-thumbnail">
          <!-- <p class="episode-introduction">{{ episodeGroup[0].introduction || 'No description available' }}</p> -->
        </div>
        <div v-for="episode in episodeGroup" :key="episode.id" class="episode-item">
          <p class="episode-filename">{{ episode.file_name }}</p>
          <button class="play-btn" @click="navigateToEpisodeInfo(episode.id)">▶</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from "@/router";

export default {
  name: 'SeasonDetailPage',
  data() {
    return {
      seasonData: null,
      lastWatchedEpisode: null
    }
  },
  created() {
    this.fetchSeasonInfo()
  },
  methods: {
    async fetchSeasonInfo() {
      const animeId = this.$route.params.animeId
      console.log('Fetching season info for anime ID:', animeId)
      try {
        const apiHost = process.env.VUE_APP_API_HOST;
        const response_anime = await axios.get(apiHost + `/api/bangumi/${animeId}/contents`)
        this.seasonData = response_anime.data

        const response_episode = await axios.get(apiHost + `/api/bangumi/episode/${this.seasonData.last_watched_episode_id}`)
        this.lastWatchedEpisode = response_episode.data
      } catch (error) {
        console.error('Error fetching season info:', error)
      }
    },
    navigateToEpisodeInfo(episodeID) {
      router.push(`/play/${episodeID}`);
    }
  }
}
</script>

<style scoped>
.season-detail-page {
  background-color: #0f171e;
  color: #fff;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero-banner {
  position: relative;
  height: 60vh;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 删除未使用的 .banner-overlay 类 */

.banner-content {
  position: absolute;
  top: 10px;
  bottom: 20px;
  left: 50px;
  max-width: 60%;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}

.banner-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: left;
  width: 100%;
}

.episode-list {
  padding: 50px;
  flex: 1;
}

.episode-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  margin-bottom: 0.3rem;
  height: 2rem;
}

.episode-filename {
  flex: 1;
  font-size: 1rem;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 1rem;
  line-height: 1.2rem;
}

.play-btn {
  background-color: transparent;
  color: #00a8e1;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  transition: color 0.3s;
  line-height: 1;
}

.play-btn:hover {
  color: #0082b0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-banner {
    height: 40vh;
  }

  .banner-content {
    bottom: 20px;
    left: 20px;
    max-width: 80%;
    padding: 5px;
  }

  .banner-content h1 {
    font-size: 1.5rem;
  }

  .play-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-banner {
    height: 100vh;
  }

  /* 删除未使用的 .banner-content h2 类 */

  .banner-content {
    bottom: 20px;
    left: 20px;
    max-width: 80%;
    max-height: 120%;
    padding: 5px;
  }
}

.meta-info-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

</style>