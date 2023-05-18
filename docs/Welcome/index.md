## 开屏动画组件

### 使用方法
一般在首页直接引入即可

控制显示隐藏的状态最好全局共享

```ts
// appStore.ts
const useAppStore = defineStore('app', {
  state: () => ({
    welcoming: false, // 开场动画视频
  }),
})
```

```jsx
const appStore = useAppStore();

const { welcoming } = storeToRefs(appStore);

<Welcome v-show="welcoming" />
```

### 源码：

[源码](./source.md)
