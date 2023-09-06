## 距离开始与距离结束倒计时 (组件) (源码)

```vue
<script setup lang="ts">
import { getCountDown, useUpdate } from './useCountdown';

const props = defineProps<{
  startTime: number; // 开始时间(毫秒)
  endTime: number; // 结束时间(毫秒)
}>()


// 当前时间
const currentTime = ref(Date.now());

// 开始时间
const countStartTime = ref(null);

// 结束时间
const countdownTime = ref(null);

// 是否还没有开始
const isNotStart = computed(() => currentTime.value > props.startTime);

// 是否 已经开始 并且 还没有结束
const isCountingDown = computed(() => currentTime.value >= props.startTime && props.endTime > currentTime.value);

// 是否已经结束
const isExpired = computed(() => props.endTime - currentTime.value <= 0);

/**
 * 更新倒计时
 */
const { cancel } = useUpdate(() => {
  currentTime.value = Date.now();
  // countStartTime.value = Math.max(props.startTime - currentTime.value, 0);
  countStartTime.value = getCountDown(props.startTime, 'D')
  countdownTime.value = getCountDown(props.endTime, 'D')

  if (countdownTime.value <= 0) {
    cancel();
  }
})

</script>

<template>
  <div>
    <p v-if="isExpired">已结束</p>
    <p v-else>
      <span v-if="isCountingDown">倒计时: {{ countdownTime }}</span>
      <span v-else>距离开始: {{ countStartTime }}</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>

```
