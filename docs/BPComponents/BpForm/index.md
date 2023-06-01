# 表单组件

> 拦截表单提交和下面有错误提示

## 输入框组件：```<FormInp />```

| 属性    | 类型         | 描述       |
| ------- | ------------ | ---------- |
| model:value | Ref | 输入框双向绑定的值（必填） |
| dataSame  | string       | 表单的相同名字标记，只有被相同名字标记的\<FormInp\>才受到提交限制（必填） |
| dataName | string | 自己的名字，用于区分 dataSame 下不同的组件（必填） |
| holder | string | 站位文字 |
| require | boolean | 是否不能为空 |
| requireMsg | string | 为空的时候的文案 |
| rules | { valid: \(\) => boolean, message: string } | 校验规则，包含valid，message；对象数组，valid是一个函数，返回的布尔值是true的话则校验通过，false则提示message |

### 使用方法

```jsx
<FormInp
  dataSame="forgetEmail"
  dataName="email"
  class="mt-0.14rem"
  v-model:value="emailInp"
  :holder="$t('login.7')"
  require
  no-tag
  :requireMsg="$t('login.8')"
  :rules="[
    { valid: () => validEmail(emailInp), message: 'invalid email!' },
  ]"
/>
```

## 按钮提交组件：```<FormBtn />```

| 属性    | 类型         | 描述       |
| ------- | ------------ | ---------- |
| dataSame | string | 表单的相同名字标记，只有被相同名字标记的\<FormInp\>才受到提交限制（必填） |

```jsx
<FormBtn
  data-same="signUp"
  v-loading="doSinUp.loading"
  class="login-btn hover-color-btn mx-auto"
  @click="doSinUp.refresh"
>
    提交
</FormBtn>
```

### useMitt

> 通讯工具

```ts
import mitt from 'mitt';
export default mitt();

```
### 源码：

[FormInp](./source.md)
