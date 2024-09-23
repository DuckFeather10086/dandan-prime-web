<template>
  <div class="season-detail-page">
    <div class="hero-banner">
      <img :src="season.bannerImage" :alt="season.title" class="banner-image">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h1>{{ season.title }}</h1>
        <div class="season-select">
          <select v-model="selectedSeason" class="custom-select">
            <option v-for="n in season.totalSeasons" :key="n" :value="n">
              Season {{ n }}
            </option>
          </select>
        </div>
        <p class="description">{{ season.description }}</p>
        <div class="meta-info">
          <span class="rating">★ {{ season.rating }}</span>
          <span class="imdb">IMDb {{ season.imdbRating }}</span>
          <span class="year">{{ season.year }}</span>
          <span class="episodes">{{ season.episodes_length }} episodes</span>
          <span class="age-rating">{{ season.ageRating }}</span>
        </div>
        <div class="genres">
          <span v-for="genre in season.genres" :key="genre">{{ genre }}</span>
        </div>
        <div class="actions">
          <button class="play-btn">▶ Episode {{ season.nextEpisode }}</button>
        </div>
      </div>
    </div>
  
      <!-- 剧集列表 -->
      <div class="episode-list">
        <h2>Episodes</h2>
        <div v-for="episode in season.episodes" :key="episode.number" class="episode-item">
          <img :src="episode.thumbnail" :alt="episode.title" class="episode-thumbnail">
          <div class="episode-info">
            <h3>{{ `S${season.seasonNumber} E${episode.number} - ${episode.title}` }}</h3>
            <p class="episode-meta">
              {{ episode.airDate }} | {{ episode.duration }}
            </p>
            <p class="episode-description">{{ episode.description }}</p>
          </div>
          <div class="episode-actions">
            <button class="download-btn">⬇</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SeasonDetailPage',
    data() {
      return {
        selectedSeason: 1,
        season: {
          title: "ゆるキャン△",
          seasonNumber: 1,
          totalSeasons: 2,
          bannerImage: "https://ice.frostsky.com/2024/09/15/cd0a378df3fe3444e776e642f7d81cca.jpeg",
          description: "これは、ある冬の日の物語。静岡から山梨に引っ越してきた女子高校生・なでしこは、\"千円札の絵にもなっている富士山\"を見るために自転車を走らせて本栖湖まで行ったものの、あいにく天気はくもり空。富士山も望めず、疲れ果ててなでしこはその場で眠りこけてしまう。目覚めてみるとそこは夜。初めての場所で。寒さに震えるなでしこを救ったのは、1人キャンプ好きの女の子・リンだった。冷えた身体を温めるために焚き火にあたる2人。ぽっぽっと薪の爆ぜる音が、湖畔の静寂に沁み込んでいく。焚き...",
          rating: 4.5,
          imdbRating: 8.1,
          year: 2018,
          ageRating: "13+",
          genres: ["Anime", "International", "Animation", "Adventure"],
          nextEpisode: 2,
          episodes_length:13,
          episodes: [
            {
              number: 1,
              title: "ふじさんとカレーめん",
              thumbnail: "https://path-to-episode-thumbnail.jpg",
              airDate: "January 4, 2018",
              duration: "24min",
              description: "志摩リンは「一人キャンプ=ソロキャン」が趣味の女子高生。11月の寒空にもかかわらず、自転車を走らせて今日は本栖湖でソロキャン。冬のキャンプ場はリンの貸し切り状態だけど、なぜか外のベンチでずっと眺めこけている女の子が……。その子の名前は各務原なでしこ。山梨に引っ越したばかりで、\"千円札の絵にもなっている富士山\"を見に来たらしい。ひょんな出会いをきっかけに、二人は夜の本栖湖で一緒に過ごすことになり……。【日常/ほのぼの"
            },
            {
              number: 2,
              title: "ふじさんとカレーめん",
              thumbnail: "https://path-to-episode-thumbnail.jpg",
              airDate: "January 4, 2018",
              duration: "24min",
              description: "志摩リンは「一人キャンプ=ソロキャン」が趣味の女子高生。11月の寒空にもかかわらず、自転車を走らせて今日は本栖湖でソロキャン。冬のキャンプ場はリンの貸し切り状態だけど、なぜか外のベンチでずっと眺めこけている女の子が……。その子の名前は各務原なでしこ。山梨に引っ越したばかりで、\"千円札の絵にもなっている富士山\"を見に来たらしい。ひょんな出会いをきっかけに、二人は夜の本栖湖で一緒に過ごすことになり……。【日常/ほのぼの"
            },
            // ... more episodes ...
          ]
        }
      }
    },
    // Add any necessary methods here
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
  </style>