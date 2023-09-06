import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.9dd9ad44.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"BackEnd/scanContract/source.md","filePath":"BackEnd/scanContract/source.md","lastUpdated":1693985327000}'),p={name:"BackEnd/scanContract/source.md"},o=l(`<h2 id="关于扫块-源码" tabindex="-1">关于扫块(源码) <a class="header-anchor" href="#关于扫块-源码" aria-label="Permalink to &quot;关于扫块(源码)&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">scanContract</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	beginBlock </span><span style="color:#F97583;">int64</span><span style="color:#E1E4E8;">             </span><span style="color:#6A737D;">// 开始区块</span></span>
<span class="line"><span style="color:#E1E4E8;">	endBlock   </span><span style="color:#F97583;">int64</span><span style="color:#E1E4E8;">             </span><span style="color:#6A737D;">// 结束区块</span></span>
<span class="line"><span style="color:#E1E4E8;">	gap        </span><span style="color:#F97583;">int64</span><span style="color:#E1E4E8;">             </span><span style="color:#6A737D;">// 间隔时间</span></span>
<span class="line"><span style="color:#E1E4E8;">	contract   common.Address    </span><span style="color:#6A737D;">// 合约</span></span>
<span class="line"><span style="color:#E1E4E8;">	eventHash  []common.Hash     </span><span style="color:#6A737D;">// 事件哈希</span></span>
<span class="line"><span style="color:#E1E4E8;">	client     </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">ethclient.Client </span><span style="color:#6A737D;">// https</span></span>
<span class="line"><span style="color:#E1E4E8;">	wsClient   </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">ethclient.Client </span><span style="color:#6A737D;">// webSocket</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> ScanContract </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(scanContract)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">scanContract</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	beginBlock </span><span style="color:#D73A49;">int64</span><span style="color:#24292E;">             </span><span style="color:#6A737D;">// 开始区块</span></span>
<span class="line"><span style="color:#24292E;">	endBlock   </span><span style="color:#D73A49;">int64</span><span style="color:#24292E;">             </span><span style="color:#6A737D;">// 结束区块</span></span>
<span class="line"><span style="color:#24292E;">	gap        </span><span style="color:#D73A49;">int64</span><span style="color:#24292E;">             </span><span style="color:#6A737D;">// 间隔时间</span></span>
<span class="line"><span style="color:#24292E;">	contract   common.Address    </span><span style="color:#6A737D;">// 合约</span></span>
<span class="line"><span style="color:#24292E;">	eventHash  []common.Hash     </span><span style="color:#6A737D;">// 事件哈希</span></span>
<span class="line"><span style="color:#24292E;">	client     </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">ethclient.Client </span><span style="color:#6A737D;">// https</span></span>
<span class="line"><span style="color:#24292E;">	wsClient   </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">ethclient.Client </span><span style="color:#6A737D;">// webSocket</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> ScanContract </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(scanContract)</span></span></code></pre></div><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">创建</span></span>
<span class="line"><span style="color:#6A737D;">@param begin 开始区块</span></span>
<span class="line"><span style="color:#6A737D;">@param end 结束区块</span></span>
<span class="line"><span style="color:#6A737D;">@param gap 间隔时间</span></span>
<span class="line"><span style="color:#6A737D;">@param contract 合约</span></span>
<span class="line"><span style="color:#6A737D;">@param eventHash 事件哈希</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (_this </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">scanContract) </span><span style="color:#B392F0;">NewScanContract</span><span style="color:#E1E4E8;">(begin </span><span style="color:#F97583;">int64</span><span style="color:#E1E4E8;">, end </span><span style="color:#F97583;">int64</span><span style="color:#E1E4E8;">, gap </span><span style="color:#F97583;">int64</span><span style="color:#E1E4E8;">, contract </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">, eventHash []</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">) scanContract {</span></span>
<span class="line"><span style="color:#E1E4E8;">	_this.client, _ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ethclient.</span><span style="color:#79B8FF;">Dial</span><span style="color:#E1E4E8;">(BscObj.</span><span style="color:#79B8FF;">BSCTest</span><span style="color:#E1E4E8;">().RpcUrls[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"><span style="color:#E1E4E8;">	_this.wsClient, _ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ethclient.</span><span style="color:#79B8FF;">Dial</span><span style="color:#E1E4E8;">(BscObj.</span><span style="color:#79B8FF;">BSCTestWs</span><span style="color:#E1E4E8;">().RpcUrls[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	_this.beginBlock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> begin</span></span>
<span class="line"><span style="color:#E1E4E8;">	_this.endBlock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> end</span></span>
<span class="line"><span style="color:#E1E4E8;">	_this.gap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> gap</span></span>
<span class="line"><span style="color:#E1E4E8;">	_this.contract </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> common.</span><span style="color:#79B8FF;">HexToAddress</span><span style="color:#E1E4E8;">(contract)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> _, item </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> eventHash {</span></span>
<span class="line"><span style="color:#E1E4E8;">		_this.eventHash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">append</span><span style="color:#E1E4E8;">(_this.eventHash, common.</span><span style="color:#79B8FF;">HexToHash</span><span style="color:#E1E4E8;">(item))</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">_this</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (_this </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">scanContract) </span><span style="color:#B392F0;">Main</span><span style="color:#E1E4E8;">(cb </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">([]types.Log)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	inx </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;第&quot;</span><span style="color:#E1E4E8;">, inx, </span><span style="color:#9ECBFF;">&quot;论&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		query </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> ethereum.FilterQuery{</span></span>
<span class="line"><span style="color:#E1E4E8;">			FromBlock: big.</span><span style="color:#79B8FF;">NewInt</span><span style="color:#E1E4E8;">(_this.beginBlock),</span></span>
<span class="line"><span style="color:#E1E4E8;">			ToBlock:   big.</span><span style="color:#79B8FF;">NewInt</span><span style="color:#E1E4E8;">(_this.beginBlock </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> _this.gap),</span></span>
<span class="line"><span style="color:#E1E4E8;">			Addresses: []common.Address{</span></span>
<span class="line"><span style="color:#E1E4E8;">				_this.contract,</span></span>
<span class="line"><span style="color:#E1E4E8;">			},</span></span>
<span class="line"><span style="color:#E1E4E8;">			Topics: [][]common.Hash{</span></span>
<span class="line"><span style="color:#E1E4E8;">				_this.eventHash,</span></span>
<span class="line"><span style="color:#E1E4E8;">			},</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		logs, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> _this.client.</span><span style="color:#79B8FF;">FilterLogs</span><span style="color:#E1E4E8;">(context.</span><span style="color:#79B8FF;">Background</span><span style="color:#E1E4E8;">(), query)</span></span>
<span class="line"><span style="color:#E1E4E8;">		utils.</span><span style="color:#79B8FF;">CatchErr</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">cb</span><span style="color:#E1E4E8;">(logs)</span></span>
<span class="line"><span style="color:#E1E4E8;">		inx</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">		_this.beginBlock </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> _this.gap</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">创建</span></span>
<span class="line"><span style="color:#6A737D;">@param begin 开始区块</span></span>
<span class="line"><span style="color:#6A737D;">@param end 结束区块</span></span>
<span class="line"><span style="color:#6A737D;">@param gap 间隔时间</span></span>
<span class="line"><span style="color:#6A737D;">@param contract 合约</span></span>
<span class="line"><span style="color:#6A737D;">@param eventHash 事件哈希</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (_this </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">scanContract) </span><span style="color:#6F42C1;">NewScanContract</span><span style="color:#24292E;">(begin </span><span style="color:#D73A49;">int64</span><span style="color:#24292E;">, end </span><span style="color:#D73A49;">int64</span><span style="color:#24292E;">, gap </span><span style="color:#D73A49;">int64</span><span style="color:#24292E;">, contract </span><span style="color:#D73A49;">string</span><span style="color:#24292E;">, eventHash []</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">) scanContract {</span></span>
<span class="line"><span style="color:#24292E;">	_this.client, _ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ethclient.</span><span style="color:#005CC5;">Dial</span><span style="color:#24292E;">(BscObj.</span><span style="color:#005CC5;">BSCTest</span><span style="color:#24292E;">().RpcUrls[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">])</span></span>
<span class="line"><span style="color:#24292E;">	_this.wsClient, _ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ethclient.</span><span style="color:#005CC5;">Dial</span><span style="color:#24292E;">(BscObj.</span><span style="color:#005CC5;">BSCTestWs</span><span style="color:#24292E;">().RpcUrls[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	_this.beginBlock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> begin</span></span>
<span class="line"><span style="color:#24292E;">	_this.endBlock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> end</span></span>
<span class="line"><span style="color:#24292E;">	_this.gap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> gap</span></span>
<span class="line"><span style="color:#24292E;">	_this.contract </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> common.</span><span style="color:#005CC5;">HexToAddress</span><span style="color:#24292E;">(contract)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> _, item </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> eventHash {</span></span>
<span class="line"><span style="color:#24292E;">		_this.eventHash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">append</span><span style="color:#24292E;">(_this.eventHash, common.</span><span style="color:#005CC5;">HexToHash</span><span style="color:#24292E;">(item))</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">_this</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (_this </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">scanContract) </span><span style="color:#6F42C1;">Main</span><span style="color:#24292E;">(cb </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">([]types.Log)) {</span></span>
<span class="line"><span style="color:#24292E;">	inx </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;第&quot;</span><span style="color:#24292E;">, inx, </span><span style="color:#032F62;">&quot;论&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		query </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> ethereum.FilterQuery{</span></span>
<span class="line"><span style="color:#24292E;">			FromBlock: big.</span><span style="color:#005CC5;">NewInt</span><span style="color:#24292E;">(_this.beginBlock),</span></span>
<span class="line"><span style="color:#24292E;">			ToBlock:   big.</span><span style="color:#005CC5;">NewInt</span><span style="color:#24292E;">(_this.beginBlock </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> _this.gap),</span></span>
<span class="line"><span style="color:#24292E;">			Addresses: []common.Address{</span></span>
<span class="line"><span style="color:#24292E;">				_this.contract,</span></span>
<span class="line"><span style="color:#24292E;">			},</span></span>
<span class="line"><span style="color:#24292E;">			Topics: [][]common.Hash{</span></span>
<span class="line"><span style="color:#24292E;">				_this.eventHash,</span></span>
<span class="line"><span style="color:#24292E;">			},</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		logs, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> _this.client.</span><span style="color:#005CC5;">FilterLogs</span><span style="color:#24292E;">(context.</span><span style="color:#005CC5;">Background</span><span style="color:#24292E;">(), query)</span></span>
<span class="line"><span style="color:#24292E;">		utils.</span><span style="color:#005CC5;">CatchErr</span><span style="color:#24292E;">(err)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">cb</span><span style="color:#24292E;">(logs)</span></span>
<span class="line"><span style="color:#24292E;">		inx</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">		_this.beginBlock </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> _this.gap</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="获取最新区块信息" tabindex="-1">获取最新区块信息 <a class="header-anchor" href="#获取最新区块信息" aria-label="Permalink to &quot;获取最新区块信息&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">最新区块</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">latestBlock</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	contract  common.Address    </span><span style="color:#6A737D;">// 合约</span></span>
<span class="line"><span style="color:#E1E4E8;">	eventHash []common.Hash     </span><span style="color:#6A737D;">// 事件哈希</span></span>
<span class="line"><span style="color:#E1E4E8;">	wsClient  </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">ethclient.Client </span><span style="color:#6A737D;">// webSocket</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> LatestBlock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(latestBlock)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">最新区块</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">latestBlock</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	contract  common.Address    </span><span style="color:#6A737D;">// 合约</span></span>
<span class="line"><span style="color:#24292E;">	eventHash []common.Hash     </span><span style="color:#6A737D;">// 事件哈希</span></span>
<span class="line"><span style="color:#24292E;">	wsClient  </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">ethclient.Client </span><span style="color:#6A737D;">// webSocket</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> LatestBlock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(latestBlock)</span></span></code></pre></div><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">创建</span></span>
<span class="line"><span style="color:#6A737D;">@param contract 合约</span></span>
<span class="line"><span style="color:#6A737D;">@param eventHash 事件哈希</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (_this </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">latestBlock) </span><span style="color:#B392F0;">NewLatestBlock</span><span style="color:#E1E4E8;">(contract </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">, eventHash []</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">latestBlock {</span></span>
<span class="line"><span style="color:#E1E4E8;">	_this.wsClient, _ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ethclient.</span><span style="color:#79B8FF;">Dial</span><span style="color:#E1E4E8;">(BscObj.</span><span style="color:#79B8FF;">BSCTestWs</span><span style="color:#E1E4E8;">().RpcUrls[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"><span style="color:#E1E4E8;">	_this.contract </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> common.</span><span style="color:#79B8FF;">HexToAddress</span><span style="color:#E1E4E8;">(contract)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> _, item </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> eventHash {</span></span>
<span class="line"><span style="color:#E1E4E8;">		_this.eventHash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">append</span><span style="color:#E1E4E8;">(_this.eventHash, common.</span><span style="color:#79B8FF;">HexToHash</span><span style="color:#E1E4E8;">(item))</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> _this</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">获取最新的区块事件</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (_this </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">latestBlock) </span><span style="color:#B392F0;">Main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 创建一个过滤器，以订阅指定合约的事件</span></span>
<span class="line"><span style="color:#E1E4E8;">	query </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> ethereum.FilterQuery{</span></span>
<span class="line"><span style="color:#E1E4E8;">		Addresses: []common.Address{</span></span>
<span class="line"><span style="color:#E1E4E8;">			_this.contract,</span></span>
<span class="line"><span style="color:#E1E4E8;">		},</span></span>
<span class="line"><span style="color:#E1E4E8;">		Topics: [][]common.Hash{</span></span>
<span class="line"><span style="color:#E1E4E8;">			_this.eventHash,</span></span>
<span class="line"><span style="color:#E1E4E8;">		},</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	logsCh </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">make</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> types.Log)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 订阅事件日志</span></span>
<span class="line"><span style="color:#E1E4E8;">	sub, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> _this.wsClient.</span><span style="color:#79B8FF;">SubscribeFilterLogs</span><span style="color:#E1E4E8;">(context.</span><span style="color:#79B8FF;">Background</span><span style="color:#E1E4E8;">(), query, logsCh)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#79B8FF;">Fatal</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">defer</span><span style="color:#E1E4E8;"> sub.</span><span style="color:#79B8FF;">Unsubscribe</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Waiting for contract events...&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 处理接收到的事件日志</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">sub.</span><span style="color:#79B8FF;">Err</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">			log.</span><span style="color:#79B8FF;">Fatal</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> vLog </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">logsCh:</span></span>
<span class="line"><span style="color:#E1E4E8;">			fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Received log: </span><span style="color:#79B8FF;">%+v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, vLog)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// 在这里可以进一步处理接收到的事件日志数据</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">创建</span></span>
<span class="line"><span style="color:#6A737D;">@param contract 合约</span></span>
<span class="line"><span style="color:#6A737D;">@param eventHash 事件哈希</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (_this </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">latestBlock) </span><span style="color:#6F42C1;">NewLatestBlock</span><span style="color:#24292E;">(contract </span><span style="color:#D73A49;">string</span><span style="color:#24292E;">, eventHash []</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">latestBlock {</span></span>
<span class="line"><span style="color:#24292E;">	_this.wsClient, _ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ethclient.</span><span style="color:#005CC5;">Dial</span><span style="color:#24292E;">(BscObj.</span><span style="color:#005CC5;">BSCTestWs</span><span style="color:#24292E;">().RpcUrls[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">])</span></span>
<span class="line"><span style="color:#24292E;">	_this.contract </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> common.</span><span style="color:#005CC5;">HexToAddress</span><span style="color:#24292E;">(contract)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> _, item </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> eventHash {</span></span>
<span class="line"><span style="color:#24292E;">		_this.eventHash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">append</span><span style="color:#24292E;">(_this.eventHash, common.</span><span style="color:#005CC5;">HexToHash</span><span style="color:#24292E;">(item))</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> _this</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">获取最新的区块事件</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (_this </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">latestBlock) </span><span style="color:#6F42C1;">Main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 创建一个过滤器，以订阅指定合约的事件</span></span>
<span class="line"><span style="color:#24292E;">	query </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> ethereum.FilterQuery{</span></span>
<span class="line"><span style="color:#24292E;">		Addresses: []common.Address{</span></span>
<span class="line"><span style="color:#24292E;">			_this.contract,</span></span>
<span class="line"><span style="color:#24292E;">		},</span></span>
<span class="line"><span style="color:#24292E;">		Topics: [][]common.Hash{</span></span>
<span class="line"><span style="color:#24292E;">			_this.eventHash,</span></span>
<span class="line"><span style="color:#24292E;">		},</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	logsCh </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">make</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> types.Log)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 订阅事件日志</span></span>
<span class="line"><span style="color:#24292E;">	sub, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> _this.wsClient.</span><span style="color:#005CC5;">SubscribeFilterLogs</span><span style="color:#24292E;">(context.</span><span style="color:#005CC5;">Background</span><span style="color:#24292E;">(), query, logsCh)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		log.</span><span style="color:#005CC5;">Fatal</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">defer</span><span style="color:#24292E;"> sub.</span><span style="color:#005CC5;">Unsubscribe</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Waiting for contract events...&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 处理接收到的事件日志</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">sub.</span><span style="color:#005CC5;">Err</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">			log.</span><span style="color:#005CC5;">Fatal</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> vLog </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">logsCh:</span></span>
<span class="line"><span style="color:#24292E;">			fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Received log: </span><span style="color:#005CC5;">%+v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, vLog)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// 在这里可以进一步处理接收到的事件日志数据</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,6),t=[o];function e(c,r,E,y,i,F){return n(),a("div",null,t)}const D=s(p,[["render",e]]);export{A as __pageData,D as default};
