# 触发合约方法

### 触发流程 1：

###

页面触发 useRead() -> contractsApi/useXXX 的 bpRead()
bpRead 进而触发合约事件

## useAction

包括 **bpRead**、**bpWrite**

> @/service/bpAction

#### 主要作用：页面数据状态管理，与链交互的触发时机

一般在 页面/组件、pinia 下使用

所有与链交互的方法必须使用这两个 hook，对应的读/写

### useRead

| 参数     | 默认值    | 类型     | 描述                |
| -------- | --------- | -------- | ------------------- |
| callback | undefined | Function | 触发 bpRead 的 hook |
| extra    | undefined | Object   | 额外配置项          |

额外配置描述:
| 参数 | 类型 | 默认值 | 描述 |
| ------ | ------ | ------ | ----- |
| default | any | undefined | 返回数据的默认值(必传) |
| interval | number | undefined | 轮询时间 |
| watcher | any | undefined | 监听者 使用方式和 watch 一致 |
| immediate | boolean | true | 是否立即执行 |
| noAccount | boolean | false | 是否 不依赖钱包 |

返回值描述：
| | 类型 | 描述 |
| ---- | ---- | ---- |
| data | Ref | callback 返回的值 |
| dataEx | Object | 工具包 |

dataEx 工具包描述：
| 名字 | 类型 | 描述 |
| ------ | ------ | ----- |
| loading | boolean | 数据的加载状态 |
| status | boolean | 请求结果状态 |
| message | string | 请求结果消息，如果成功，则为 '' |
| refresh | Function | 重新请求数据 |
| cancel | Function | 取消请求 |

useRead 一般是一旦写了就自动跑一遍，如果不想立即自动跑一遍的话，可以配置：

```js
const [data, dataEx] = useRead(async () => {}, { immediate: false });

setTimeout(() => {
  // 指定时期才手动执行:
  dataEx.refresh();
}, 3000);
```

一般 write 请求后，需要重新刷新 read 的数据，可以借助 refresh

```js
const doWrite = useWrite(async () => {
  // 一些 写 的方法...
  dataEx.refresh();
});
```

一般使用栗子：

```ts
const { balanceData, balanceDataEx } = useRead(async () => {
  return await emetObj.getBalance(); // 记得return出去给 balanceData
});
```

### useWrite

| 参数     | 默认值    | 类型     | 描述                |
| -------- | --------- | -------- | ------------------- |
| callback | undefined | Function | 触发 bpRead 的 hook |

返回值描述：
| | 类型 | 描述 |
| ---- | ---- | ---- |
| handleFunc | Function | 触发函数 |
| load | boolean | 是否加载中 |

一般使用栗子：

```js
const [handleDecimal, loadDecimal] = useWrite(async () => {
   const result = await emetObj.getDecimals();
   result && dataEx.refresh();
});

<bp-button v-load="loadDecimal" @click="handleDecimal" />
```

## useAjax

#### 主要作用：

请求封装为 hook

包含请求方法：get、post、patch、put、delete，对应名字 useGet、useXxx...

```jsx
const [data, dataEx] = useGet('/api/whoAmI', {
  // 请求参数，如果需要响应式，则可利用 const myParams = reactive({aaa: 123});
  params: myParams,
  before(axios) {
    // 这里是请求之前做些事情，
    // 你可以在这里单独设置axios请求头
    // return 的值，就是 params(请求参数)，如果 不return，则取上面 myParams 作为请求参数
  },
  after(resp) {
    // 这里是请求之后做些事情，
    // 这里可以拿到响应体结果（axios拦截器过滤的结果）
    // return 的值，就是 data 的值
  },

  // true表示当请求进行中的时候(loading)，可以继续请求，即loading只是做个样子, 默认否
  // 当noLoadBlock是true的时候，下一次请求则会强行取消上一次请求
  noLoadBlock: true,
  // 是否立即执行，默认否
  immediate: true,
  // 是否依赖钱包，当true的时候，需要成功连接钱包后才会执行，默认否
  wallet: true,
  // 默认值, 即请求之前，data的站位值
  default: '默认值',
});

function cancel() {
  dataEx.cancel(); // 表示取消当前请求
  dataEx.refresh(); // 表示重新请求
}

// dataEx.loading 表示请求中
<div v-load="dataEx.loading"> {{ data }} </div>;
```

