# 体验一下

```ts
import { ethers } from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum, 'any'); 
const signer = provider.getSigner();

const obj = new ethers.Contract(合约地址, 合约abi, signer);
// obj是合约对象，先看看合约对象有没有你要调的方法

// 比如：授权
const resp = await obj.approve(授权的地址, ethers.constants.MaxUint256);
await resp?.wait?.();
```
