import{_ as s,o as t,c as n,Q as e}from"./chunks/framework.9dd9ad44.js";const h=JSON.parse('{"title":"全局数据的共享","description":"","frontmatter":{},"headers":[],"relativePath":"FrontEnd/BPFunction/store/index.md","filePath":"FrontEnd/BPFunction/store/index.md","lastUpdated":1693985327000}'),a={name:"FrontEnd/BPFunction/store/index.md"},o=e(`<h1 id="全局数据的共享" tabindex="-1">全局数据的共享 <a class="header-anchor" href="#全局数据的共享" aria-label="Permalink to &quot;全局数据的共享&quot;">​</a></h1><p>使用的是 pinia 工具库。</p><h2 id="appstore" tabindex="-1">appStore <a class="header-anchor" href="#appstore" aria-label="Permalink to &quot;appStore&quot;">​</a></h2><h4 id="主要作用" tabindex="-1">主要作用： <a class="header-anchor" href="#主要作用" aria-label="Permalink to &quot;主要作用：&quot;">​</a></h4><ul><li>处理与连接钱包相关</li><li>处理屏幕环境相关</li><li>处理多语言</li><li>全局通讯</li></ul><h2 id="其他-store" tabindex="-1">其他 store <a class="header-anchor" href="#其他-store" aria-label="Permalink to &quot;其他 store&quot;">​</a></h2><p>建议格式不要使用<code>options api</code>，而使用<code>composition api</code>, 这样更容易混入<code>useRead</code>这种hook。</p><p>如果你使用vsCode，可以添加下面代码片段快速生成一个store:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&quot;pinia&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;prefix&quot;: &quot;pinia&quot;, // 触发的关键字</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;body&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;import { defineStore, storeToRefs } from &#39;pinia&#39;;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;import { useRead } from &#39;@/hooks/useAction&#39;;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;const use\${2} = defineStore(&#39;\${1}&#39;, () =&gt; {&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;   \${3}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;  return {&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;     &quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;  };&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;});&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;export default use\${2};&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">		],</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;description&quot;: &quot;create pinia&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&quot;pinia&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;prefix&quot;: &quot;pinia&quot;, // 触发的关键字</span></span>
<span class="line"><span style="color:#24292e;">		&quot;body&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">			&quot;import { defineStore, storeToRefs } from &#39;pinia&#39;;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;import { useRead } from &#39;@/hooks/useAction&#39;;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;const use\${2} = defineStore(&#39;\${1}&#39;, () =&gt; {&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;   \${3}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;  return {&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;     &quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;  };&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;});&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;export default use\${2};&quot;,</span></span>
<span class="line"><span style="color:#24292e;">		],</span></span>
<span class="line"><span style="color:#24292e;">		&quot;description&quot;: &quot;create pinia&quot;</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span></code></pre></div>`,9),p=[o];function l(i,c,r,u,q,d){return t(),n("div",null,p)}const _=s(a,[["render",l]]);export{h as __pageData,_ as default};
