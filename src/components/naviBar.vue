<!-- Navbar.vue -->
<template>
  <nav class="navbar">
    <div class="left-section">
      <div class="logo">DanDan Prime</div>
      <ul class="nav-links">
        <li><router-link to="/">主页</router-link></li>
      </ul>
    </div>
    <div class="right-section">
      <a href="https://github.com/DuckFeather10086/dandan-prime" target="_blank" class="icon-link">
        <font-awesome-icon :icon="['fab', 'github']" />
      </a>
      <router-link to="/settings" class="icon-link">
        <font-awesome-icon icon="cog" />
      </router-link>
    </div>
  </nav>
</template>
  
  <script>
export default {
  name: 'NaviBar'
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
}

.left-section {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
  color: rgb(220, 232, 253);
}

.nav-links {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.nav-links li {
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  display: block;
  line-height: 24px;
}

.right-section {
  display: flex;
  align-items: center;
}

.icon-link {
  color: white;
  font-size: 20px;
  margin-right: 15px;
  text-decoration: none;
}

.user-icon {
  font-size: 20px;
}
</style>
