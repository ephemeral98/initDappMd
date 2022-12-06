# Hello BlockPulse

## 与合约交互相关

### [触发方法](/action)

- useAction

  1. useRead
  2. useWrite

- bpAction
  1. bpRead
  2. bpWrite

### [构建合约对象方法](/contract)

即：@/contractsApi/useXXX.ts 文件

## 常用指令

即：@/utils/bpDirective.ts 文件

## [路由工具](/router)

在一些特别情况下使用 vue-router

## [全局状态管理](/store)

使用 pinia 创建的全局状态管理

## [常用 hooks](/hooks)

## [全局组件](/commonCps)
- bp-button

- bp-swiper

- GlobalLoading

---

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


## PS:

由于 vite 使用 js 的 debugger 的时候，总是跳到不准确的地方，所以建议使用 vsCode 打断点：

```
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Edge",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:3100", // 写自己的端口号
      "webRoot": "${workspaceFolder}/src",
    },
  ]
}
```
