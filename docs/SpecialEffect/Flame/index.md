## 源码

```vue
<script setup lang="ts">
const menu = ref();

const OPTIONS = reactive({
  AMOUNT: 35, // 数量
  UPPER_LIMIT: 14, // 最大速度
  LOWER_LIMIT: 1, // 最小速度
});

const fireCanvas = ref();

onMounted(() => {
  fireCanvas.value = document.querySelector('canvas');
  const context = fireCanvas.value.getContext('2d');
  fireCanvas.value.width = window.innerWidth;
  fireCanvas.value.height = window.innerHeight;

  menu.value = document.querySelector('.menu');

  const UPPER_SIZE = 10;
  const LOWER_SIZE = 4;

  const doIt = () => Math.random() > 0.5;

  const update = (p) =>
    doIt() ? Math.max(OPTIONS.LOWER_LIMIT, p - 1) : Math.min(p + 1, OPTIONS.UPPER_LIMIT);

  const reset = (p) => {
    p.x = p.startX;
    p.y = p.startY;
  };
  const floored = (r) => Math.floor(Math.random() * r);
  const genParticles = () =>
    new Array(OPTIONS.AMOUNT).fill('').map((p) => {
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d');
      const r = Math.PI / 180;

      // 漂浮物的大小
      const size = (floored(UPPER_SIZE) + LOWER_SIZE) * 1.2;

      // 漂浮物的颜色
      const color = `rgba(255,${100 + Math.floor(Math.random() * 100)}, 0, ${Math.random() * 20})`;

      const xDelayed = doIt();
      // x方向的出生点
      const startX = xDelayed
        ? -(size + floored(fireCanvas.value.width))
        : floored(fireCanvas.value.width);
      // y方向的出生点
      const startY = xDelayed
        ? size + floored(fireCanvas.value.height) + Math.floor(fireCanvas.value.height)
        : fireCanvas.value.height + size + floored(fireCanvas.value.height);

      c.height = size;
      c.width = size;
      context.globalCompositeOperation = 'multiply';
      // ctx.filter = `blur(${Math.random() * size}px)`
      ctx.translate(size / 2, size / 2);
      ctx.rotate(r);
      ctx.translate(-(size / 5), -(size / 5));
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, size, size);
      return {
        x: startX,
        y: startY,
        startY,
        startX,
        c,
        r,
        vx: floored(OPTIONS.UPPER_LIMIT / 4),
        vy: floored(OPTIONS.UPPER_LIMIT / 4),
        size,
      };
    });

  let particles = genParticles();
  let FRAME_COUNT = 0;

  const draw = () => {
    if (!fireCanvas.value) return;

    if (
      fireCanvas.value.width !== window.innerWidth ||
      fireCanvas.value.height !== window.innerHeight
    ) {
      fireCanvas.value.width = window.innerWidth;
      fireCanvas.value.height = window.innerHeight;
      particles = genParticles();
    }
    // context.restore()
    for (const particle of particles) {
      context.clearRect(particle.x, particle.y, particle.size, particle.size);
      FRAME_COUNT++;
      if (particle.y < fireCanvas.value.height || particle.startX < 0) particle.x += particle.vx;
      if (particle.x > 0 || particle.startY > fireCanvas.value.height) particle.y -= particle.vy;
      if (FRAME_COUNT % 11 === 0 && doIt()) particle.vx = update(particle.vx);
      if (FRAME_COUNT % 13 === 0 && doIt()) particle.vy = update(particle.vy);
      context.drawImage(particle.c, particle.x, particle.y);
      if (particle.x > fireCanvas.value.width || particle.y < -particle.size) reset(particle);
    }
    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
});
</script>

<template>
  <canvas class="fire-wrap" ref="fireCanvas"></canvas>
</template>

<style lang="scss" scoped>
.fire-wrap {
  position: fixed;
  height: 99vh;
  width: 90vw;
  filter: blur(3px);
}
</style>

```

### 直接使用

```vue
<Flame />
```
