<template>
  <div class="video-player-container">
    <div class="player-wrapper">
      <div ref="playerContainer" class="player-container">
        <div id="ass-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import { useRoute } from 'vue-router'
import Player from 'nplayer';
import Danmaku from '@nplayer/danmaku';

export default defineComponent({
  name: 'PlayerPage',
  data() {
    return {
      episodeId: null
    }
  },
  props: {
    paramEpisodeId: {

      required: true
    },
  },
  created() {
    this.initializePlayer()
  },
  methods:{
    initializePlayer() {
      this.episodeId = this.$route.params.episodeId
      console.log('Fetching season info for episode ID:', this.episodeId)
    },
    async fetchEpisodeInfo(){

    }
  },
  setup(props) {
    const playerContainer = ref(null);
    const subtitleContainer = ref(null);
    const videoSrc = ref('');
    const route  = useRoute()
    //const episodeId = ref(0)
    var subtitleSrc = "";
    let player = null;
    let renderer = null;

    const danmakuItems = [
      { text: "口技 ", time: 0 },
      { text: "傻袍子 ", time: 0, color: "#2196F3" },
      { text: "233真的是摔啊 ", time: 1, color: "#2196F3" },
      { text: "同时出土可以减少被吃的数量 ", time: 10, color: "#673AB7" }
    ];

    const initializeSubtitles = async (subtitleSrc) => {
      console.log('Initializing subtitles1', props.subtitleSrc);
      console.log('Initializing subtitles2',subtitleSrc);
      if (subtitleSrc) {
        try {
          const [ASS, response] = await Promise.all([
            import('assjs'),
            fetch(subtitleSrc)
          ]);
          
          const subtitleText = await response.text();
          console.log('Subtitle text:', subtitleText);
          const ass = new ASS.default(subtitleText, player.video);
          ass.show();

          player.on('timeupdate', () => {
            renderer.render(player.currentTime);
          });
        } catch (error) {
          console.error('Failed to load or parse subtitle:', error);
        }
      }
    };

    const fetchEpisodeInfo = async () => {
      try {
        const episodeId  = route.params.episodeId


        const response = await fetch(`http://10.0.0.232:1234/api/bangumi/episode/${episodeId}`);
        const data = await response.json();
        
        videoSrc.value = `http://10.0.0.232:1234/videos/${data.file_path}/${data.file_name}`;
        console.log('Fetching season info for subtitles:', data.subtitles)
        console.log('Fetching season info for subtitles:',  data.subtitles.length)
        if (data.subtitles && data.subtitles.length > 0) {
          subtitleSrc = `http://10.0.0.232:1234/subtitles/${data.file_path}/${data.subtitles[0]}`;
          console.log('Initializing subtitles114', subtitleSrc)
        }
      } catch (error) {
        console.error('Failed to fetch episode info:', error);
      }
    };

    onMounted(async () => {
      await fetchEpisodeInfo();

      const danmaku = new Danmaku({
        items: danmakuItems,
      });
      console.log(videoSrc.value)
      player = new Player({
        src: videoSrc.value,
        plugins: [danmaku],
      });

      player.mount(playerContainer.value);

      // Initialize subtitles after player is mounted
      await initializeSubtitles(subtitleSrc);

      document.addEventListener("fullscreenerror", (event) => {
        console.error("全屏错误可能是由于iframe没有全屏权限导致的");
        console.log(event);
      });
    });

    onBeforeUnmount(() => {
      if (renderer) {
        renderer.destroy();
      }
    });

    return {
      playerContainer,
      subtitleContainer,
      videoSrc,
      subtitleSrc
    };
  }
});
</script>


<style scoped>
.video-player-container {
  width: 100%;
  padding: 3px 3px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 10vh; 
  background-color: #1e1e1e;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2d2d2d;
}

.header nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

.header nav a.active {
  color: #ff69b4;
}

.right-controls {
  display: flex;
  align-items: center;
}

.right-controls > * {
  margin-left: 10px;
}

.player-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.player-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}

.subtitle-container {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  pointer-events: none;
  overflow: hidden;
  z-index: 9999; /* 确保字幕在最上层 */
}

/* 添加全屏时的样式 */
:fullscreen .subtitle-container {
  bottom: 40px; /* 在全屏模式下稍微增加底部距离 */
}

/* 兼容不同浏览器的全屏选择器 */
:-webkit-full-screen .subtitle-container {
  bottom: 40px;
}

:-moz-full-screen .subtitle-container {
  bottom: 40px;
}

:-ms-fullscreen .subtitle-container {
  bottom: 40px;
}

.player-controls {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #2d2d2d;
}

.progress-bar {
  flex-grow: 1;
  margin: 0 10px;
}

.bottom-info {
  padding: 10px;
  text-align: center;
  font-size: 0.9em;
  color: #888;
}
</style>