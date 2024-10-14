<template>
  <div class="anime-homepage">

    <!-- 大型顶部横幅 -->
    <div class="featured-banner" v-if="lastWatched">
      <div class="banner-background" :style="{ backgroundImage: `url(${lastWatched.imageUrl})` }"></div>
      <div class="banner-content">
        <div class="poster-section">
          <h3 class="last-watched-title">上次看到</h3>
          <div class="poster">
            <img :src="lastWatched.posterUrl" :alt="lastWatched.anime_title">
          </div>
        </div>
        <div class="info">
          <h2>{{ lastWatched.anime_title }}</h2>
          <div class="buttons">
            <button class="play-btn"  @click="navigateToEpisodeInfo(lastWatched.episode_id)">▶ Play</button>
            <button class="info-btn"  @click="navigateToSeasonInfo(lastWatched.anime_id)">More Info</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 海报墙 -->
    <div class="anime-section">
      <div class="controls">
        <label class="switch">
          <input type="checkbox" v-model="showTitles">
          <span class="slider round"></span>
        </label>
        <span>{{'按照年份排序'}}</span>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜索动画标题" 
          class="search-input"
        >
      </div>
        <template v-if="showTitles">
          <div v-for="(animeList, year) in groupedAnimeList" :key="year">
            <h3>{{ year }}</h3>
              <div class="year-group">
                <div class="anime-grid">
                  <div v-for="anime in animeList" :key="anime.title" class="anime-item" @click="navigateToSeasonInfo(anime.id)">
                    <div class="image-container">
                      <img :src="anime.image_url" :alt="anime.title">
                    </div>
                    <div class="anime-info">
                      <h4>{{ anime.title }}</h4>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </template>
            <template v-else>
            <div v-if="filteredAnimeList.length === 0">
              <p>没有找到匹配的动画</p>
            </div>
            <div class="anime-grid">
              <div v-for="anime in filteredAnimeList" :key="anime.title" class="anime-item" @click="navigateToSeasonInfo(anime.id)">
                <div class="image-container">
                  <img :src="anime.image_url" :alt="anime.title">
                </div>
              </div>
          </div>
        </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from "@/router";

export default {
  name: 'AnimeHomePage',
  data() {
    return {
      showTitles: false,
      animeList: [],
      lastWatched: null,
      searchQuery: '' 
    }
  },
  mounted() {
    this.fetchAnime()
    this.fetchLastWatched()

  },
  computed: {
    filteredAnimeList() {
      if (!this.searchQuery) {
        return this.animeList;
      }
      console.log(this.animeList.filter(anime => 
        anime.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      ))
      return this.animeList.filter(anime => 
        anime.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    groupedAnimeList() {
      // 使用 filteredAnimeList 替代 this.animeList
      const grouped = this.filteredAnimeList.reduce((acc, anime) => {
        const year = anime.air_date.slice(0,4) || 'Unknown Year';
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(anime);
        return acc;
      }, {});

      // Sort animes within each year
      Object.keys(grouped).forEach(year => {
        grouped[year].sort((a, b) => {
          const titleA = String(a.title || '');
          const titleB = String(b.title || '');
          return titleA.localeCompare(titleB, 'zh-CN');
        });
      });

      console.log(grouped)

      // Sort years in descending order
      return Object.fromEntries(
          Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]))
        );
    }
  },
  methods: {
    fetchAnime() {
      const apiHost = process.env.VUE_APP_API_HOST;
      axios.get(apiHost+'/api/bangumi/list')
        .then(response => {
          this.animeList = response.data
        })
        .catch(error => {
          console.error('Error fetching anime:', error)
        })
    },
    fetchLastWatched() {
      const apiHost = process.env.VUE_APP_API_HOST;
      axios.get(apiHost+'/api/bangumi/last_watched')
        .then(response => {
          this.lastWatched = response.data
        })
        .catch(error => {
          console.error('Error fetching anime:', error)
        })

      this.lastWatched = {
        anime_title: "負けヒロインが多すぎる",
        imageUrl: "https://api.bgm.tv/v0/subjects/464376/image?type=large",
        posterUrl: "https://api.bgm.tv/v0/subjects/464376/image?type=large"
      }
    },
    navigateToSeasonInfo(animeId) {
      router.push(`/season/${animeId}`);
    },
    navigateToEpisodeInfo(episodeID) {
        router.push(`/play/${episodeID}`);
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.anime-homepage {
  background-color: #000;
  color: white;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  width: 100%;
}


.featured-banner {
  position: relative;
  height: 60vh;
  overflow: hidden;
}

.featured-banner {
  position: relative;
  height: 80vh; /* 稍微增加高度以获得更好的视觉效果 */
  overflow: hidden;
}

.featured-banner {
  position: relative;
  width: 100%;
  height: 500px; /* 减小高度 */
  overflow: hidden;
}

.featured-banner img {
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
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 100%);
}

.banner-content {
  position: absolute;
  bottom: 1%;
  left: 3%;
  z-index: 2;
  max-width: 50%;
}

.banner-content h2 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.banner-content p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #00ff00; /* 绿色，类似Prime Video的风格 */
}

.banner-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(5px); /* 添加毛玻璃效果 */
  transform: scale(1.1); /* 防止模糊边缘 */
}

.banner-content {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 20px;
  color: white;
  z-index: 1;
}

.poster-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
}

.last-watched-title {
  margin-bottom: 10px;
  font-size: 28px; /* 增加字体大小 */
  font-weight: bold;
}

.poster {
  flex-shrink: 0;
  width: 180px;
  height: 260px;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  flex-grow: 1;
}

h2 {
  margin-bottom: 15px;
  font-size: 24px;
}

.buttons {
  display: flex;
  gap: 15px;
  padding-top:75px; 
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.play-btn {
  background-color: #e50914;
  color: white;
}

.info-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.play-btn, .info-btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.play-btn {
  background-color: white;
  color: black;
}

.info-btn {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
}

.anime-section {
  padding: 20px;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 10px 0;
}

.year-group {
  margin-bottom: 30px;
}

.year-group h2 {
  
  margin-bottom: 15px;
  font-size: 1.5em;
  color: #333;
}


.anime-item {
  transition: transform 0.3s ease;
}

.anime-item:hover {
  transform: scale(1.05);
}

.image-container {
  width: 100%;
  padding-top: 150%; /* 2:3 aspect ratio */
  position: relative;
  overflow: hidden;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.anime-info {
  padding: 10px 0;
}

.anime-info h4 {
  margin: 0;
  font-size: 14px;
  text-align: center;
}

.controls {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap; /* 允许在小屏幕上换行 */
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin: 0 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}


/* 响应式设计 */
@media (max-width: 768px) {
  .anime-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .anime-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .featured-banner {
    height: 60vh;
  }
  
  .banner-content h2 {
    font-size: 2rem;
  }
  
  .banner-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .featured-banner {
    height: 50vh;
  }
  
  .banner-content h2 {
    font-size: 1.5rem;
  }
  
  .banner-content {
    max-width: 80%;
  }
}

.search-input {
  margin-left: 15px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-input {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
}
</style>
