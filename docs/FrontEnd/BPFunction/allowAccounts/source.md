## 源码

```ts
// 允许操作的钱包
export const accountArr: string[] = [
  '0xbBAXXXXXXXXXXXXXSSSSSSSSSSSSSSSSSSXX6954',
  '0xbBAXXXXXXXXXXXXXSSSSSSSSSSSSSSSSSSXX6ff5',
];

/**
 * 是否允许该钱包操作
 * @param account 钱包地址
 */
export function allowAccounts(account: string): boolean {
  const resp = accountArr.find((item) => {
    return item.toUpperCase() === account.toLocaleUpperCase();
  });
  return !!resp?.length;
}

```

## useSign源码

```ts
import { useAppStore } from '@/store/appStore';
import { ElMessage } from 'element-plus';
import { ethers } from 'ethers';
import { localMemory } from 'localmemory';

interface ISignRes {
  messageBody: string; // 消息体
  signature: string; // 签名
}

export default () => {
  const appStore = useAppStore();

  const doSign = async (): Promise<ISignRes> => {
    let signRes: ISignRes = {
      messageBody: '',
      signature: '',
    };

    return new Promise(async (resolve, reject) => {
      const owner = toRaw(appStore.ethersObj.signerValue);

      const messageBody = String(Date.now()) + Math.ceil(Math.random() * 1000);
      let signature;
      try {
        signature = await owner.signMessage(messageBody);
      } catch (err) {
        ElMessage.error($p('你没有权限'));
        reject();
        return;
      }

      signRes = {
        messageBody,
        signature,
      };

      setSign(signRes);
      resolve(signRes);
    });
  };

  const setSign = (signRes: ISignRes) => {
    localMemory.setItem({ name: 'ethereumSign', value: signRes });
  };

  const getSign = (): ISignRes => {
    return localMemory.getItem('ethereumSign');
  };

  return {
    doSign,
    setSign,
    getSign,
  };
};

```

