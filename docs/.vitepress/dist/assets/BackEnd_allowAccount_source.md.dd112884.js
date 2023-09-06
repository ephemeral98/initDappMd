import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.9dd9ad44.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"BackEnd/allowAccount/source.md","filePath":"BackEnd/allowAccount/source.md","lastUpdated":1693985327000}'),p={name:"BackEnd/allowAccount/source.md"},o=l(`<h2 id="身份校验源码-go" tabindex="-1">身份校验源码(Go) <a class="header-anchor" href="#身份校验源码-go" aria-label="Permalink to &quot;身份校验源码(Go)&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">middleware</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">respstatus</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">bp-starter/src/RespStatus</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">bp-starter/src/utils</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">encoding/json</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">net/http</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/ethereum/go-ethereum/common/hexutil</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/ethereum/go-ethereum/crypto</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/gin-gonic/gin</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/tidwall/gjson</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 后台管理员</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> allowAddress </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx6954&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx6ff5&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">middleware</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">respstatus</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">bp-starter/src/RespStatus</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">bp-starter/src/utils</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">encoding/json</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">net/http</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/ethereum/go-ethereum/common/hexutil</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/ethereum/go-ethereum/crypto</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/gin-gonic/gin</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/tidwall/gjson</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 后台管理员</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> allowAddress </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx6954&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx6ff5&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">校验小狐狸签名是否有权限</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HasSign</span><span style="color:#E1E4E8;">() gin.HandlerFunc {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(ctx </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 获取请求头中的 auth:{signature: xxx, messageBody:xxx}</span></span>
<span class="line"><span style="color:#E1E4E8;">		auth </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> ctx.</span><span style="color:#79B8FF;">GetHeader</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;auth&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		res </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gjson.</span><span style="color:#79B8FF;">Parse</span><span style="color:#E1E4E8;">(auth)</span></span>
<span class="line"><span style="color:#E1E4E8;">		targetAddr </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> res.</span><span style="color:#79B8FF;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;signature&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">		messageBody </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> res.</span><span style="color:#79B8FF;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;messageBody&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> targetAddr </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> messageBody </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			respstatus.</span><span style="color:#79B8FF;">NewRespStatus</span><span style="color:#E1E4E8;">(ctx).</span><span style="color:#79B8FF;">Fail</span><span style="color:#E1E4E8;">(respstatus.UNAUTHORIZED)</span></span>
<span class="line"><span style="color:#E1E4E8;">			ctx.</span><span style="color:#79B8FF;">Abort</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 解码签名</span></span>
<span class="line"><span style="color:#E1E4E8;">		sig, _ </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> hexutil.</span><span style="color:#79B8FF;">Decode</span><span style="color:#E1E4E8;">(targetAddr)</span></span>
<span class="line"><span style="color:#E1E4E8;">		sig[</span><span style="color:#79B8FF;">64</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">-=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">27</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		msg </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> fmt.</span><span style="color:#79B8FF;">Sprint</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\x19</span><span style="color:#9ECBFF;">Ethereum Signed Message:</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;">(messageBody), messageBody)</span></span>
<span class="line"><span style="color:#E1E4E8;">		hash </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> crypto.</span><span style="color:#79B8FF;">Keccak256</span><span style="color:#E1E4E8;">([]</span><span style="color:#79B8FF;">byte</span><span style="color:#E1E4E8;">(msg))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 转成地址</span></span>
<span class="line"><span style="color:#E1E4E8;">		publicKey, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> crypto.</span><span style="color:#79B8FF;">SigToPub</span><span style="color:#E1E4E8;">(hash, sig)</span></span>
<span class="line"><span style="color:#E1E4E8;">		utils.</span><span style="color:#79B8FF;">CatchErr</span><span style="color:#E1E4E8;">(err) </span><span style="color:#6A737D;">// 简单封装了一下捕获错误</span></span>
<span class="line"><span style="color:#E1E4E8;">		resAddress </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> crypto.</span><span style="color:#79B8FF;">PubkeyToAddress</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">publicKey)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		allow </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> _, item </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> allowAddress {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> item </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> resAddress.</span><span style="color:#79B8FF;">Hex</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">				allow </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">allow {</span></span>
<span class="line"><span style="color:#E1E4E8;">			respstatus.</span><span style="color:#79B8FF;">NewRespStatus</span><span style="color:#E1E4E8;">(ctx).</span><span style="color:#79B8FF;">Fail</span><span style="color:#E1E4E8;">(respstatus.UNAUTHORIZED)</span></span>
<span class="line"><span style="color:#E1E4E8;">			ctx.</span><span style="color:#79B8FF;">Abort</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		ctx.</span><span style="color:#79B8FF;">Next</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">校验小狐狸签名是否有权限</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HasSign</span><span style="color:#24292E;">() gin.HandlerFunc {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(ctx </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 获取请求头中的 auth:{signature: xxx, messageBody:xxx}</span></span>
<span class="line"><span style="color:#24292E;">		auth </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> ctx.</span><span style="color:#005CC5;">GetHeader</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;auth&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		res </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gjson.</span><span style="color:#005CC5;">Parse</span><span style="color:#24292E;">(auth)</span></span>
<span class="line"><span style="color:#24292E;">		targetAddr </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> res.</span><span style="color:#005CC5;">Get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;signature&quot;</span><span style="color:#24292E;">).</span><span style="color:#005CC5;">String</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">		messageBody </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> res.</span><span style="color:#005CC5;">Get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;messageBody&quot;</span><span style="color:#24292E;">).</span><span style="color:#005CC5;">String</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> targetAddr </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> messageBody </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			respstatus.</span><span style="color:#005CC5;">NewRespStatus</span><span style="color:#24292E;">(ctx).</span><span style="color:#005CC5;">Fail</span><span style="color:#24292E;">(respstatus.UNAUTHORIZED)</span></span>
<span class="line"><span style="color:#24292E;">			ctx.</span><span style="color:#005CC5;">Abort</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 解码签名</span></span>
<span class="line"><span style="color:#24292E;">		sig, _ </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> hexutil.</span><span style="color:#005CC5;">Decode</span><span style="color:#24292E;">(targetAddr)</span></span>
<span class="line"><span style="color:#24292E;">		sig[</span><span style="color:#005CC5;">64</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">-=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">27</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		msg </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> fmt.</span><span style="color:#005CC5;">Sprint</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\x19</span><span style="color:#032F62;">Ethereum Signed Message:</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">len</span><span style="color:#24292E;">(messageBody), messageBody)</span></span>
<span class="line"><span style="color:#24292E;">		hash </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> crypto.</span><span style="color:#005CC5;">Keccak256</span><span style="color:#24292E;">([]</span><span style="color:#005CC5;">byte</span><span style="color:#24292E;">(msg))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 转成地址</span></span>
<span class="line"><span style="color:#24292E;">		publicKey, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> crypto.</span><span style="color:#005CC5;">SigToPub</span><span style="color:#24292E;">(hash, sig)</span></span>
<span class="line"><span style="color:#24292E;">		utils.</span><span style="color:#005CC5;">CatchErr</span><span style="color:#24292E;">(err) </span><span style="color:#6A737D;">// 简单封装了一下捕获错误</span></span>
<span class="line"><span style="color:#24292E;">		resAddress </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> crypto.</span><span style="color:#005CC5;">PubkeyToAddress</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">publicKey)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		allow </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> _, item </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> allowAddress {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> item </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> resAddress.</span><span style="color:#005CC5;">Hex</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">				allow </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">allow {</span></span>
<span class="line"><span style="color:#24292E;">			respstatus.</span><span style="color:#005CC5;">NewRespStatus</span><span style="color:#24292E;">(ctx).</span><span style="color:#005CC5;">Fail</span><span style="color:#24292E;">(respstatus.UNAUTHORIZED)</span></span>
<span class="line"><span style="color:#24292E;">			ctx.</span><span style="color:#005CC5;">Abort</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		ctx.</span><span style="color:#005CC5;">Next</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,3),t=[o];function e(c,r,E,y,i,F){return n(),a("div",null,t)}const C=s(p,[["render",e]]);export{u as __pageData,C as default};
