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

### 源码：

```vue
<script setup lang="ts">
import mitt from './useMitt';

interface IRule {
  valid: () => boolean; // 规则函数
  message: string; // 消息
}
const props = defineProps<{
  name?: string; // 名字
  value: string; // 输入框的值
  type?: 'text' | 'password'; // 类型
  holder?: string;
  noTag?: boolean; // 不做星星标记require
  require?: boolean; // 是否必须填写
  requireMsg?: string; // 自定义空值消息
  rules?: IRule[]; // 规则
  dataSame?: string; // 标记同类
  dataName?: string; // 标记自己(同类中独一无二的)
}>();

const emits = defineEmits<{
  (update: 'update:value', string);
}>();

const handleInp = (e) => {
  if (props.type === 'password' && e.data === ' ') {
    // 密码不能按空格
    e.target.value = props.value;
    return;
  }
  const value = String(e.target.value).trim();
  emits('update:value', value);
};

const cloneRules = ref<any>({});

cloneRules.value = props.rules?.map((item) => {
  return {
    ...item,
    status: true,
  };
});

// 犯规的那一项
const ruleItem = computed(() => {
  return cloneRules.value?.find((item) => !item.status);
});

/**
 * 校验数据
 */
const validData = () => {
  cloneRules.value?.forEach((item) => {
    if (item.valid) {
      item.status = item.valid();
    }
  });
};

const inpRef = ref(null);
const watching = ref(false);
const doWatch = () => {
  watching.value = !watching.value;
  inpRef.value.type = watching.value ? 'text' : 'password';
};

const showEmpty = ref(false);
const doBlur = () => {
  if (props.require && !props.value) {
    showEmpty.value = true;

    mitt.emit(props.dataSame, {
      type: props.dataSame,
      name: props.dataName,
      data: false,
    });
    return;
  }
  showEmpty.value = false;

  validData();
  const pass = cloneRules.value?.every((item) => item?.status) ?? true;
  mitt.emit(props.dataSame, {
    type: props.dataSame,
    name: props.dataName,
    data: pass,
  });
};

onMounted(() => {
  setTimeout(() => {
    // 滞后执行
    mitt.emit(props.dataSame, {
      require: !!props.require,
      type: props.dataSame,
      data: !!props.value,
      name: props.dataName,
    });
  }, 0);

  mitt.on('btn' + props.dataSame, (e: any) => {
    if (props.require && !props.value) {
      showEmpty.value = true;
    }
  });
});

onBeforeUnmount(() => {
  mitt.off('btn' + props.dataSame);
});
</script>

<template>
  <div class="inp-comp-wrap" :data-same="props.dataSame">
    <div class="sign-name" v-if="props.require && !props.noTag">*{{ props.name }}</div>
    <div class="sign-name" v-else-if="props.name">{{ props.name }}</div>
    <div class="mt-0.14rem relative">
      <input
        ref="inpRef"
        :type="props.type ?? 'text'"
        :placeholder="props.holder ?? ''"
        :class="['inp', { pwd: props.type === 'password' }]"
        :value="props.value"
        @input="handleInp"
        @blur="doBlur"
      />

      <!-- 密码输入框的眼睛 -->
      <template v-if="props.type === 'password'">
        <img
          src="@img/common/icon-eye.svg"
          alt=""
          class="cursor-pointer w-0.35rem md:w-0.2rem absolute right-0 top-1/2 transform translate-y-[-50%] translate-x-[-0.2rem] md:translate-x-[-0.1rem]"
          @click="doWatch"
          v-show="watching"
        />

        <img
          src="@img/common/icon-eye-close.svg"
          alt=""
          class="cursor-pointer w-0.35rem md:w-0.2rem absolute right-0 top-1/2 transform translate-y-[-50%] translate-x-[-0.2rem] md:translate-x-[-0.1rem]"
          @click="doWatch"
          v-show="!watching"
        />
      </template>
    </div>

    <div class="text-red-500 max-w-6rem" v-show="showEmpty">
      {{ props.requireMsg ?? 'Cannot be empty!' }}
    </div>

    <div class="text-red-500 max-w-6rem" v-show="!showEmpty && ruleItem?.status === false">
      {{ ruleItem?.message }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inp {
  width: 6.48rem;
  @include -height(0.8rem, 0.6rem, 0.6rem);
  border-radius: 0.1rem;
  padding: 0.17rem 0.14rem;
  background-color: transparent;
  border: 1px solid #efefef;
  @include -font-size(0.24rem, 0.16rem, 0.16rem);

  &::placeholder {
    color: #707070;
  }

  &.pwd {
    padding-right: 0.8rem;
  }
}

.sign-name {
  @include -font-size(0.28rem, 0.24rem, 0.24rem);
  font-weight: bold;
}
</style>

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

### 源码

```vue
<script setup lang="ts">
import mitt from './useMitt';
import { findAttr } from '@/utils/tools';

const props = defineProps<{
  dataSame?: string;
}>();

const emits = defineEmits<{
  (click: 'click'): MouseEvent;
}>();

const total = ref(0);
const tempCount = reactive<any>({});

const FormInpRef = ref(null);

/**
 * 计算有多少目标
 */
const calcElesLens = () => {
  const target = findAttr(FormInpRef.value, 'form-wrap');
  const eles = target.querySelectorAll('[data-same]');
  const targetEles = []; // 总DOM数量
  eles.forEach((item) => {
    if (item.getAttribute('data-same') === props.dataSame) {
      targetEles.push(item);
    }
  });
  total.value = targetEles.length;
};

onMounted(() => {
  mitt.on(props.dataSame, (e: any) => {
    if (e.data || e.require === false) {
      tempCount[e.name] = true;
    } else {
      tempCount[e.name] = false;
      // temp.value--;
    }
  });

  calcElesLens();
});

onBeforeUnmount(() => {
  mitt.off(props.dataSame);
});

const handleClick = () => {
  const finishedArr = Object.values(tempCount);
  // console.log('finished...', finished);
  const result = finishedArr.filter((item) => item);
  if (result.length >= total.value) {
    emits('click');
  } else {
    // console.log('不通过');
    mitt.emit('btn' + props.dataSame, false);
  }
};
</script>

<template>
  <button @click="handleClick" ref="FormInpRef">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped></style>

```

### useMitt

> 通讯工具

```ts
import mitt from 'mitt';
export default mitt();
```
