<template>
  <div>
    <div ref="playerContainer"></div>
    <div ref="subtitleContainer" class="subtitle-container"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import Player from 'nplayer';
import Danmaku from '@nplayer/danmaku';

export default defineComponent({
  name: 'NPlayerComponent',
  props: {
    src: {
      type: String,
      required: true
    },
    subtitleSrc: {
      type: String,
      default: '/subtitles/yurucamp_06.ass'
    }
  },
  setup(props) {
    const playerContainer = ref(null);
    const subtitleContainer = ref(null);
    let player = null;
    let renderer = null;

    const danmakuItems = [
      { text: "口技 ", time: 0 },
      { text: "傻袍子 ", time: 0, color: "#2196F3" },
      { text: "233真的是摔啊 ", time: 1, color: "#2196F3" },
      { text: "同时出土可以减少被吃的数量 ", time: 10, color: "#673AB7" }
    ];

    const initializeSubtitles = async () => {
      if (props.subtitleSrc) {
        try {
          const [ASS, response] = await Promise.all([
            import('assjs'),
            fetch(props.subtitleSrc)
          ]);
          
          const subtitleText = await response.text();
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

    onMounted(async () => {
      const danmaku = new Danmaku({
        items: danmakuItems,
      });

      player = new Player({
        src: props.src,
        plugins: [danmaku],
      });

      player.mount(playerContainer.value);

      // Initialize subtitles after player is mounted
      await initializeSubtitles();

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
      subtitleContainer
    };
  }
});
</script>

<style scoped>
.subtitle-container {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  pointer-events: none;
  overflow: hidden;
}
</style>