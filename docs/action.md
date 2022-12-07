# 触发合约方法

### 触发流程1：
###
页面触发 useRead() -> contractsApi/useXXX 的 bpRead()
bpRead进而触发合约事件

## useAction
包括 **bpRead**、**bpWrite**

> @/service/bpAction

#### 主要作用：页面数据状态管理，与链交互的触发时机

一般在 页面/组件、pinia 下使用

所有与链交互的方法必须使用这两个hook，对应的读/写


### useRead
| 参数 | 默认值 | 类型 | 描述 |
| -------- | ------ | ------ | ---- |
| callback  | undefined | Function | 触发bpRead的hook |
| extra  | undefined | Object | 额外配置项 |

额外配置描述:
| 参数 | 类型 | 默认值 | 描述 |
| ------ | ------ | ------ | ----- |
| default | any | undefined | 返回数据的默认值(必传) |
| interval | number | undefined | 轮询时间 |
| watcher | any | undefined | 监听者 使用方式和 watch 一致 |
| immediate | boolean | true | 是否立即执行 |
| noAccount | boolean | false | 是否 不依赖钱包 |

返回值描述：
|  | 类型 | 描述 |
| ---- | ---- | ---- |
| data | Ref | callback返回的值 |
| dataEx | Object | 工具包 |

dataEx工具包描述：
| 名字 | 类型 | 描述 |
| ------ | ------ | ----- |
| loading | boolean | 数据的加载状态 |
| status | boolean | 请求结果状态 |
| message | string | 请求结果消息，如果成功，则为 '' |
| refresh | Function | 重新请求数据 |
| doCore | Function | 手动请求方法 |

useRead 一般是一旦写了就自动跑一遍，如果不想立即自动跑一遍的话，可以配置：
```js
const [data, dataEx] useRead(async () => {}, {immediate: false});

setTimeout(() => {
   // 指定时期才手动执行: 
   dataEx.doCore();
}, 3000)
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
const { balanceData, balanceDataEx } = await useRead(async () => {
   return await emetObj.getBalance(); // 记得return出去给 balanceData
});
```

### useWrite
| 参数 | 默认值 | 类型 | 描述 |
| -------- | ------ | ------ | ---- |
| callback  | undefined | Function | 触发bpRead的hook |


返回值描述：
|  | 类型 | 描述 |
| ---- | ---- | ---- |
| handleFunc | Function | 触发函数 |
| load | boolean | 是否加载中 |

一般使用栗子：
```js
const [handleDecimal, loadDecimal] = useWrite(async () => {
   const result = await emetObj.getDecimals();
   result && dataEx.refresh();
});

<bp-button v-loading="loadDecimal" @click="handleDecimal" />
```
---


## bpAction
包括 **bpRead**、**bpWrite**

> @/service/bpAction，

#### 主要作用：用于交易的错误捕获与message提示。

一般在```@/contractsApi/useXXX.ts```下使用

你完全可以不使用他们，但是错误消息就得你自己捕获与提示！


### bpRead
| 参数 | 默认值 | 类型 | 返回值 | 描述 |
| -------- | ------ | ------ | ---- | ----- |
| 方法名，方法参数1, 方法参数2, 方法参数3...  | 无 | Function | status、datas | 调用合约 read 方法 |

返回值描述：
|  | 类型 | 描述 |
| ---- | ---- | ---- |
| status | boolean | 状态，true表示请求成功，false表示请求失败 |
| datas | Ref | 请求返回的数据 |
| message | string | 报错的时候返回的消息 |

栗子：
```ts
const { status, datas } = await bpRead(coinObj.value.balanceOf, targetAddr);
if (!status) return;
// 进行数据整理
const result = datas.map(item => item);
return result;
```

### bpWrite
| 参数 | 默认值 | 类型 | 返回值 | 描述 |
| -------- | ------ | ------ | ---- | ----- |
| 消息, 方法名，方法参数1, 方法参数2, 方法参数3...  | 无 | Function | status、datas、message | 调用合约 read 方法 |

传递消息参数的描述：
| 方式 | 类型 | 描述 |
| ---- | ---- | ---- |
| true | boolean | 完全使用默认的消息，成功直接弹success，错误直接弹错误消息(过滤后) |
| false | boolean | 不使用默认的消息, 将返回一个message，交给调用者自行处理 |
| { success: \$t('msg.3'), error: true} | Object | 成功自定义消息，错误使用默认 |

> 简单来说就是：true 使用默认，false 不弹消息，success状态可以自定义消息

返回值描述：
|  | 类型 | 描述 |
| ---- | ---- | ---- |
| status | boolean | 状态，true表示请求成功，false表示请求失败 |
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

3. 为了方便通讯，在```appStore```中，可以触发```refreshAllRead```方法，告诉全世界的```useRead```重跑，不管立即不立即执行的```useRead```。

不能在```useRead```中使用该方法；一般是在触发一个按钮之后，触发。
该方法不要最好不要滥用。

```
{
  status: false, // 状态标记为false
  message: string, // 错误消息
}
```


那么，在使用这两个 hooks 的时候，就能获取到错误消息
