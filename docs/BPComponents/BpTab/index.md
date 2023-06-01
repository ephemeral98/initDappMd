# 选项卡组件

> 带有过度动画的选项卡组件

## 横向选项卡：

| 属性    | 类型         | 描述       |
| ------- | ------------ | ---------- |
| tabs | Array  | 选项 |
| fontSize | string  | 字体大小 |
| color | string  | 颜色 |
| activeColor | string  | 激活中的字体颜色 |
| squareColor | string  | 滑块颜色 |
| type | 'wall'  | 模式 wall:加左右border |
| gapWall | boolean | 中间是否有墙(border) |
| gap | string | 间距 |
| capsule | boolean | 是否为胶囊状 |
| eqDivi | boolean | 每一块宽度均分 |
| pos | 'left' \| 'center' \| 'right' | 居左、中、右 |
| squarePadding | number | 滑块的内边距 |

### 使用方法

```jsx
const tabsList = reactive([
  {
    id: 1,
    text: 'login.3',
    urlName: 'signIn',
    active: true,
  },
  {
    id: 2,
    text: 'login.4',
    urlName: 'signUp',
    active: false,
  },
]);

const doPickTab = (e) => {
  console.log('选择：', e);
};

<Tabs :tabs="tabsList" @pick-tab="doPickTab" squareColor="#fff" font-size="0.24rem" color="#707070" />

```

### 源码：

[横向选项卡源码](./source.md)


## 纵向选项卡：

### 使用方法：

```jsx

  <Tabs :tabs="titleList" gap="0.4rem" fontSize="0.16rem" @pickTab="handlePickTab" />

```

### 源码：

[纵向选项卡源码](./colSource.md)
