<template>
  <div class="video-player-container">
      <div ref="playerContainer" class="player-container">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
          <div id="ass-container"  style="position: relative;"></div>
        </div>
      </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, ref, toRaw} from 'vue';
import Hls from 'hls.js'
import { useRoute } from 'vue-router'
import Player from 'nplayer';
import Danmaku from '@nplayer/danmaku';
import axios from 'axios';

export default defineComponent({
  name: 'PlayerPage',
  data() {
    return {
      episodeId: null,
      currentSegmentIndex: 0,
      currentLoadOffset:0
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
    let hls = null;
    let renderer = null;
   // const requestedFragments = new Map(); // Add this line to create a global map

    const danmakuItems = ref([]);

    const fetchDanmakuItems = async (episodeId) => {
      try {
        const apiHost = process.env.VUE_APP_API_HOST;
        const response = await fetch(apiHost+`/api/bangumi/danmaku/${episodeId}`);
        const data = await response.json();
        danmakuItems.value = data.danmakus;
        console.log('Fetched danmaku items:', data.danmakus);
      } catch (error) {
        console.error('Failed to fetch danmaku items:', error);
      }
    };

    const fetchEpisodeInfo = async () => {
      try {
        const episodeId = route.params.episodeId;

        // Fetch episode info
        const apiHost = process.env.VUE_APP_API_HOST;
        const response = await fetch(apiHost+`/api/bangumi/episode/${episodeId}`);
        const data = await response.json();
        
        videoSrc.value = apiHost+`/videos${data.file_path}/${data.file_name}`;
        console.log('Fetching season info for subtitles:', data.subtitles);
        console.log('Fetching season info for subtitles:', data.subtitles.length);
        if (data.subtitles && data.subtitles.length > 0) {
          subtitleSrc = apiHost+`/subtitles${data.file_path}/${data.subtitles[0]}`;
          console.log('Initializing subtitles114', subtitleSrc);
        }

        // Fetch danmaku items
        await fetchDanmakuItems(episodeId);
      } catch (error) {
        console.error('Failed to fetch episode info:', error);
      }
    };

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

    const initializeHls = async (hls) => {
      hls.attachMedia(player.video)

      hls.on(Hls.Events.MEDIA_ATTACHED, async function () {
        try {
          const apiHost = process.env.VUE_APP_API_HOST;
          const episodeID = route.params.episodeId
          const response = await axios.post(apiHost+'/api/playlist/'+episodeID);
          console.log('Playlist API response:', response.data);
          hls.loadSource('http://10.0.0.232:1234/stream/playlist.m3u8');
        } catch (error) {
          console.error('Error calling playlist API:', error);
        }
      })

      hls.on(Hls.Events.BUFFER_STALLED_ERROR, function () {
        console.warn('Buffer stalled. Requesting new segments...');
        const currentTime = player.video.currentTime;
        console.log(currentTime, currentTime + 30); // 请求接下来30秒的内容
        hls.recoverMediaError();
      }); 

      hls.on(Hls.Events.FRAG_LOADING, function (event, data) {
        console.log('Loading fragment:', data.frag.url);
        // 记录开始加载的时间
        data.frag.startLoadTime = performance.now();
      });

      hls.on(Hls.Events.FRAG_LOADED, function (event, data) {
        const loadTime = performance.now() - data.frag.startLoadTime;
        console.log('Loaded fragment:', data.frag.url);
        console.log('Loading time:', loadTime, 'ms');
        console.log('Fragment loaded:', data.frag.sn);
        this.currentSegmentIndex = data.frag.sn;
        //notifyServerForNextFragments(this.currentSegmentIndex)
      });


      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              if (data.response && data.response.code === 404) {
                //hls.startLoad()
                // //const currentTime = video.currentTime;
                // const nextFragmentStart = hls.streamController.nextLoadPosition;
                // //console.log('404_ERROR', "next fragment start: " + nextFragmentStart);
                hls.startLoad()

                //hls.stopLoad();
                // console.log("'404_ERROR'",data.frag.relurl)
                //notifyServerForNextFragments(hls, data.frag.relurl ,nextFragmentStart)
              }
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError()
              console.error('媒体错误:', data.details);
              break;
            default:
              console.error('未知错误:', data.details);
              break;
          }
        }
        console.log("error data:", data)
        if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
            const nextFragmentStart = hls.streamController.nextLoadPosition;
            console.log('404_ERROR', "next fragment start: " + nextFragmentStart);
        }
      });
    }

    onMounted(async () => {
      await fetchEpisodeInfo();
      const danmakuArr = toRaw(danmakuItems.value);
      console.log('Player mounted successfully1',danmakuArr);
      console.log('Player mounted successfully2',danmakuItems);


      const danmaku = new Danmaku({
        items: danmakuItems.value,
      });
      console.log(videoSrc.value)
      player = new Player({
        src: videoSrc.value,
        plugins: [danmaku],
      });

      player.mount(playerContainer.value);

      var config = {
        maxBufferLength: 30,          // 设置最大缓冲长度为30秒
        maxMaxBufferLength: 60,       // 设置绝对最大缓冲长度为60秒
        maxBufferSize: 60 * 1000000,  // 设置最大缓冲大小为60MB
        maxBufferHole: 0.5,           // 设置最大缓冲空洞为0.5秒
        highBufferWatchdogPeriod: 2,  // 设置高缓冲监控周期为2秒
        nudgeMaxRetry: 5,             // 设置最大尝试次数为5
      };
      hls = new Hls(config)

      // Initialize subtitles after player is mounted
      await initializeSubtitles(subtitleSrc);
      var useHls =true;

      if (useHls == true) {
        await initializeHls(hls);
      }

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
      subtitleSrc,
      danmakuItems
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
