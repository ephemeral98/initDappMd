# 开屏动画组件源码：

```vue

<!-- 欢迎页 -->
<script lang="ts" setup>
import { useAppStore } from '@store/appStore.js';
import $load from '@cps/GlobalLoading';
import { loadStore } from '@cps/GlobalLoading/useLoad';

const appStore = useAppStore();

/**
 * 点击了进入按钮,或者视频播放完
 */
function handleEnter() {
  // window.alert('end');
  appStore.setWelcoming(false);
}

let welcomeVideo = ref(null);

// 进来先loading，让开场视频先加载
$load({ isShow: true });
/**
 * 视频加载完成，取消loading
 */
function loadWelcome() {
  $load({ isShow: false });
}

const countTime = ref(0);
const overTimer = ref(null);
onMounted(() => {
  const id = setTimeout(() => {
    if (loadStore.loading) {
      appStore.setWelcoming(false);
    }
  }, 5000);

  // 8秒后还是加载不出来视频的话则直接进入
  overTimer.value = setInterval(() => {
    countTime.value++;

    if (countTime.value > 8) {
      appStore.setWelcoming(false);
      clearInterval(overTimer.value);
      $load({ isShow: false });
    }
  }, 1000);

  onBeforeUnmount(() => {
    clearTimeout(id);
    clearInterval(overTimer.value);
    $load({ isShow: false });
  });
});
</script>

<template>
  <!-- 首页欢迎动画视频 -->
  <div class="welcome-wrap">
    <video
      autoplay
      id="welcome-video"
      ref="welcomeVideo"
      muted
      @ended="handleEnter"
      @canplaythrough="loadWelcome"
      x5-video-player-fullscreen="true"
      x5-playsinline
      playsinline
      webkit-playsinline
    >
      <!-- <source src="@/assets/video/array-welcome.mp4" type="video/mp4" /> -->
      <source
        src="https://array-fi.oss-ap-southeast-1.aliyuncs.com/common/array-splinter.mp4"
        type="video/mp4"
      />
    </video>

    <!-- <button class="enter-btn" @click="handleEnter">Enter MOMOverse</button> -->
    <!-- <img src="@img/home/enter-btn.png" alt="" class="enter-btn" @click="handleEnter" /> -->
  </div>
</template>

<style lang="scss" scoped>
.welcome-wrap {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  @include flexPos(center);
}
#welcome-video {
  width: 100%;
  @include -height(30%, 50%, 100%);
  object-fit: cover;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.enter-btn {
  cursor: pointer;
  width: 2.74rem;
  height: 0.64rem;
  // background-color: darkblue;
  // font-size: 20px;
  color: #fff;
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
}

@media screen and (max-width: $phone) {
  .enter-btn {
    width: 200px;
    height: 60px;
    bottom: 2rem;
  }
}
</style>

```
