## 路由的主要作用
1. vue-router的功能
2. 通过meta判定该页面的依赖属性, 通过```beforeEach```进行拦截判断

| 参数 | 类型 | 描述 |
| ---- | --- | --- |
| noAccount | Boolean | 该页面不需要自动连接钱包, true是不需要 |
| needChains | Array | 该页面需要依赖的链 |
| needTips | Boolean | 该页面需要依赖某链，如果链不对，则弹出提示 |

## useRouterTools
由于```vue-router```是异步的原因，所以一些情况下是不能通过```useRoute```获取路由信息的。

该工具是对于某些特定情况下，不能通过```useRoute```获取路由信息的一个补给

| 方法名 | 描述 |
| ---- | ---- |
| useRouteItem | 获取当前路由项的信息，执行一次获取一次，不具有响应式 |
| useRouteMeta | 获取当前路由meta信息，执行一次获取一次，不具有响应式 |
| useRouteQuery | 获取当前路由的query信息，执行一次获取一次，不具有响应式 |
| useRouteItemRef | 获取当前路由项信息 hook，具有响应式 |


其中```useRouteItemRef```是一个hook，要想使用他，必须确保在main.ts中开启```watchUrl()```

tips: 大部分情况下可以用这个平替```useRoute```的功能，

但是，不能获取跳转的时候```params```的参数对象。


