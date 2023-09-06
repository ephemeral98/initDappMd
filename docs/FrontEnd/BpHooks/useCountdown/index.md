# 倒计时

| 说明   | 参数类型       | 描述                                                    |
| ------ | -------------- | ------------------------------------------------------- |
| 参数 1 | Ref            | 距离倒计时开始的时间 (毫秒)                             |
| 参数 2 | Ref            | 距离倒计时结束的时间 (毫秒)                             |
| 参数 3 | string         | 是以什么格式显示（ Y:年、M:月、D:日、h:时、m:分、s:秒） |
| 参数 4 | \{ onFinish \} | 倒计时结束的回调                                        |

### 具体描述

1. 组件会根据 2 个时间判断, 抛出一个时间状态 countingStatus
2. 如果时间没有到达开始时间，则可以显示当前时间到 **达开始时间** 的倒计时
3. 如果过了开始时间，并且没有到达结束时间，则可显示当前时间到达 **结束时间** 的倒计时
4. 如果超过了结束时间，则可显示 **已结束**

#### countingStatus（当前倒计时状态）

| 状态     | 说明         |
| -------- | ------------ |
| notStart | 还没有开始   |
| expired  | 已经超时     |
| counting | 倒计时进行中 |

可根据倒计时状态显示不同的模板

### 注意：

第一个参数 times，如果不是 `Ref`，则可以使用 `computed` 包装成 `Ref`

### 使用方法

```jsx
const startTime = computed(() => props.startTime);
const endTime = computed(() => props.endTime);

const { countdownTime, coutingStatus } = useCountdown(startTime, endTime, 'D');
```

倒计时结束后可以执行一个 callback

```ts
const { countdownTime } = useCountdown(startTime, endTime, 'D', {
  onFinish() {
    console.log('倒计时结束');
  },
});
```

### 源码：

[hook 源码](./source.md)
