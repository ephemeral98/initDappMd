# 纵向选项卡源码：

```vue

<script setup lang="ts">
export interface ITab {
  id: number;
  text: string; // 标签文案
  active: boolean; // 是否激活中
}
const props = defineProps<{
  tabs: ITab[]; // 选项内容
  fontSize?: string; // 字体大小
  color?: string; // 字体颜色
  activeColor?: string; // 激活中的字体颜色
  bg?: string; // 背景颜色
  gap?: string; // 间距
  capsule?: boolean; // 是否为胶囊状
  pos?: 'left' | 'center' | 'right'; // 居左、中、右
}>();

const emits = defineEmits<{
  (pickTab: 'pickTab', item: ITab, newTabs: ITab[]): MouseEvent;
}>();

const tabWrap = ref<HTMLElement>(null);
const barLeft = ref<number>(0); // 滑块距离
const barWidth = ref<number>(0); // 滑块宽度

const doPickTab = (item, e) => {
  const newTabs = props.tabs.map((t, i) => {
    t.active = t.id === item.id;
    return t;
  });
  emits('pickTab', item, newTabs);

  nextTick(() => {
    barLeft.value = e.target.offsetLeft;
    barWidth.value = e.target.offsetWidth;
  });
};

watch(
  () => props.tabs,
  (val) => {
    console.log('新tab...', val);
    // barLeft.value = e.target.offsetLeft;
    // barWidth.value = e.target.offsetWidth;
  },
  { deep: true, immediate: true }
);

nextTick(() => {
  // 获取首个元素的宽度，初始化滑块
  // const firstDom = tabWrap.value.querySelector('.tabs-item');
  const firstDom: any = tabWrap.value.getElementsByClassName('tab-item')[0];
  const offsetLeft = firstDom.offsetLeft;

  const w = +getComputedStyle(firstDom).width.replace('px', '');
  barWidth.value = w;
  barLeft.value = offsetLeft;
});

// 激活中的颜色
const activeColor = computed(() => props.activeColor ?? '#fff');
</script>

<template>
  <div :class="['tabs-wrap', props.pos]" ref="tabWrap">
    <div
      :class="['tab-item', { active: t.active }]"
      :style="{
        fontSize: props.fontSize ?? '0.14rem',
        color: props.color ?? '#fff',
        marginTop: props.gap,
      }"
      v-for="t in props.tabs"
      :key="t.id"
      @click="doPickTab(t, $event)"
    >
      {{ $t(t.text) }}

      <div class="bar colorful-btn" :style="{ width: t.active ? barWidth + 'px' : '0' }"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 2rem;
  position: relative;
  flex-direction: column;
  border-radius: 0;
  div {
    border-radius: 0;
  }

  &.left {
    justify-content: flex-start;
  }
  &.right {
    justify-content: flex-end;
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
    padding-bottom: 0.06rem;

    .bar {
      width: 0;
      height: 0.03rem;
      position: absolute;
      left: 0;
      bottom: 0;
      transition: all 1s;
      border-radius: 100px;
    }

    &:first-child {
      margin-top: 0 !important;
    }

    &.active {
      color: v-bind(activeColor) !important;

      .bar {
      }
    }
  }
}
</style>

```
