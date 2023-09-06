## 关于扫块

### 使用方法

```go
var contractAddress = "0x9F046b656bdC7De4CE5117f9F4a64B00D4e21BD0" // 合约地址
const bondHash = "0x92xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxfb44" // 事件的交易哈希
const stakeHash = "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxb6" // 事件的交易哈希

scanContract := contract.ScanContract.NewScanContract(29817410, 29848268, 4000,contractAddress, []string{bondHash, stakeHash})
scanContract.Main(func(logs []types.Log) {
	fmt.Println("logs....", logs)
  // 拿到日志后该干嘛干嘛...
})
```
