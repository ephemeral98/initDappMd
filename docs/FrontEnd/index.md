## Welcome FrontEnd


## 运行模式

#### 开发环境

```
// 使用测试链
yarn dev
// 使用主链
yarn dev:main
```

#### 线上打包环境

1. 打包到根路径

```
// 使用测试链
yarn build:test
// 使用主链
yarn build:main
```

2. 打包到子路径

```
// 使用测试链
yarn build:childTest
// 使用主链
yarn build:childMain

// 然后放到直接子路径 名字为: childTest(childMain) 即可。
// 想换子路径名字，请全局修改 childTest(childMain)
// 最后访问 http: http://x.xxx.xxx.xxx/initDapp/#/
```

---

## 与合约交互相关

### [触发方法](/FrontEnd/BpHooks/useAction/index)

- useAction

  1. useRead
  2. useWrite

- bpAction
  1. bpRead
  2. bpWrite

### [构建合约对象方法](/FrontEnd/BPFunction/action/index)

即：@/contractsApi/useXXX.ts 文件

---

## [常用指令](/FrontEnd/BPFunction/bpDirective/index)

即：@/utils/bpDirective.ts 文件

---

## [关于计算](/FrontEnd/BPFunction/bpMath/index)

> 二次封装 math.js 库，解决 js 精度丢失问题

---

## [路由工具](/FrontEnd/BPFunction/router/index)

在一些特别情况下使用 vue-router

---

## [全局状态管理](/FrontEnd/BPFunction/store/index)

使用 pinia 创建的全局状态管理

---

## [关于多语言]

### $f
使用$f包裹的字符串，执行命令脚本，最终会编译成：
```
$f('首页')  --->  components.1
```

### $p
使用$p包裹的的字符串，执行命令，最终会编译成：
```
$p('首页') --->  $t('components.1')
```

对应的文案会根据你 输入的保存的文件名字，保存到相应的名字json文件

### 执行脚本命令
#### 注意：
需要node版本18以上才行

```shell
# 如果是yarn 
yarn rep

# 如果是npm
npm run rep
```

弹出输入框后则输入```en```则表示生成 ```en.json```

然后分别拿着对应的json文件去翻译就可。

如果想转成excel文档：

```shell
yarn excel
```

则生成一个excel表格，拿去翻译即可，在第二列输入对应译文，然后再执行

```shell
yarn json
```

则转回对应的json。

---

## [一些报错总结](/FrontEnd/BPFunction/errors/index)

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
