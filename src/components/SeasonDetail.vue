<template>
  <div class="season-detail-page">
    <div class="hero-banner" v-if="seasonData">
      <img :src="seasonData.image_url" :alt="seasonData.title" class="banner-image">
      <div class="banner-content">
        <h1>{{ seasonData.title }}</h1>
        <p class="description">{{ seasonData.summary }}</p>
        <div class="meta-info">
          <div class="meta-info-container">
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
      <div v-for="(episodeGroup, dandanplayEpisodeId) in seasonData.episodes" :key="dandanplayEpisodeId" class="episode-group">
        <h3>{{ episodeGroup[0].title }}</h3>
        <div class="episode-details">
          <img v-if="episodeGroup[0].thumbnail" :src="episodeGroup[0].thumbnail" :alt="episodeGroup[0].title" class="episode-thumbnail">
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
    min-height: 100vh; /* 添加这行 */
    display: flex; /* 添加这行 */
    flex-direction: column; /* 添加这行 */
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
    top:10px;
    bottom: 20px;
    left: 50px;
    max-width: 60%;
    background: rgba(0, 0, 0, 0.5); /* 添加半透明背景 */
    padding: 10px; /* 添加内边距 */
    border-radius: 5px; /* 添加圆角 */
  }
  
  .banner-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-align: left;
    width: 100%;
  }

  .episode-list {
    padding: 50px;
    flex: 1; /* 添加这行 */
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

  /* 响应式设计调 */
  @media (max-width: 768px) {
    .hero-banner {
      height: 40vh; /* 在小屏幕上调整高度 */
    }

    .banner-content {
      bottom: 20px; /* 在小屏幕上调整内容位置 */
      left: 20px; /* 在小屏幕上调整内容位置 */
      max-width: 80%; /* 在小屏幕上调整最大宽度 */
      padding: 5px; /* 在小屏幕上调整内边距 */
    }

    .banner-content h1 {
      font-size: 1.5rem; /* 在小屏幕上调整标题大小 */
    }

    .play-btn {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .hero-banner {
      height: 100vh;
    }
    
    .banner-content h2 {
      font-size: 1.5rem;
    }
    
    .banner-content {
      bottom: 20px; /* 在小屏幕上调整内容位置 */
      left: 20px; /* 在小屏幕上调整内容位置 */
      max-width: 80%; /* 在小屏幕上调整最大宽度 */
      max-height: 120%; /* 在小屏幕上调整最大宽度 */
      padding: 5px; /* 在小屏幕上调整内边距 */
    }
  }


  .meta-info-container {
    display: flex;
    flex-wrap: wrap; /* 启用换行 */
    gap: 10px; /* 添加间距 */
    align-items: center; /* 垂直居中对齐 */
  }
  </style>