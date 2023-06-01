# 指针光标组件源码：

```vue
<script setup lang="ts">
const cursor = ref<HTMLElement>(null);

const bigCondiction = ref(false);

const doMousePoint = (evt) => {
  const ele: HTMLElement = evt.target as any;

  const mouseX = evt.clientX;
  const mouseY = evt.clientY;
  cursor.value.style.left = mouseX + 'px';
  cursor.value.style.top = mouseY + 'px';
};

/**
 * 进入事件
 * @param evt
 */
const doMouseEnter = (evt) => {
  recFatherNode(evt);
};

/**
 * 离开事件
 * @param evt
 */
const doMouseLeave = (evt) => {
  const ele: HTMLElement = evt.target as any;
  if (ele?.classList?.contains?.('mouseTarget') || ele?.classList?.contains?.('char')) {
    bigCondiction.value = false;
  }
  if (cursor.value.classList?.contains?.('big')) {
    cursor.value?.classList.remove('big');
  }
};

/**
 * 遍历5层父级，添加标记
 * @param evt
 */
const recFatherNode = (evt) => {
  const ele: HTMLElement = evt.target as any;
  let node = null;
  for (let i = 0, len = 5; i < len; i++) {
    let item = node ?? ele.parentElement;
    if (item?.classList?.contains('mouseTarget')) {
      cursor.value.classList.add('big');
      break;
    } else {
      node = item?.parentElement;
    }
  }
};

onMounted(() => {
  document.body.addEventListener('mousemove', doMousePoint);
  document.body.addEventListener('mouseover', doMouseEnter);
  document.body.addEventListener('mouseout', doMouseLeave);
});

onBeforeUnmount(() => {
  document.body.removeEventListener('mousemove', doMousePoint);
  document.body.removeEventListener('mouseover', doMouseEnter);
  document.body.removeEventListener('mouseout', doMouseLeave);
});
</script>

<template>
  <div class="cursor" ref="cursor"></div>
</template>

<style lang="scss" scoped>
.cursor {
  position: fixed;
  border-radius: 50%;
  transform: translateX(-50%) translateY(-50%);
  pointer-events: none;
  left: -100px;
  top: 50%;
  height: 25px;
  width: 25px;
  z-index: 99998;
  -webkit-transition: all 0.3s ease-out;
  transition: transform 0.3s ease-out;
  /* mix-blend-mode: difference; */
  /* mix-blend-mode: saturation; */
  /* background: rgba(255, 255, 255, 0.5); */
  /* box-shadow: 0 0 20px 20px rgba(255, 255, 255, 0.5); */
  /* background: rgba(3, 126, 248, 0.5); */
  /* box-shadow: 0 0 20px 20px rgba(3, 126, 248, 0.5); */
  border: solid 2px #ff7e62;

  &.big {
    -webkit-transform: scale(2) translateX(-25%) translateY(-25%);
    transform: scale(2) translateX(-25%) translateY(-25%);
    /* background: rgba(255, 255, 255, 1); */
    /* background: rgb(242, 27, 20); */
    /* box-shadow: 0 0 0 rgba(255, 255, 255, 0.2); */
  }
}

.mousePoint {
  color: #fff;
}
</style>
```
