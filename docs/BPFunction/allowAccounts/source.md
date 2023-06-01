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
