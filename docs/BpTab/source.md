# 横向选项卡源码：

```ts
// type.d.ts

interface ITab {
  id: number;
  text: string; // 标签文案
  active: boolean; // 是否激活中
  disable?: boolean; // 是否禁止操作
}
```


```vue
<script setup lang="ts">
const props = defineProps<{
  tabs: ITab[]; // 选项内容
  fontSize?: string; // 字体大小
  color?: string; // 字体颜色
  activeColor?: string; // 激活中的字体颜色
  squareColor?: string; // 滑块颜色
  type?: 'wall'; // 模式 wall:加左右border
  gapWall?: boolean; // 中间是否有墙(border)
  gap?: string; // 间距
  capsule?: boolean; // 是否为胶囊状
  eqDivi?: boolean; // 每一块宽度均分
  pos?: 'left' | 'center' | 'right'; // 居左、中、右
  squarePadding?: number; // 滑块的内边距
}>();

const emits = defineEmits<{
  (pickTab: 'pickTab', item: ITab, newTabs: ITab[]): MouseEvent;
}>();

const tabWrap = ref<HTMLElement>(null);
const barLeft = ref<number>(0); // 滑块距离
const barWidth = ref<number>(0); // 滑块宽度

const doPickTab = (item, e) => {
  if (item.disable) return;

  const newTabs = props.tabs.map((t, i) => {
    t.active = t.id === item.id;
    return t;
  });
  emits('pickTab', item, newTabs);
};

const firstDom = ref(null);
/**
 * 初始化滑块尺寸（有时候元素是隐藏的，导致无法计算出尺寸，可以手动执行该函数获取）
 */
const initFirstDOM = () => {
  const activeInx = props.tabs.findIndex((item) => item.active) || 0;
  // 获取首个元素的宽度，初始化滑块
  // const firstDom = tabWrap.value.querySelector('.tabs-item');
  firstDom.value = tabWrap.value.getElementsByClassName('tab-item')[activeInx];
  const offsetLeft = firstDom.value.offsetLeft;
  const w = +getComputedStyle(firstDom.value).width.replace('px', '');
  barWidth.value = w;
  barLeft.value = offsetLeft;
};
nextTick(() => {
  initFirstDOM();
});

defineExpose({
  initFirstDOM,
});

// 激活中的颜色
const activeColor = computed(() => props.activeColor ?? '#fff');

const squarePadding = computed(() => {
  if (props.squarePadding) {
    return {
      w: props.squarePadding,
      l: -props.squarePadding / 2,
    };
  }
  return {
    w: 0,
    l: 0,
  };
});

// 监听标签active状态，实时切换
watch(props.tabs, (val) => {
  const activeItemInx = val.findIndex((item) => item.active);
  firstDom.value = tabWrap.value.getElementsByClassName('tab-item')[activeItemInx];
  barLeft.value = firstDom.value?.offsetLeft;
  barWidth.value = firstDom.value?.offsetWidth;
});
</script>

<template>
  <div :class="['tabs-wrap', props.pos]" ref="tabWrap">
    <div
      :class="['tab-item', { active: t.active, gapWall: props.gapWall, 'eq-divi': props.eqDivi }]"
      :style="{
        fontSize: props.fontSize ?? '0.14rem',
        marginLeft: props.gap ?? '1.1rem',
        color: props.color ?? '#fff',
      }"
      v-for="t in props.tabs"
      :key="t.id"
      @click="doPickTab(t, $event)"
    >
      {{ $t(t.text) }}
    </div>

    <!-- 胶囊状 -->
    <div
      v-if="props.capsule"
      className="cap-bar bar top-0 h-full"
      :style="{
        left: barLeft + squarePadding.l + 'px',
        width: barWidth + squarePadding.w + 'px',
        background: props.squareColor || 'linear-gradient(45deg, #e942b4 0%, #1e46d4 100%)',
      }"
    ></div>

    <!-- 线条状 -->
    <div
      v-else
      className="slide-bar bar bottom-0 h-0.02rem"
      :style="{
        left: barLeft + 'px',
        width: barWidth + 'px',
        background: props.squareColor || 'linear-gradient(45deg, #e942b4 0%, #1e46d4 100%)',
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.tabs-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;

  &.left {
    justify-content: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }

  > .bar {
    position: absolute;
    left: 0;
    transition: all 0.8s;
    z-index: 1;

    &.slide-bar {
    }
  }

  .tab-item {
    text-align: center;
    cursor: pointer;
    z-index: 2;
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.2rem;
    margin-bottom: 0.06rem;

    &:first-child {
      margin-left: 0 !important;
    }

    &.gapWall:not(:last-child) {
      border-right: solid 1px #949eab;
    }

    &.eq-divi {
      flex: 1;
    }

    &.active {
      color: v-bind(activeColor) !important;
    }
  }
}
</style>

```
