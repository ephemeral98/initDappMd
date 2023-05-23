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

### 使用翻页

给某按钮加上这2个class

```vue
const swiperOptions = reactive({
  navigation: {
    prevEl: '.slide-prev', // 上一页
    nextEl: '.slide-next', // 下一页
  }
});

<bp-swiper :option="swiperOptions">
    <swiper-slide v-for="(nft, inx) in nftList" :key="inx">
      <div class="item-container"> {{ nft.id }} </div>
    </swiper-slide>
</bp-swiper>

<button class="slide-prev">上一页</button>
<button class="slide-next">下一页</button>
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

    .swiper-slide-active {
      z-index: 99;
      opacity: 1;

      .item-container {
        transform: scale(1.7);
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


### BpSwiper(源码)

[BpSwiper源码](./source.md)
