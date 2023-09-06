import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.9dd9ad44.js";const u=JSON.parse('{"title":"体验一下","description":"","frontmatter":{},"headers":[],"relativePath":"FrontEnd/index.md","filePath":"FrontEnd/index.md","lastUpdated":1693989405000}'),o={name:"FrontEnd/index.md"},l=e(`<h2 id="welcome-frontend" tabindex="-1">Welcome FrontEnd <a class="header-anchor" href="#welcome-frontend" aria-label="Permalink to &quot;Welcome FrontEnd&quot;">​</a></h2><h2 id="运行模式" tabindex="-1">运行模式 <a class="header-anchor" href="#运行模式" aria-label="Permalink to &quot;运行模式&quot;">​</a></h2><h4 id="开发环境" tabindex="-1">开发环境 <a class="header-anchor" href="#开发环境" aria-label="Permalink to &quot;开发环境&quot;">​</a></h4><pre><code>// 使用测试链
yarn dev
// 使用主链
yarn dev:main
</code></pre><h4 id="线上打包环境" tabindex="-1">线上打包环境 <a class="header-anchor" href="#线上打包环境" aria-label="Permalink to &quot;线上打包环境&quot;">​</a></h4><ol><li>打包到根路径</li></ol><pre><code>// 使用测试链
yarn build:test
// 使用主链
yarn build:main
</code></pre><ol start="2"><li>打包到子路径</li></ol><pre><code>// 使用测试链
yarn build:childTest
// 使用主链
yarn build:childMain

