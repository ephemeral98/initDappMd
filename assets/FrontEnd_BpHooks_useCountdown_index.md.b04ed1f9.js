import{_ as n,o as a,c as o,k as s,a as l,Q as t}from"./chunks/framework.9dd9ad44.js";const C=JSON.parse('{"title":"倒计时","description":"","frontmatter":{},"headers":[],"relativePath":"FrontEnd/BpHooks/useCountdown/index.md","filePath":"FrontEnd/BpHooks/useCountdown/index.md","lastUpdated":1693989405000}'),p={name:"FrontEnd/BpHooks/useCountdown/index.md"},e=s("h1",{id:"倒计时",tabindex:"-1"},[l("倒计时 "),s("a",{class:"header-anchor",href:"#倒计时","aria-label":'Permalink to "倒计时"'},"​")],-1),c=s("table",null,[s("thead",null,[s("tr",null,[s("th",null,"说明"),s("th",null,"参数类型"),s("th",null,"描述")])]),s("tbody",null,[s("tr",null,[s("td",null,"参数 1"),s("td",null,"Ref"),s("td",null,"距离倒计时开始的时间 (毫秒)")]),s("tr",null,[s("td",null,"参数 2"),s("td",null,"Ref"),s("td",null,"距离倒计时结束的时间 (毫秒)")]),s("tr",null,[s("td",null,"参数 3"),s("td",null,"string"),s("td",null,"是以什么格式显示（ Y:年、M:月、D:日、h:时、m:分、s:秒）")]),s("tr",null,[s("td",null,"参数 4"),s("td",{onFinish:""}),s("td",null,"倒计时结束的回调")])])],-1),r=t(`<h3 id="具体描述" tabindex="-1">具体描述 <a class="header-anchor" href="#具体描述" aria-label="Permalink to &quot;具体描述&quot;">​</a></h3><ol><li>组件会根据 2 个时间判断, 抛出一个时间状态 countingStatus</li><li>如果时间没有到达开始时间，则可以显示当前时间到 <strong>达开始时间</strong> 的倒计时</li><li>如果过了开始时间，并且没有到达结束时间，则可显示当前时间到达 <strong>结束时间</strong> 的倒计时</li><li>如果超过了结束时间，则可显示 <strong>已结束</strong></li></ol><h4 id="countingstatus-当前倒计时状态" tabindex="-1">countingStatus（当前倒计时状态） <a class="header-anchor" href="#countingstatus-当前倒计时状态" aria-label="Permalink to &quot;countingStatus（当前倒计时状态）&quot;">​</a></h4><table><thead><tr><th>状态</th><th>说明</th></tr></thead><tbody><tr><td>notStart</td><td>还没有开始</td></tr><tr><td>expired</td><td>已经超时</td></tr><tr><td>counting</td><td>倒计时进行中</td></tr></tbody></table><p>可根据倒计时状态显示不同的模板</p><h3 id="注意" tabindex="-1">注意： <a class="header-anchor" href="#注意" aria-label="Permalink to &quot;注意：&quot;">​</a></h3><p>第一个参数 times，如果不是 <code>Ref</code>，则可以使用 <code>computed</code> 包装成 <code>Ref</code></p><h3 id="使用方法" tabindex="-1">使用方法 <a class="header-anchor" href="#使用方法" aria-label="Permalink to &quot;使用方法&quot;">​</a></h3><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">startTime</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">computed</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> props.startTime);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">endTime</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">computed</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> props.endTime);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">countdownTime</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">coutingStatus</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useCountdown</span><span style="color:#E1E4E8;">(startTime, endTime, </span><span style="color:#9ECBFF;">&#39;D&#39;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">startTime</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">computed</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> props.startTime);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">endTime</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">computed</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> props.endTime);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">countdownTime</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">coutingStatus</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useCountdown</span><span style="color:#24292E;">(startTime, endTime, </span><span style="color:#032F62;">&#39;D&#39;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>倒计时结束后可以执行一个 callback</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">countdownTime</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useCountdown</span><span style="color:#E1E4E8;">(startTime, endTime, </span><span style="color:#9ECBFF;">&#39;D&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onFinish</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;倒计时结束&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">countdownTime</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useCountdown</span><span style="color:#24292E;">(startTime, endTime, </span><span style="color:#032F62;">&#39;D&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onFinish</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;倒计时结束&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h3 id="源码" tabindex="-1">源码： <a class="header-anchor" href="#源码" aria-label="Permalink to &quot;源码：&quot;">​</a></h3><p><a href="./source">hook 源码</a></p>`,13),i=[e,c,r];function d(E,y,u,h,F,m){return a(),o("div",null,i)}const _=n(p,[["render",d]]);export{C as __pageData,_ as default};
