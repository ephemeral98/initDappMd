## 是否允许钱包通过(身份校验)

> 一般是用来判断该钱包是不是管理员

### 依赖的库：

- `localmemory`

> 大体逻辑：
>
> 前端路由进入的时候, 如果是首次进入，则获取签名;
>
> 将消息和签名存入 localStorage 中;
>
> 再进行签名校验，得出来的地址，与管理员地址匹配，通过则放行;
>
> 如果发现localStorage没有消息和签名，则重新让用户签名;


路由进行拦截：

```ts
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // 每次进来，先拿一下钱包
    const appStore = useAppStore();
    if (to.meta.auth) {
      // 需要签名认证
      await appStore.linkWallet();
      handleSwitchChain();
      appStore.setNetWorkReady(true);
      const { doSign, getSign } = useSign();

      let ethereumSign = getSign();
      // 之前没有签名验证的话，先签一下名
      if (!ethereumSign) {
        ethereumSign = await doSign();
      }
      const address = ethers.verifyMessage(ethereumSign.messageBody, ethereumSign.signature);
      const allow = allowAccounts(address);
      if (!allow) {
        ElMessage.error($p('你不是管理员'));
        next(false);
        return;
      }
    }
    appStore.linkWallet().then(() => {
      handleSwitchChain();
      appStore.setNetWorkReady(true);
    });

    if (to.matched.length === 0) {
      //如果未匹配到路由
      from.path ? next({ path: from.path }) : next('/'); //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
    } else {
      next(); //如果匹配到正确跳转
    }
  }
);
```

### 在请求的时候，如果接口有限制，则在请求头携带消息和签名发送

> 大体逻辑：
>
> 请求之前，如果在参数中配置了auth字段，则自动给header加一个auth字段，并把配置中的auth抹去，然后把消息和签名一同发送;


```ts
// request.ts

import axios from 'axios';
import { ElMessage } from 'element-plus';
import useSign from '@/hooks/useSign';
import { localMemory } from 'localmemory';

const defaultConfig = {
  baseURL: '',
};
Object.assign(axios.defaults, defaultConfig);
axios.defaults.headers['Content-Type'] = 'application/json';

// 请求拦截器
axios.interceptors.request.use(
  async (config) => {
    const { doSign } = useSign();

    // 如果请求参数有auth标记，则携带上token
    if (config.params.ethereumSign) {
      const token = localMemory.getItem('ethereumSign');
      if (token) {
        config.headers = {
          auth: JSON.stringify(token),
        };
      } else {
        const resp = await doSign();
        if (resp) {
          config.headers = {
            auth: JSON.stringify(resp),
          };
        }
      }
      // 抹去配置参数中的auth
      delete config.params.ethereumSign;
    }

    return config;
  },
  (err) => {
    // 对请求错误做些什么
    return Promise.reject(err);
  }
);
export default axios;

```

所以每次请求，只需要标记一下：

```ts
useGet('/api/test/whoami', {
  params: {
    ethereumSign: true, // 这里标记一下
    ...其他参数
  },
  default: {},
  immediate: true,
});
```

## appStore的监听钱包切换中，在切换钱包的时候要移除掉签名信息

```ts
// 监听切账号
window.ethereum?.on('accountsChanged', (accounts) => {
  this.changeSignal.countWallet++;
  this.defaultAccount = accounts[0];

  localMemory.removeItem('ethereumSign'); // 移除身份签名信息
});
```

