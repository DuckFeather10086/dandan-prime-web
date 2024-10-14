<template>
  <div class="season-detail-page">
    <div class="hero-banner">
      <img :src="seasonData.image_url" :alt="seasonData.title" class="banner-image">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h1>{{ seasonData.title }}</h1>
        <p class="description">{{ seasonData.summary }}</p>
        <div class="meta-info">
          <span >★ {{ seasonData.rate_score }}</span>
          <span >{{ seasonData.air_date }}</span>
          <span >{{ seasonData.total_episodes }} episodes</span>
        </div>
      </div>
    </div>

    <!-- 剧集列表 -->
    <div class="episode-list">
      <h2>Episodes</h2>
      <div v-for="(episodeGroup, dandanplayEpisodeId) in seasonData.episodes" :key="dandanplayEpisodeId" class="episode-group">
        <h3>{{ episodeGroup[0].title }}</h3>
        <div class="episode-details">
          <img v-if="episodeGroup[0].thumbnail" :src="episodeGroup[0].thumbnail" :alt="episodeGroup[0].title" class="episode-thumbnail">
          <p class="episode-introduction">{{ episodeGroup[0].introduction || 'No description available' }}</p>
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
        seasonData: null
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
          const response = await axios.get(apiHost+`/api/bangumi/${animeId}/contents`)
          this.seasonData = response.data
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
  }
  
  .hero-banner {
    position: relative;
    height: 70vh;
    overflow: hidden;
  }
  
  .banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(15,23,30,1) 0%, rgba(15,23,30,0.7) 60%, rgba(15,23,30,0.3) 100%);
  }
  
  .banner-content {
    position: absolute;
    bottom: 50px;
    left: 50px;
    max-width: 60%;
  }
  
  .banner-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-align: left;
    width: 100%;
  }

  .episode-list {
    padding: 50px;
  }

  .episode-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 0.5rem;
    background-color: rgba(255,255,255,0.05);
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

  /* 响应式设计调整 */
  @media (max-width: 768px) {
    .banner-content h1 {
      font-size: 2rem;
    }

    .play-btn {
      width: 100%;
    }
  }
  </style>
