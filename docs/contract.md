# @/contractsApi/useXXX.ts

> 合约交互的 hook

### 主要作用: 组装合约返回的数据

## createContract

利用 ethers 构建合约对象

## watchAccount

由于小狐狸插件异步的关系，需要监听与重构合约对象

## useDefaultRpc

在每个合约对象构建`createContract`的时候，需要手动引入 `useDefaultRpc`，目的是如果没有小狐狸，则使用预设好的 rpc 构建合约对象。

## 有几个hook是比较通用的模型：
- **useCoinToken：用作构建ERC20代币合约对象**
- **useLpToken: 用作构建lp合约对象**
- **useNftToken: 用作构建nft合约对象**

以上 hook 需要传入 合约地址 和 abi，动态生成合约对象

以上 hook 已经写好一些比较常用的方法，如果你使用的方法不在这里面，可以自行添加上去。

## 除了上述3个合约之外，其他合约需要最好自行新建一个文件，去构建自己的合约对象
比如```@/contractsApi/useStakeContractApi.ts```这个文件。

## 栗子：

```ts
import { STAKE_CONT } from '@/contracts/address';
import { useAppStore } from '@store/appStore';
import i18n from '@/locales/i18n';
import useDefaultRpc from './useDefaultRpc';
import { bpFormat, bpMul } from '@/utils/bpMath';
import { bpRead, bpWrite } from '@/service/bpAction';
import { watchAccount } from '@/hooks/useAction';
import { reactive, Ref, ref } from 'vue';

const $t = i18n.global.t;

export default () => {
  const appStore = useAppStore();
  const created = ref<boolean>(false); // 合约对象是否构建完
  const stakeObj = ref<any>({}); // 代币合约对象
  const decimals = ref<number>(18); // 代币精度

  /**
   * 构建质押合约对象
   */
  async function createContract() {
    const signer = useDefaultRpc(); // 使用rpc节点
    try {
      stakeObj.value = new appStore.ethersObj.ethers.Contract(
        STAKE_CONT.address,
        STAKE_CONT.abi,
        signer
      );
    } catch (error) {
      console.log('构建质押合约对象失败', error);
    }
    created.value = true;
    return stakeObj;
  }
  createContract();

  // 添加钱包监听
  watchAccount(() => {
    createContract();
  });

  const useInfo = async () => {
    const resp = await bpRead(stakeObj.value.userInfo, appStore.defaultAccount);
  };

  async function userInfo() {
    const resp = await bpRead(stakeObj.value.userInfo, appStore.defaultAccount);

    if (!resp.status) return;
    return resp;
  }

  /**
   * 质押挖矿
   * @param amount 质押数量
   * @param inv 邀请人
   */
  async function stake(amount: BigNumStr, inv: string) {
    const cloneAmount = bpMul(amount, 10 ** 18);
    const { status } = await bpWrite({ success: $t('msg.12') }, stakeObj.value.stake, {
      value: cloneAmount,
    });
    return status;
  }

  return {
    created,
    userInfo,
    createContract,
    stake,
  };
};
```

#### 如果你使用vsCode，可以添加下面自定义代码片段：
```
		"useApi": {
			"prefix": "useapi", // 触发的关键字
			"body": [
				"import { ${1} } from '@/contracts/address';",
				"import { useAppStore } from '@store/appStore';",
				"import i18n from '@/locales/i18n';",
				"import useDefaultRpc from './useDefaultRpc';",
				"import { bpFormat, bpMul } from '@/utils/bpMath';",
				"import { bpRead, bpWrite } from '@/service/bpAction';",
				"import { watchAccount } from '@/hooks/useAction';",
				"import { ref } from 'vue';",
				"",
				"const $t = i18n.global.t;",
				"export default () => {",
				"const appStore = useAppStore();",
				"const created = ref<boolean>(false); // 合约对象是否构建完",
				"const ${2} = ref<any>({}); // 代币合约对象",
				"const decimals = ref<number>(18); // 代币精度",
				"",
				"/**",
				" * 构建质押合约对象",
				" */",
				"async function createContract() {",
				"  const signer = useDefaultRpc();",
				"  try {",
				"     ${2}.value = new appStore.ethersObj.ethers.Contract(",
				"     ${1}.address,",
				"     ${1}.abi,",
				"     signer",
				"   );",
				"  } catch (error) {",
				"   console.log('构建${2}合约对象失败', error);",
				"  }",
				"    created.value = true;",
				"    return ${2};",
				"  }",
				"  createContract();",
				"  // 添加钱包监听",
				"  watchAccount(() => {",
				"    createContract();",
				"  });",
				"",
				"${3}",
				"",
				"  const userInfo = async () => {",
				"  const resp = await bpRead(${2}.value.userInfo, appStore.defaultAccount);",
				"  if (!resp.status) return;",
				"    return resp;",
				"  }",
				"  return {",
				"    created,",
				"    userInfo,",
				"    createContract,",
				"  }",
				" }",
			],
			"description": "contractsApi"
		},
```
