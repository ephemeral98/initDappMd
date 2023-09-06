# 关于计算

由于 js 精度不准确的问题：

```js
0.1 + 0.2 === 0.3; // false
```

所以，凡是与计算有关的，可使用`bpMath`

## 加减乘除

```js
const t = bpAdd('0.1', '0.2', '0.3'); // 即:0.1+0.2+0.3

const t = bpAdd('0.1', '0.2', '0.3', { deci: 3 }); // 约3位小数，四舍五入

const t = bpAdd('0.1', '0.2', '0.3', { deci: -3 }); // 约3位小数，并向下约

const t = bpAdd('0.1', '0.2', '0.3', { hex: true }); // 转成ethers的16进制的bigNumber

const t = bpAdd('0.1', '0.2', '0.3', { hex: true, deci: 3 }); // 转成ethers的16进制的bigNumber, 精度位3
```

#### 减法

```js
const t = bpSub('0.1', '0.2', '0.3'); // 即:0.1 - 0.2 - 0.3
```

#### 乘法

```js
const t = bpMul('0.1', '0.2', '0.3'); // 即:0.1 * 0.2 * 0.3
```

#### 除法

```js
const t = bpDiv('0.1', '0.2', '0.3'); // 即:0.1 * 0.2 * 0.3
```

#### 一些与合约交互的时候，需要带上精度

比如 bsc 中 USDT 的精度为 18，触发 transfer：

```js
const cloneAmount = bpMul(amount, 10 ** 18);
const { status } = await bpWrite(
  { success: $t('msg.5') },
  coinObj.value.transfer,
  收款地址,
  cloneAmount
);
```

## 两个数的比较

#### a < b?

```js
const res = bpLt(a, b);
```

#### a <= b?

```js
const res = bpLte(a, b);
```

#### a > b?

```js
const res = bpGt(a, b);
```

#### a >= b?

```js
const res = bpGte(a, b);
```

## 将普通字符串转为 ethers16 进制的 bigNumber

```js
const cloneNum = bpEthHex('99', 18);
```

## 将 ethers 的 16 进制 bigNumber 转为 String

#### 转为整数

```js
const num = bpFormat(bigNum);
```

#### 保留 3 位小数，并四舍五入

```js
const num = bpFormat(bigNum, 3);
```

#### 保留 3 位小数，并向下取

```js
const num = bpFormat(bigNum, -3);
```

#### bigNumber 来自是 6 位精度的, 转为带 3 位小数

```js
const num = bpFormat(bigNum, 3, 6);
```

## 将一个数进行四舍五入

```js
const num = bpFixed(bigNum, 3);
```

#### 四舍五入，不足补 0

```js
const num = bpFixed(bigNum, 3, true);
```

## 将一个数向下取

```js
const num = bpFloor(bigNum, 3);
```

#### 向下取，不足补 0

```js
const num = bpFloor(bigNum, 3, true);
```

## bpEmpty

判断一个数据是否为空，返回 true 则为空

1. 可以判断 vue 的 ref

2. 如果是对象，所有 value 为空，则这个数据也为空

## simpleZero

将小数前面的 0 简写

| 参数   | 类型   | 描述                                                |
| ------ | ------ | --------------------------------------------------- |
| 参数一 | string | 要修改的字符串                                      |
| 参数二 | number | 足够 0 开始的长度（默认 2：前面超过 2 个 0 才执行） |
| 参数三 | number | 截取的长度（默认 4：截取{0}后面最多 4 个非 0 数）   |

```
"3.00000014"  --->  "3.{6}14"
```

即：这里的`{6}`表示小数的前方有 6 个 0

即：这里将小数前面的 6 个 0 简写成`{6}`

只有符合这种前面带 0 的格式才会被转换，否则直接打回原数据

注意：一般联合`bpDiv`使用，而不是联合`bpFormat`使用

#### 例子：

```js
simpleZero(bpDiv(val, 10 ** 18));
```

```js
simpleZero(bpDiv(val, 10 ** 18), 2, 3);
```
