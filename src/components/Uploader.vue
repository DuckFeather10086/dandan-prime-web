<template>
  <div class="movie-wall">
    <div class="header">
      <h1>Movies</h1>
      <nav>
        <a href="#" class="active">Movies</a>
        <a href="#">Suggestions</a>
        <a href="#">Trailers</a>
        <a href="#">Favorites</a>
        <a href="#">Collections</a>
        <a href="#">Genres</a>
      </nav>
      <div class="icons">
        <span>≡</span>
        <span>AZ</span>
        <span>#</span>
      </div>
    </div>
    <div class="movie-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <img :src="movie.posterUrl" :alt="movie.title">
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.year }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [
        { id: 1, title: 'Night of the Living Dead', year: 1968, posterUrl: 'path_to_poster_1.jpg' },
        { id: 2, title: 'Caminandes: Llamigos', year: 2016, posterUrl: 'path_to_poster_2.jpg' },
        { id: 3, title: 'The Great Train Robbery', year: 1903, posterUrl: 'path_to_poster_3.jpg' },
        { id: 4, title: 'Caminandes: Gran Dillama', year: 2013, posterUrl: 'path_to_poster_4.jpg' },
        { id: 5, title: 'Caminandes: Llama Drama', year: 2013, posterUrl: 'path_to_poster_5.jpg' },
        { id: 6, title: 'Jungle Book', year: 1942, posterUrl: 'path_to_poster_6.jpg' },
        { id: 7, title: 'The Boy in the Plastic Bubble', year: 1976, posterUrl: 'path_to_poster_7.jpg' },
        { id: 8, title: 'Lady Frankenstein', year: 1971, posterUrl: 'path_to_poster_8.jpg' },
        { id: 9, title: 'Battle of the Stars', year: 1978, posterUrl: 'path_to_poster_9.jpg' },
      ]
    }
  }
}
</script>

<style scoped>
.movie-wall {
  background-color: #1a1a1a;
  color: white;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

nav a {
  color: #888;
  text-decoration: none;
  margin-right: 15px;
}

nav a.active {
  color: white;
}

.icons span {
  margin-left: 10px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
}

.movie-item img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.movie-info {
  margin-top: 5px;
}

.movie-info h3 {
  font-size: 14px;
  margin: 0;
}

.movie-info p {
  font-size: 12px;
  color: #888;
  margin: 5px 0 0;
}
</style>