<template>
  <div class="season-detail-page">
    <div class="hero-banner">
      <img :src="seasonData.image_url" :alt="seasonData.title" class="banner-image">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h1>{{ seasonData.title }}</h1>
        <div class="season-select">
          <select v-model="selectedSeason" class="custom-select">
          </select>
        </div>
        <p class="description">{{ seasonData.summary }}</p>
        <div class="meta-info">
          <span class="rating">★ {{ seasonData.rate_score }}</span>
          <span class="year">{{ seasonData.air_date }}</span>
          <span class="episodes">{{ seasonData.total_episodes }} episodes</span>
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
    filter: blur(0px); /* 添加毛玻璃效果 */
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
  text-align: left; /* 确保标题左对齐 */
  width: 100%; /* 让标题占据全宽 */
  }

  .custom-select {
  appearance: none;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  padding: 8px 30px 8px 10px;
  font-size: 16px;
  cursor: pointer;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 12px auto;
}

.season-select {
  display: inline-block; /* 取消全宽，让 select 的宽度适应内容 */
  margin-bottom: 1rem; /* 保留底部间距 */
}

.custom-select:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 168, 225, 0.5);
}

.actions {
  margin-top: 20px;
}

.play-btn {
  padding: 12px 24px;
  font-size: 18px;
  background-color: #00a8e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.play-btn:hover {
  background-color: #0082b0;
}

/* 响应式设计调整 */
@media (max-width: 768px) {
  .banner-content h1 {
    font-size: 2rem;
  }

  .custom-select {
  /* ... existing styles ... */
  width: auto; /* Change from 100% to auto to fit content */
  min-width: 120px; /* Add a minimum width to ensure it's not too narrow */
}

  .play-btn {
    width: 100%;
  }
}
  
.season-select {
  margin-bottom: 1rem;
  width: 100%; /* This ensures the select takes up the full width of its container */
}

  
  .description {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .meta-info, .genres {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .actions {
    display: flex;
    gap: 1rem;
  }
  
  .play-btn, .more-options, .icon-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .play-btn {
    background-color: #00a8e1;
    color: white;
  }
  
  .more-options, .icon-btn {
    background-color: rgba(255,255,255,0.2);
    color: white;
  }
  
  .episode-list {
    padding: 50px;
  }
  
  .episode-item {
    display: flex;
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 2rem;
  }
  
  .episode-thumbnail {
    width: 300px;
    height: 169px; /* 16:9 aspect ratio */
    object-fit: cover;
    margin-right: 2rem;
  }
  
  .episode-info {
    flex-grow: 1;
  }
  
  .episode-actions {
    display: flex;
    align-items: center;
  }
  
  .download-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .banner-content {
  position: absolute;
  bottom: 50px;
  left: 50px;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* This ensures all child elements are left-aligned */
}
  
    .episode-item {
      flex-direction: column;
    }
  
    .episode-thumbnail {
      width: 100%;
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }

.episode-group {
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 1rem;
}

.episode-details {
  display: flex;
  margin-bottom: 1rem;
}

.episode-thumbnail {
  width: 200px;
  height: auto;
  margin-right: 1rem;
  object-fit: cover;
}

.episode-introduction {
  flex: 1;
  font-size: 0.9rem;
  color: #ddd;
}

.episode-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.5rem;
  background-color: rgba(255,255,255,0.05);
  border-radius: 5px;
  margin-bottom: 0.3rem;
  height: 2rem; /* Adjust this value to match your title height */
}

.episode-filename {
  flex: 1;
  font-size: 1rem;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 1rem;
  line-height: 1.2rem; /* Adjust line height for vertical centering */
}

.play-btn {
  background-color: transparent;
  color: #00a8e1;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  transition: color 0.3s;
  line-height: 1; /* Ensure the icon is vertically centered */
}

.play-btn:hover {
  color: #0082b0;
}
  </style>