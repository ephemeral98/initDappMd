## Swiper

> 该组件是对swiper@8.3.2的二次封装，集合了一些基本的配置

### 使用方法
```jsx
const nftList = reactive([
  {
    id: 1,
    img: require('@img/holder.png'),
  },
  {
    id: 2,
    img: require('@img/holder.png'),
  },
  {
    id: 3,
    img: require('@img/holder.png'),
  },
]);


 <bp-swiper>
    <swiper-slide v-for="(nft, inx) in nftList" :key="inx">
      <div class="item-container"> {{ nft.id }} </div>
    </swiper-slide>
  </bp-swiper>
```

### 使用 pagination:

```vue
const swiperOptions = reactive({
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // 开启分页器
  },
});


<bp-swiper :option="swiperOptions">
    <swiper-slide v-for="(nft, inx) in nftList" :key="inx">
      <div class="item-container"> {{ nft.id }} </div>
    </swiper-slide>
</bp-swiper>

<!-- className为这个即可 -->
<div class="swiper-pagination mt-0.2rem !bottom-0 !relative"></div>
```

### 3D空间感轮播效果：

```ts
// 属性加上这个
slidesPerView: 3, //设置slider容器能够同时显示的slides数量(carousel模式)。另外，支持'auto'值，会根据容器container的宽度调整slides数目。
```

```scss
  // swiper 穿透
  :deep(.swiper) {
    position: relative;
    @include -width-a(650);
    margin: 0.8rem auto;
    // min-height: 6.05rem;
    // background: yellow;

    .swiper-wrapper {
      align-items: center;
    }

    .swiper-slide {
      text-align: center;
      @include flexPos(center);
      opacity: 0.5;
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      opacity: 1;

      .item-container {
        transform: scale(1.7);
        z-index: 99;
      }
    }

    .item-container {
      transition: 0.8s;
      @include flexPos(center);
      flex-direction: column;
      @include -height-a(405);

      .item-img {
        cursor: pointer;
        @include -width-a(195);
        border-radius: 0.1rem;
      }
    }
  }
```

### 主动跳转到指定块：

```tsx
const bpSwiper = ref(null);
<button @click="handleClick">click</button>
function handleClick() {
  bpSwiper.value.handleSlide(2); // 跳转到第二块
}

<bp-swiper :option="swiperOptions" ref="bpSwiper">
```

### 被动触发change事件

```vue
<bp-swiper :option="swiperOptions" @slideChange="handleChange" />
```

### 真实索引改变时候被动触发

```
@realIndexChange
```

一些常见的样式可以使用官网推的Demo：https://swiperjs.com/demos


### 源码

#### src/components/BpSwiper/BpSwiperComp.vue

```vue
<script setup lang="ts">
import { Swiper, useSwiper } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 安装的模块【下面小点，左右箭头】
const modules = [Pagination, Navigation];

const props = defineProps<{
  option; // 混入swiper选项
}>();

const swiperOptions: any = computed(() => {
  return {
    autoplay: {
      delay: 3000, // 自动轮播间隔时间
      disableOnInteraction: false,
      pauseOnMouseEnter: false, // 鼠标移入暂停
      reverseDirection: false, // 往返跑
    },
    loop: true,
    speed: 500, //切换过渡速度
    mousewheel: true, // 鼠标滚轮
    slidesPerView: 'auto', //设置slider容器能够同时显示的slides数量(carousel模式)。另外，支持'auto'值，会根据容器container的宽度调整slides数目。
    centeredSlides: true, //设置slide居中
    spaceBetween: 20, // 每个item的间距，也可以用scss穿透实现
    coverflowEffect: {
      rotate: 0, //slide做3d旋转时Y轴的旋转角度。默认50。
      stretch: -10, //每个slide之间的拉伸值（距离），越大slide靠得越紧。 默认0。
      depth: 100, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
      modifier: 1, //depth和rotate和stretch的倍率，相当于 depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
      slideShadows: false, //开启slide阴影。默认 true。
    },
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
    observeSlideChildren: true,
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
    initialSlide: 0,

    ...props.option,
  };
});

/**
 * 主动跳转到指定页
 */
function handleSlide(page: number) {
  swiperObj.value.slideTo(page);
}

const swiperObj = ref(null);
defineExpose({
  handleSlide,
});
</script>

<template>
  <swiper
    :modules="modules"
    :loop="swiperOptions.loop"
    :autoplay="swiperOptions.autoplay"
    @swiper="(Swiper) => (swiperObj = Swiper)"
    :navigation="swiperOptions.navigation"
    :speed="swiperOptions.speed"
    :spaceBetween="swiperOptions.spaceBetween"
    :coverflowEffect="swiperOptions.coverflowEffect"
    :centeredSlides="swiperOptions.centeredSlides"
    :slidesPerView="swiperOptions.slidesPerView"
    :mousewheel="swiperOptions.mousewheel"
    :observer="swiperOptions.observer"
    :observeParents="swiperOptions.observeParents"
    :observeSlideChildren="swiperOptions.observeSlideChildren"
    :centerInsufficientSlides="swiperOptions.centerInsufficientSlides"
    :pagination="swiperOptions.pagination"
    :initialSlide="swiperOptions.initialSlide"
  >
    <slot></slot>
  </swiper>
</template>

<style lang="scss" scoped></style>

```

#### src/components/BpSwiper/index.ts

```ts
import BpSwiperVue from './BpSwiperComp.vue';
import { SwiperSlide } from 'swiper/vue';
import { App } from 'vue';

const BpSwiper = {
  install(app: App) {
    app.component('BpSwiper', BpSwiperVue);
    app.component('SwiperSlide', SwiperSlide);
  },
};

export default BpSwiper;

```

#### main.ts

```ts
import BpSwiper from '@cps/BpSwiper';

vueApp
  .use(BpSwiper)
```

全局声明该组件，这样，就可以全局使用了
