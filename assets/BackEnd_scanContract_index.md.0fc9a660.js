import{_ as s,o as a,c as n,Q as o}from"./chunks/framework.9dd9ad44.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"BackEnd/scanContract/index.md","filePath":"BackEnd/scanContract/index.md","lastUpdated":1693989405000}'),l={name:"BackEnd/scanContract/index.md"},p=o(`<h2 id="关于扫块" tabindex="-1">关于扫块 <a class="header-anchor" href="#关于扫块" aria-label="Permalink to &quot;关于扫块&quot;">​</a></h2><h3 id="使用方法" tabindex="-1">使用方法 <a class="header-anchor" href="#使用方法" aria-label="Permalink to &quot;使用方法&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> contractAddress </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;0x9F046b656bdC7De4CE5117f9F4a64B00D4e21BD0&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 合约地址</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> bondHash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;0x92xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxfb44&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 事件的交易哈希</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> stakeHash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxb6&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 事件的交易哈希</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">scanContract </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> contract.ScanContract.</span><span style="color:#79B8FF;">NewScanContract</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">29817410</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">29848268</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4000</span><span style="color:#E1E4E8;">,contractAddress, []</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">{bondHash, stakeHash})</span></span>
<span class="line"><span style="color:#E1E4E8;">scanContract.</span><span style="color:#79B8FF;">Main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(logs []types.Log) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;logs....&quot;</span><span style="color:#E1E4E8;">, logs)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 拿到日志后该干嘛干嘛...</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> contractAddress </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;0x9F046b656bdC7De4CE5117f9F4a64B00D4e21BD0&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 合约地址</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> bondHash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;0x92xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxfb44&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 事件的交易哈希</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> stakeHash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxb6&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 事件的交易哈希</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">scanContract </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> contract.ScanContract.</span><span style="color:#005CC5;">NewScanContract</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">29817410</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">29848268</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4000</span><span style="color:#24292E;">,contractAddress, []</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">{bondHash, stakeHash})</span></span>
<span class="line"><span style="color:#24292E;">scanContract.</span><span style="color:#005CC5;">Main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(logs []types.Log) {</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;logs....&quot;</span><span style="color:#24292E;">, logs)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 拿到日志后该干嘛干嘛...</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div>`,3),t=[p];function x(e,c,r,E,y,i){return a(),n("div",null,t)}const C=s(l,[["render",x]]);export{F as __pageData,C as default};
