## 关于扫块(源码)

```go
type scanContract struct {
	beginBlock int64             // 开始区块
	endBlock   int64             // 结束区块
	gap        int64             // 间隔时间
	contract   common.Address    // 合约
	eventHash  []common.Hash     // 事件哈希
	client     *ethclient.Client // https
	wsClient   *ethclient.Client // webSocket
}

var ScanContract = new(scanContract)
```
```go
/*
创建
@param begin 开始区块
@param end 结束区块
@param gap 间隔时间
@param contract 合约
@param eventHash 事件哈希
*/
func (_this *scanContract) NewScanContract(begin int64, end int64, gap int64, contract string, eventHash []string) scanContract {
	_this.client, _ = ethclient.Dial(BscObj.BSCTest().RpcUrls[0])
	_this.wsClient, _ = ethclient.Dial(BscObj.BSCTestWs().RpcUrls[0])

	_this.beginBlock = begin
	_this.endBlock = end
	_this.gap = gap
	_this.contract = common.HexToAddress(contract)

	for _, item := range eventHash {
		_this.eventHash = append(_this.eventHash, common.HexToHash(item))
	}

	return *_this
}

func (_this *scanContract) Main(cb func([]types.Log)) {
	inx := 1
	for {
		fmt.Println("第", inx, "论")

		query := ethereum.FilterQuery{
			FromBlock: big.NewInt(_this.beginBlock),
			ToBlock:   big.NewInt(_this.beginBlock + _this.gap),
			Addresses: []common.Address{
				_this.contract,
			},
			Topics: [][]common.Hash{
				_this.eventHash,
			},
		}

		logs, err := _this.client.FilterLogs(context.Background(), query)
		utils.CatchErr(err)

		cb(logs)
		inx++
		_this.beginBlock += _this.gap
	}

}
```

## 获取最新区块信息

```go
/*
最新区块
*/
type latestBlock struct {
	contract  common.Address    // 合约
	eventHash []common.Hash     // 事件哈希
	wsClient  *ethclient.Client // webSocket
}

var LatestBlock = new(latestBlock)

```
```go
/*
创建
@param contract 合约
@param eventHash 事件哈希
*/
func (_this *latestBlock) NewLatestBlock(contract string, eventHash []string) *latestBlock {
	_this.wsClient, _ = ethclient.Dial(BscObj.BSCTestWs().RpcUrls[0])
	_this.contract = common.HexToAddress(contract)

	for _, item := range eventHash {
		_this.eventHash = append(_this.eventHash, common.HexToHash(item))
	}

	return _this
}

/*
获取最新的区块事件
*/
func (_this *latestBlock) Main() {
	// 创建一个过滤器，以订阅指定合约的事件
	query := ethereum.FilterQuery{
		Addresses: []common.Address{
			_this.contract,
		},
		Topics: [][]common.Hash{
			_this.eventHash,
		},
	}

	logsCh := make(chan types.Log)

	// 订阅事件日志
	sub, err := _this.wsClient.SubscribeFilterLogs(context.Background(), query, logsCh)
	if err != nil {
		log.Fatal(err)
	}
	defer sub.Unsubscribe()

	fmt.Println("Waiting for contract events...")

	// 处理接收到的事件日志
	for {
		select {
		case err := <-sub.Err():
			log.Fatal(err)
		case vLog := <-logsCh:
			fmt.Printf("Received log: %+v\n", vLog)
			// 在这里可以进一步处理接收到的事件日志数据
		}
	}
}

```
