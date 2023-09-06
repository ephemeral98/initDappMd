## 身份校验(Go)

> 获取前端传递过来的请求头中的auth字段

> auth 包括消息和签名（signature: xxx, messageBody:xxx）

> 通过 hexutil.Decode，通过解码方法r，sig索引64 -= 27

> 将签名解码获取到用户的钱包地址

