## 是否允许钱包通过

> 一般是用来判断该钱包是不是管理员

可以在路由进行拦截：

```ts
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // 每次进来，先拿一下钱包
    const appStore = useAppStore();

    if (to.meta.admin) {
      // 后台管理
      await appStore.linkWallet();
      handleSwitchChain();
      appStore.setNetWorkReady(true);
      const allow = allowAccounts(appStore.defaultAccount);
      if (!allow) {
        ElMessage.error($p('你不是管理员'));
      }
      next(allow);
    }

    // 前台
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
