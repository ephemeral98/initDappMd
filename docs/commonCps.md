# 通用组件:

## 1. BpButton
#### 主要作用
1. 主要是显示没有连接对的链的话，就显示连接文案.
2. 置灰显示

使用按钮的时候，与链上有交易的请求，统一使用全局组件```BpButton```，需要有加载状态```loading```。一些普通的操作DOM按钮可以不使用该组件。

```vue
const [handleClick, loadClick] = useWrite(async () => {
  await lpObj.claimAllReward();
});

<bp-button v-loading="loadClick" @click="handleClick" class="click-box">bp写操作</bp-button>
```
#### 置灰：
```vue
const isDisable = ref(false); // 是否置灰按钮
<BpButton class="blue-btn" @click="func" :disable="isDisable">点击</BpButton>
```

## 2. BpSwiper

### 描述：

> 该组件是对swiper@8.3.2的二次封装，集合了一些基本的配置

### 使用方法：

```vue
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

3D空间感轮播效果：

```js
// 属性加上这个
slidesPerView: 3, //设置slider容器能够同时显示的slides数量(carousel模式)。另外，支持'auto'值，会根据容器container的宽度调整slides数目。
```

```scss
  // swiper 穿透
  :deep(.swiper-container) {
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

主动跳转到指定块：

```js
const bpSwiper = ref(null);
<button @click="handleClick">click</button>
function handleClick() {
  bpSwiper.value.handleSlide(2); // 跳转到第二块
}

<bp-swiper :option="swiperOptions" ref="bpSwiper">
```

被动触发change事件

```vue
<bp-swiper :option="swiperOptions" @slideChange="handleChange">
```

真实索引改变时候被动触发
```
@realIndexChange
```

#### 一些常见的样式可以使用官网推的Demo：https://swiperjs.com/demos


## 3. GlobalLoading
#### 描述
全局转圈圈

```js
import $load from '@cps/GlobalLoading/index';

// 显示
$load({isShow: true});

// 隐藏
$load({isShow: false});
```
