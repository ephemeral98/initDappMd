# 倒计时

> - 分为组件与hook形式，
> 
> - 如果是普通的倒计时，使用hook即可
> 
> - 如果需要距离开始时间与距离结束时间，使用组件

## 倒计时组件

| 属性    | 类型         | 描述       |
| ------- | ------------ | ---------- |
| startTime | number | 开始时间（毫秒） |
| endTime   | number | 结束时间（毫秒）|

### 具体描述
1. 组件会根据2个时间判断
2. 如果时间没有到达开始时间，则可以显示当前时间到 **达开始时间** 的倒计时
3. 如果过了开始时间，并且没有到达结束时间，则可显示当前时间到达 **结束时间** 的倒计时
4. 如果超过了结束时间，则可显示 **已结束**

### 使用方法

```jsx
<Countdown :startTime="1684383070000" :endTime="1684386385000" />
```

### 源码：

[组件源码](./source.md)


## 倒计时hook

| 说明    | 参数类型      | 描述       |
| ------- | ------------ | ---------- |
| 参数1 | Ref | 距离倒计时的时间 (毫秒) |
| 参数2 | string | 是以什么格式显示 |
| 参数3 | \{ onFinish \} | 倒计时结束的回调 |

#### 第二个参数的描述：
 Y:年、M:月、D:日、h:时、m:分、s:秒

### 注意：
第一个参数times，如果不是 `Ref`，则可以使用 `computed` 包装成 `Ref`

### 使用方法

```ts
const [tempTime, tempTimeEx] = useRead(
  async () => {
    return {
      time: '1716019596000'
    };
  },
  { default: { time: '0' }, immediate: true }
);

// 使用computed包装成Ref
const times = computed(() => tempTime.value.time);

const { countdownTime } = useCountdown(times, 'D', {
  onFinish() {
    console.log('倒计时结束');
  }
});
```

### 源码：

[hook源码](./hookSource.md)
