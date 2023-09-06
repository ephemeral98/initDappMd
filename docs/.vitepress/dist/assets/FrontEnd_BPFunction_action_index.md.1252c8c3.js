import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.9dd9ad44.js";const A=JSON.parse('{"title":"@/contractsApi/useXXX.ts","description":"","frontmatter":{},"headers":[],"relativePath":"FrontEnd/BPFunction/action/index.md","filePath":"FrontEnd/BPFunction/action/index.md","lastUpdated":1693985327000}'),o={name:"FrontEnd/BPFunction/action/index.md"},l=p(`<h1 id="contractsapi-usexxx-ts" tabindex="-1">@/contractsApi/useXXX.ts <a class="header-anchor" href="#contractsapi-usexxx-ts" aria-label="Permalink to &quot;@/contractsApi/useXXX.ts&quot;">​</a></h1><blockquote><p>合约交互的 hook</p></blockquote><h3 id="主要作用-组装合约返回的数据" tabindex="-1">主要作用: 组装合约返回的数据 <a class="header-anchor" href="#主要作用-组装合约返回的数据" aria-label="Permalink to &quot;主要作用: 组装合约返回的数据&quot;">​</a></h3><h2 id="createcontract" tabindex="-1">createContract <a class="header-anchor" href="#createcontract" aria-label="Permalink to &quot;createContract&quot;">​</a></h2><p>利用 ethers 构建合约对象</p><h2 id="watchaccount" tabindex="-1">watchAccount <a class="header-anchor" href="#watchaccount" aria-label="Permalink to &quot;watchAccount&quot;">​</a></h2><p>由于小狐狸插件异步的关系，需要监听与重构合约对象</p><h2 id="usedefaultrpc" tabindex="-1">useDefaultRpc <a class="header-anchor" href="#usedefaultrpc" aria-label="Permalink to &quot;useDefaultRpc&quot;">​</a></h2><p>在每个合约对象构建<code>createContract</code>的时候，需要手动引入 <code>useDefaultRpc</code>，目的是如果没有小狐狸，则使用预设好的 rpc 构建合约对象。</p><h2 id="有几个hook是比较通用的模型" tabindex="-1">有几个hook是比较通用的模型： <a class="header-anchor" href="#有几个hook是比较通用的模型" aria-label="Permalink to &quot;有几个hook是比较通用的模型：&quot;">​</a></h2><ul><li><strong>useCoinToken：用作构建ERC20代币合约对象</strong></li><li><strong>useLpToken: 用作构建lp合约对象</strong></li><li><strong>useNftToken: 用作构建nft合约对象</strong></li></ul><p>以上 hook 需要传入 合约地址 和 abi，动态生成合约对象</p><p>以上 hook 已经写好一些比较常用的方法，如果你使用的方法不在这里面，可以自行添加上去。</p><h2 id="除了上述3个合约之外-其他合约需要最好自行新建一个文件-去构建自己的合约对象" tabindex="-1">除了上述3个合约之外，其他合约需要最好自行新建一个文件，去构建自己的合约对象 <a class="header-anchor" href="#除了上述3个合约之外-其他合约需要最好自行新建一个文件-去构建自己的合约对象" aria-label="Permalink to &quot;除了上述3个合约之外，其他合约需要最好自行新建一个文件，去构建自己的合约对象&quot;">​</a></h2><p>比如<code>@/contractsApi/useStakeContractApi.ts</code>这个文件。</p><h2 id="栗子" tabindex="-1">栗子： <a class="header-anchor" href="#栗子" aria-label="Permalink to &quot;栗子：&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { STAKE_CONT } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/contracts/address&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useAppStore } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@store/appStore&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> i18n </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/locales/i18n&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> useDefaultRpc </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./useDefaultRpc&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { bpFormat, bpMul } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/utils/bpMath&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { bpRead, bpWrite } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/service/bpAction&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { watchAccount } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/hooks/useAction&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { reactive, Ref, ref } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">$t</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> i18n.global.t;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">appStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useAppStore</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">created</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 合约对象是否构建完</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">stakeObj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">&gt;({}); </span><span style="color:#6A737D;">// 代币合约对象</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">decimals</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 代币精度</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 构建质押合约对象</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createContract</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">signer</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useDefaultRpc</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 使用rpc节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      stakeObj.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> appStore.ethersObj.ethers.</span><span style="color:#B392F0;">Contract</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">STAKE_CONT</span><span style="color:#E1E4E8;">.address,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">STAKE_CONT</span><span style="color:#E1E4E8;">.abi,</span></span>
<span class="line"><span style="color:#E1E4E8;">        signer</span></span>
<span class="line"><span style="color:#E1E4E8;">      );</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (error) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;构建质押合约对象失败&#39;</span><span style="color:#E1E4E8;">, error);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    created.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> stakeObj;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">createContract</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 添加钱包监听</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">watchAccount</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">createContract</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useInfo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">resp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">bpRead</span><span style="color:#E1E4E8;">(stakeObj.value.userInfo, appStore.defaultAccount);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">userInfo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">resp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">bpRead</span><span style="color:#E1E4E8;">(stakeObj.value.userInfo, appStore.defaultAccount);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">resp.status) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> resp;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 质押挖矿</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">amount</span><span style="color:#6A737D;"> 质押数量</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">inv</span><span style="color:#6A737D;"> 邀请人</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stake</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">amount</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BigNumStr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">inv</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">cloneAmount</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">bpMul</span><span style="color:#E1E4E8;">(amount, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">**</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">status</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">bpWrite</span><span style="color:#E1E4E8;">({ success: </span><span style="color:#B392F0;">$t</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;msg.12&#39;</span><span style="color:#E1E4E8;">) }, stakeObj.value.stake, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      value: cloneAmount,</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> status;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    created,</span></span>
<span class="line"><span style="color:#E1E4E8;">    userInfo,</span></span>
<span class="line"><span style="color:#E1E4E8;">    createContract,</span></span>
<span class="line"><span style="color:#E1E4E8;">    stake,</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { STAKE_CONT } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/contracts/address&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useAppStore } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@store/appStore&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> i18n </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/locales/i18n&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> useDefaultRpc </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./useDefaultRpc&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { bpFormat, bpMul } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/utils/bpMath&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { bpRead, bpWrite } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/service/bpAction&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { watchAccount } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/hooks/useAction&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { reactive, Ref, ref } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">$t</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> i18n.global.t;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">appStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useAppStore</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">created</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 合约对象是否构建完</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">stakeObj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">&gt;({}); </span><span style="color:#6A737D;">// 代币合约对象</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">decimals</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">number</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">18</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 代币精度</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 构建质押合约对象</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createContract</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">signer</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useDefaultRpc</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 使用rpc节点</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      stakeObj.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> appStore.ethersObj.ethers.</span><span style="color:#6F42C1;">Contract</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">STAKE_CONT</span><span style="color:#24292E;">.address,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">STAKE_CONT</span><span style="color:#24292E;">.abi,</span></span>
<span class="line"><span style="color:#24292E;">        signer</span></span>
<span class="line"><span style="color:#24292E;">      );</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (error) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;构建质押合约对象失败&#39;</span><span style="color:#24292E;">, error);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    created.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> stakeObj;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">createContract</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 添加钱包监听</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">watchAccount</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">createContract</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useInfo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">resp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bpRead</span><span style="color:#24292E;">(stakeObj.value.userInfo, appStore.defaultAccount);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">userInfo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">resp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bpRead</span><span style="color:#24292E;">(stakeObj.value.userInfo, appStore.defaultAccount);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">resp.status) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> resp;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 质押挖矿</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">amount</span><span style="color:#6A737D;"> 质押数量</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">inv</span><span style="color:#6A737D;"> 邀请人</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stake</span><span style="color:#24292E;">(</span><span style="color:#E36209;">amount</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BigNumStr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">inv</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">cloneAmount</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bpMul</span><span style="color:#24292E;">(amount, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">**</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">status</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bpWrite</span><span style="color:#24292E;">({ success: </span><span style="color:#6F42C1;">$t</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;msg.12&#39;</span><span style="color:#24292E;">) }, stakeObj.value.stake, {</span></span>
<span class="line"><span style="color:#24292E;">      value: cloneAmount,</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> status;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    created,</span></span>
<span class="line"><span style="color:#24292E;">    userInfo,</span></span>
<span class="line"><span style="color:#24292E;">    createContract,</span></span>
<span class="line"><span style="color:#24292E;">    stake,</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h4 id="如果你使用vscode-可以添加下面自定义代码片段" tabindex="-1">如果你使用vsCode，可以添加下面自定义代码片段： <a class="header-anchor" href="#如果你使用vscode-可以添加下面自定义代码片段" aria-label="Permalink to &quot;如果你使用vsCode，可以添加下面自定义代码片段：&quot;">​</a></h4><pre><code>		&quot;useApi&quot;: {
			&quot;prefix&quot;: &quot;useapi&quot;, // 触发的关键字
			&quot;body&quot;: [
				&quot;import { \${1} } from &#39;@/contracts/address&#39;;&quot;,
				&quot;import { useAppStore } from &#39;@store/appStore&#39;;&quot;,
				&quot;import i18n from &#39;@/locales/i18n&#39;;&quot;,
				&quot;import useDefaultRpc from &#39;./useDefaultRpc&#39;;&quot;,
				&quot;import { bpFormat, bpMul } from &#39;@/utils/bpMath&#39;;&quot;,
				&quot;import { bpRead, bpWrite } from &#39;@/service/bpAction&#39;;&quot;,
				&quot;import { watchAccount } from &#39;@/hooks/useAction&#39;;&quot;,
				&quot;import { ref } from &#39;vue&#39;;&quot;,
				&quot;&quot;,
				&quot;const $t = i18n.global.t;&quot;,
				&quot;export default () =&gt; {&quot;,
				&quot;const appStore = useAppStore();&quot;,
				&quot;const created = ref&lt;boolean&gt;(false); // 合约对象是否构建完&quot;,
				&quot;const \${2} = ref&lt;any&gt;({}); // 代币合约对象&quot;,
				&quot;const decimals = ref&lt;number&gt;(18); // 代币精度&quot;,
				&quot;&quot;,
				&quot;/**&quot;,
				&quot; * 构建质押合约对象&quot;,
				&quot; */&quot;,
				&quot;async function createContract() {&quot;,
				&quot;  const signer = useDefaultRpc();&quot;,
				&quot;  try {&quot;,
				&quot;     \${2}.value = new appStore.ethersObj.ethers.Contract(&quot;,
				&quot;     \${1}.address,&quot;,
				&quot;     \${1}.abi,&quot;,
				&quot;     signer&quot;,
				&quot;   );&quot;,
				&quot;  } catch (error) {&quot;,
				&quot;   console.log(&#39;构建\${2}合约对象失败&#39;, error);&quot;,
				&quot;  }&quot;,
				&quot;    created.value = true;&quot;,
				&quot;    return \${2};&quot;,
				&quot;  }&quot;,
				&quot;  createContract();&quot;,
				&quot;  // 添加钱包监听&quot;,
				&quot;  watchAccount(() =&gt; {&quot;,
				&quot;    createContract();&quot;,
				&quot;  });&quot;,
				&quot;&quot;,
				&quot;\${3}&quot;,
				&quot;&quot;,
				&quot;  const userInfo = async () =&gt; {&quot;,
				&quot;  const resp = await bpRead(\${2}.value.userInfo, appStore.defaultAccount);&quot;,
				&quot;  if (!resp.status) return;&quot;,
				&quot;    return resp;&quot;,
				&quot;  }&quot;,
				&quot;  return {&quot;,
				&quot;    created,&quot;,
				&quot;    userInfo,&quot;,
				&quot;    createContract,&quot;,
				&quot;  }&quot;,
				&quot; }&quot;,
			],
			&quot;description&quot;: &quot;contractsApi&quot;
		},
</code></pre>`,19),t=[l];function e(c,r,E,y,i,u){return n(),a("div",null,t)}const q=s(o,[["render",e]]);export{A as __pageData,q as default};