// 然后放到直接子路径 名字为: childTest(childMain) 即可。
// 想换子路径名字，请全局修改 childTest(childMain)
// 最后访问 http: http://x.xxx.xxx.xxx/initDapp/#/
</code></pre><hr><h2 id="与合约交互相关" tabindex="-1">与合约交互相关 <a class="header-anchor" href="#与合约交互相关" aria-label="Permalink to &quot;与合约交互相关&quot;">​</a></h2><h3 id="触发方法" tabindex="-1"><a href="/vitepress-demo/FrontEnd/BpHooks/useAction/index">触发方法</a> <a class="header-anchor" href="#触发方法" aria-label="Permalink to &quot;[触发方法](/FrontEnd/BpHooks/useAction/index)&quot;">​</a></h3><ul><li><p>useAction</p><ol><li>useRead</li><li>useWrite</li></ol></li><li><p>bpAction</p><ol><li>bpRead</li><li>bpWrite</li></ol></li></ul><h3 id="构建合约对象方法" tabindex="-1"><a href="/vitepress-demo/FrontEnd/BPFunction/action/index">构建合约对象方法</a> <a class="header-anchor" href="#构建合约对象方法" aria-label="Permalink to &quot;[构建合约对象方法](/FrontEnd/BPFunction/action/index)&quot;">​</a></h3><p>即：@/contractsApi/useXXX.ts 文件</p><hr><h2 id="常用指令" tabindex="-1"><a href="/vitepress-demo/FrontEnd/BPFunction/bpDirective/index">常用指令</a> <a class="header-anchor" href="#常用指令" aria-label="Permalink to &quot;[常用指令](/FrontEnd/BPFunction/bpDirective/index)&quot;">​</a></h2><p>即：@/utils/bpDirective.ts 文件</p><hr><h2 id="关于计算" tabindex="-1"><a href="/vitepress-demo/FrontEnd/BPFunction/bpMath/index">关于计算</a> <a class="header-anchor" href="#关于计算" aria-label="Permalink to &quot;[关于计算](/FrontEnd/BPFunction/bpMath/index)&quot;">​</a></h2><blockquote><p>二次封装 math.js 库，解决 js 精度丢失问题</p></blockquote><hr><h2 id="路由工具" tabindex="-1"><a href="/vitepress-demo/FrontEnd/BPFunction/router/index">路由工具</a> <a class="header-anchor" href="#路由工具" aria-label="Permalink to &quot;[路由工具](/FrontEnd/BPFunction/router/index)&quot;">​</a></h2><p>在一些特别情况下使用 vue-router</p><hr><h2 id="全局状态管理" tabindex="-1"><a href="/vitepress-demo/FrontEnd/BPFunction/store/index">全局状态管理</a> <a class="header-anchor" href="#全局状态管理" aria-label="Permalink to &quot;[全局状态管理](/FrontEnd/BPFunction/store/index)&quot;">​</a></h2><p>使用 pinia 创建的全局状态管理</p><hr><h2 id="关于多语言" tabindex="-1">[关于多语言] <a class="header-anchor" href="#关于多语言" aria-label="Permalink to &quot;\\[关于多语言]&quot;">​</a></h2><h3 id="f" tabindex="-1">$f <a class="header-anchor" href="#f" aria-label="Permalink to &quot;$f&quot;">​</a></h3><p>使用$f包裹的字符串，执行命令脚本，最终会编译成：</p><pre><code>$f(&#39;首页&#39;)  ---&gt;  components.1
</code></pre><h3 id="p" tabindex="-1">$p <a class="header-anchor" href="#p" aria-label="Permalink to &quot;$p&quot;">​</a></h3><p>使用$p包裹的的字符串，执行命令，最终会编译成：</p><pre><code>$p(&#39;首页&#39;) ---&gt;  $t(&#39;components.1&#39;)
</code></pre><p>对应的文案会根据你 输入的保存的文件名字，保存到相应的名字json文件</p><h3 id="执行脚本命令" tabindex="-1">执行脚本命令 <a class="header-anchor" href="#执行脚本命令" aria-label="Permalink to &quot;执行脚本命令&quot;">​</a></h3><h4 id="注意" tabindex="-1">注意： <a class="header-anchor" href="#注意" aria-label="Permalink to &quot;注意：&quot;">​</a></h4><p>需要node版本18以上才行</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 如果是yarn </span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rep</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 如果是npm</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rep</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 如果是yarn </span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rep</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 如果是npm</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rep</span></span></code></pre></div><p>弹出输入框后则输入<code>en</code>则表示生成 <code>en.json</code></p><p>然后分别拿着对应的json文件去翻译就可。</p><p>如果想转成excel文档：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">excel</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">excel</span></span></code></pre></div><p>则生成一个excel表格，拿去翻译即可，在第二列输入对应译文，然后再执行</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">json</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">json</span></span></code></pre></div><p>则转回对应的json。</p><hr><h2 id="一些报错总结" tabindex="-1"><a href="/vitepress-demo/FrontEnd/BPFunction/errors/index">一些报错总结</a> <a class="header-anchor" href="#一些报错总结" aria-label="Permalink to &quot;[一些报错总结](/FrontEnd/BPFunction/errors/index)&quot;">​</a></h2><hr><h1 id="体验一下" tabindex="-1">体验一下 <a class="header-anchor" href="#体验一下" aria-label="Permalink to &quot;体验一下&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ethers } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ethers&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">provider</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ethers.providers.</span><span style="color:#B392F0;">Web3Provider</span><span style="color:#E1E4E8;">(window.ethereum, </span><span style="color:#9ECBFF;">&#39;any&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">signer</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> provider.</span><span style="color:#B392F0;">getSigner</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ethers.</span><span style="color:#B392F0;">Contract</span><span style="color:#E1E4E8;">(合约地址, 合约abi, signer);</span></span>
<span class="line"><span style="color:#6A737D;">// obj是合约对象，先看看合约对象有没有你要调的方法</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 比如：授权</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">resp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> obj.</span><span style="color:#B392F0;">approve</span><span style="color:#E1E4E8;">(授权的地址, ethers.constants.MaxUint256);</span></span>
<span class="line"><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> resp?.</span><span style="color:#B392F0;">wait</span><span style="color:#E1E4E8;">?.();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ethers } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ethers&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">provider</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ethers.providers.</span><span style="color:#6F42C1;">Web3Provider</span><span style="color:#24292E;">(window.ethereum, </span><span style="color:#032F62;">&#39;any&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">signer</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> provider.</span><span style="color:#6F42C1;">getSigner</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ethers.</span><span style="color:#6F42C1;">Contract</span><span style="color:#24292E;">(合约地址, 合约abi, signer);</span></span>
<span class="line"><span style="color:#6A737D;">// obj是合约对象，先看看合约对象有没有你要调的方法</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 比如：授权</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">resp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> obj.</span><span style="color:#6F42C1;">approve</span><span style="color:#24292E;">(授权的地址, ethers.constants.MaxUint256);</span></span>
<span class="line"><span style="color:#D73A49;">await</span><span style="color:#24292E;"> resp?.</span><span style="color:#6F42C1;">wait</span><span style="color:#24292E;">?.();</span></span></code></pre></div><h2 id="ps" tabindex="-1">PS: <a class="header-anchor" href="#ps" aria-label="Permalink to &quot;PS:&quot;">​</a></h2><p>由于 vite 使用 js 的 debugger 的时候，总是跳到不准确的地方，所以建议使用 vsCode 打断点：</p><pre><code>{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  &quot;version&quot;: &quot;0.2.0&quot;,
  &quot;configurations&quot;: [
    {
      &quot;name&quot;: &quot;Launch Edge&quot;,
      &quot;request&quot;: &quot;launch&quot;,
      &quot;type&quot;: &quot;chrome&quot;,
      &quot;url&quot;: &quot;http://localhost:3100&quot;, // 写自己的端口号
      &quot;webRoot&quot;: &quot;\${workspaceFolder}/src&quot;,
    },
  ]
}
</code></pre>`,55),p=[l];function t(r,c,i,d,h,y){return a(),n("div",null,p)}const F=s(o,[["render",t]]);export{u as __pageData,F as default};
