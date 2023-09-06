# 常用指令

## 输入框(input)指令

### v-max
描述：最大值，做大能输入多少

```vue
<input v-max="123" /> // 则输入框最大值不能超过123
```

### v-min
描述：最小值，做小能输入多少

```vue
<input v-min="123" /> // 则输入框最小值不能小于123
```

### v-number
描述：只能输入数字类型

```vue
<input v-number />
```

### v-double
描述：限制输入框输入 小数 类型

```vue
<input v-double="2" /> // 限制2位小数

<input v-double="-2" /> // 限制2位小数（可以为负数）
```

### v-int
描述：限制输入框只能输入 正整数 类型

```vue
<input v-int /> // 整数(不包括负数)
```

### v-integer
描述：限制输入框只能输入 整数(包括负数) 类型

```vue
<input v-int /> // 整数(包括负数)
```

## 其他指令

### v-load
描述：转圈圈

```vue
<button v-load="loadAuth" /> // loadAuth是一个boolean

<button v-load="[loadAuth, '50px']" /> // 传入数组，则第二项是要尺寸

<button v-load.dark="loadAuth" /> // 黑色主题
```

### v-disable
描述：置灰

```vue
<button v-disable="isDisable" /> // isDisable是一个boolean


<button v-disable="{message: '不能点击', value: isDisable}" /> // 置灰时候点击弹出消息

<button v-disable="[{message: '不能点击1', value: isDisable1}, {message: '不能点击2', value: isDisable2}]" /> // 支持多个条件

```

可以添加修饰符`.dark`，使得按钮变成灰色
```vue
<button v-disable.dark="{message: '不能点击', value: isDisable}" /> // 置灰时候点击弹出消息
```


注意不要传入一个proxy对象，只能是plain-object


### v-img
描述：图片懒加载与加载失败等处理

#### .lazy
```vue
<img src="@img/home.png" v-img.lazy="require('@img/holder.png')"/>
```
会预先加载`.lazy`的图片，这里即:holder.png

等待`@img/home.png`加载完成后，holder.png则会替换成 home.png

#### .backup

```vue
<img src="@img/home.png" v-img.backup="[require('@img/holder.png')]" />
```
防止`@img/home.png`加载失败的情况。

如果 src 加载失败，则会加载 backup 的图片，可传入多个图片资源

```vue
<img src="@img/home.png" v-img.backup="3" />
```
如果 src 加载失败，则会重复请求3次












