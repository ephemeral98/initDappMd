## 身份校验源码(Go)

```go
package middleware

import (
	respstatus "bp-starter/src/RespStatus"
	"bp-starter/src/utils"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/gin-gonic/gin"
	"github.com/tidwall/gjson"
)

// 后台管理员
var allowAddress = []string{
	"0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx6954",
	"0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx6ff5",
}
```

```go
/*
校验小狐狸签名是否有权限
*/
func HasSign() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// 获取请求头中的 auth:{signature: xxx, messageBody:xxx}
		auth := ctx.GetHeader("auth")
		res := gjson.Parse(auth)
		targetAddr := res.Get("signature").String()
		messageBody := res.Get("messageBody").String()

		if targetAddr == "" || messageBody == "" {
			respstatus.NewRespStatus(ctx).Fail(respstatus.UNAUTHORIZED)
			ctx.Abort()
			return
		}

		// 解码签名
		sig, _ := hexutil.Decode(targetAddr)
		sig[64] -= 27

		msg := fmt.Sprint("\x19Ethereum Signed Message:\n", len(messageBody), messageBody)
		hash := crypto.Keccak256([]byte(msg))

		// 转成地址
		publicKey, err := crypto.SigToPub(hash, sig)
		utils.CatchErr(err) // 简单封装了一下捕获错误
		resAddress := crypto.PubkeyToAddress(*publicKey)

		allow := false
		for _, item := range allowAddress {
			if item == resAddress.Hex() {
				allow = true
				break
			}
		}

		if !allow {
			respstatus.NewRespStatus(ctx).Fail(respstatus.UNAUTHORIZED)
			ctx.Abort()
			return
		}

		ctx.Next()
	}
}

```
