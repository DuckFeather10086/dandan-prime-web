<template>
  <div class="anime-homepage">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">Anime Video</div>
      <div class="nav-links">
        <a href="#">Home</a>
        <a href="#">Movies</a>
        <a href="#">TV Shows</a>
        <a href="#">My List</a>
      </div>
      <div class="user-menu">
        <span class="user-icon">👤</span>
      </div>
    </nav>

    <!-- 大型顶部横幅 -->
    <div class="featured-banner" v-if="lastWatched">
      <img :src="lastWatched.imageUrl" :alt="lastWatched.animeTitle">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h2>{{ lastWatched.animeTitle }}</h2>
        <button class="play-btn">▶ Play S2 E1</button>
        <button class="info-btn">ℹ More Info</button>
      </div>
    </div>

    <!-- 海报墙 -->
    <div class="anime-section">
      <h3>Continue Watching</h3>
      <div class="anime-grid">
        <div v-for="anime in animeList" :key="anime.animeTitle" class="anime-item">
          <div class="image-container">
            <img :src="anime.imageUrl" :alt="anime.animeTitle">
          </div>
          <div class="anime-info">
            <h4>{{ anime.animeTitle }}</h4>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AnimeHomePage',
  data() {
    return {
      animeList: [],
      lastWatched: null
    }
  },
  mounted() {
    this.fetchAnime()
    this.fetchLastWatched()
  },
  methods: {
    fetchAnime() {
      axios.get('http://127.0.0.1:8080/api/anime')
        .then(response => {
          this.animeList = response.data
        })
        .catch(error => {
          console.error('Error fetching anime:', error)
        })
    },
    fetchLastWatched() {
      // 这里应该是一个单独的API调用来获取最后观看的内容
      // 暂时使用模拟数据
      this.lastWatched = {
        animeTitle: "負けヒロインが多すぎる",
        imageUrl: "https://ice.frostsky.com/2024/09/15/b70b6cbd71db737186350d4391b65ea9.png"
      }
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

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

.user-icon {
  font-size: 20px;
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
  bottom: 10%;
  left: 5%;
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
</style>