#### 一些注意事项：

1. 如果想用钱包地址作为 url 的一部分，或者是url一部分，是一个异步数据，可以借用`computed`转成`ref`再入参，并添加钱包依赖项
```ts
const url = computed(() => `/api/userInfo/${appStore.defaultAccount}`);
const [fetchUserInfo, fetchUserInfoEx] = useGet(url, {
    params: {},
    after(resp) {return resp.data;},
    wallet: true,
    immediate: false,
    default: {},
  });
```

2. 如果参数是异步数据，也可以借助computed，将整个params变成`ref`，再入参，注意是整个`params`，而不是仅仅把 `params` 的一部分变成 `ref`

```ts
const params = computed(() => ({ address: appStore.defaultAccount }));
const [signNewReferReward, signNewReferRewardEx] = usePost('/api/signNewReferReward', {
  params,
  after(resp) {
    return resp.data;
  },
  wallet: true,
  immediate: true,
});
```
---

## bpAction

包括 **bpRead**、**bpWrite**

> @/service/bpAction，

#### 主要作用：用于交易的错误捕获与 message 提示。

一般在`@/contractsApi/useXXX.ts`下使用

你完全可以不使用他们，但是错误消息就得你自己捕获与提示！

### bpRead

| 参数                                          | 默认值 | 类型     | 返回值        | 描述               |
| --------------------------------------------- | ------ | -------- | ------------- | ------------------ |
| 方法名，方法参数 1, 方法参数 2, 方法参数 3... | 无     | Function | status、datas | 调用合约 read 方法 |

返回值描述：
| | 类型 | 描述 |
| ---- | ---- | ---- |
| status | boolean | 状态，true 表示请求成功，false 表示请求失败 |
| datas | Ref | 请求返回的数据 |
| message | string | 报错的时候返回的消息 |

栗子：

```ts
const { status, datas } = await bpRead(coinObj.value.balanceOf, targetAddr);
if (!status) return;
// 进行数据整理
const result = datas.map((item) => item);
return result;
```

### bpWrite

| 参数                                                | 默认值 | 类型     | 返回值                 | 描述               |
| --------------------------------------------------- | ------ | -------- | ---------------------- | ------------------ |
| 消息, 方法名，方法参数 1, 方法参数 2, 方法参数 3... | 无     | Function | status、datas、message | 调用合约 read 方法 |

传递消息参数的描述：
| 方式 | 类型 | 描述 |
| ---- | ---- | ---- |
| true | boolean | 完全使用默认的消息，成功直接弹 success，错误直接弹错误消息(过滤后) |
| false | boolean | 不使用默认的消息, 将返回一个 message，交给调用者自行处理 |
| { success: `$t('msg.3')`, error: true} | Object | 成功自定义消息，错误使用默认 |

> 简单来说就是：true 使用默认，false 不弹消息，success 状态可以自定义消息

返回值描述：
| | 类型 | 描述 |
| ---- | ---- | ---- |
| status | boolean | 状态，true 表示请求成功，false 表示请求失败 |
| datas | Ref | 请求返回的数据 |
| message | string | 报错的时候返回的消息 |

栗子：

```ts
const { status, datas } = await bpWrite(true, coinObj.value.balanceOf, targetAddr);
return status; // write,一般字需要将请求的状态返回即可
```

---

## 注意事项：

1. 所有的方法都不让返回 Promise.reject 状态，统一由 status 管理，
   status 为 true 则该交易请求成功，false 则失败

2. 在 hooks 中有 `useRead` 和 `useWrite`，分别对应的读写，
   一般时不需要错误消息处理的，如果有场景需求，则需要返回:

3. 为了方便通讯，在`appStore`中，可以触发`refreshAllRead`方法，告诉全世界的`useRead`重跑，不管立即不立即执行的`useRead`。

不能在`useRead`中使用该方法；一般是在触发一个按钮之后，触发。
该方法不要最好不要滥用。

```
{
  status: false, // 状态标记为false
  message: string, // 错误消息
}
```

那么，在使用这两个 hooks 的时候，就能获取到错误消息
