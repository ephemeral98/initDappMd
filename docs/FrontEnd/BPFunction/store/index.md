# 全局数据的共享
使用的是 pinia 工具库。

## appStore
#### 主要作用：
- 处理与连接钱包相关
- 处理屏幕环境相关
- 处理多语言
- 全局通讯 

## 其他 store
建议格式不要使用```options api```，而使用```composition api```, 这样更容易混入```useRead```这种hook。

如果你使用vsCode，可以添加下面代码片段快速生成一个store:
```
   "pinia": {
		"prefix": "pinia", // 触发的关键字
		"body": [
			"import { defineStore, storeToRefs } from 'pinia';",
			"import { useRead } from '@/hooks/useAction';",
			"",
			"const use${2} = defineStore('${1}', () => {",
			"   ${3}",
			"  return {",
			"     ",
			"  };",
			"});",
			"",
			"export default use${2};",
		],
		"description": "create pinia"
	},

```


