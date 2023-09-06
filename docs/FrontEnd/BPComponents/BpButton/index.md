# BpButton

### 主要作用
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

### 源码

blockpulse_dapp 自带


