import{_ as s,c as a,o as t,a as n}from"./app.c736b48a.js";const h=JSON.parse('{"title":"\u5168\u5C40\u6570\u636E\u7684\u5171\u4EAB","description":"","frontmatter":{},"headers":[{"level":2,"title":"appStore","slug":"appstore","link":"#appstore","children":[]},{"level":2,"title":"\u5176\u4ED6 store","slug":"\u5176\u4ED6-store","link":"#\u5176\u4ED6-store","children":[]}],"relativePath":"store.md"}'),e={name:"store.md"},o=n(`<h1 id="\u5168\u5C40\u6570\u636E\u7684\u5171\u4EAB" tabindex="-1">\u5168\u5C40\u6570\u636E\u7684\u5171\u4EAB <a class="header-anchor" href="#\u5168\u5C40\u6570\u636E\u7684\u5171\u4EAB" aria-hidden="true">#</a></h1><p>\u4F7F\u7528\u7684\u662F pinia \u5DE5\u5177\u5E93\u3002</p><h2 id="appstore" tabindex="-1">appStore <a class="header-anchor" href="#appstore" aria-hidden="true">#</a></h2><h4 id="\u4E3B\u8981\u4F5C\u7528" tabindex="-1">\u4E3B\u8981\u4F5C\u7528\uFF1A <a class="header-anchor" href="#\u4E3B\u8981\u4F5C\u7528" aria-hidden="true">#</a></h4><ul><li>\u5904\u7406\u4E0E\u8FDE\u63A5\u94B1\u5305\u76F8\u5173</li><li>\u5904\u7406\u5C4F\u5E55\u73AF\u5883\u76F8\u5173</li><li>\u5904\u7406\u591A\u8BED\u8A00</li><li>\u5168\u5C40\u901A\u8BAF</li></ul><h2 id="\u5176\u4ED6-store" tabindex="-1">\u5176\u4ED6 store <a class="header-anchor" href="#\u5176\u4ED6-store" aria-hidden="true">#</a></h2><p>\u5EFA\u8BAE\u683C\u5F0F\u4E0D\u8981\u4F7F\u7528<code>options api</code>\uFF0C\u800C\u4F7F\u7528<code>composition api</code>, \u8FD9\u6837\u66F4\u5BB9\u6613\u6DF7\u5165<code>useRead</code>\u8FD9\u79CDhook\u3002</p><p>\u5982\u679C\u4F60\u4F7F\u7528vsCode\uFF0C\u53EF\u4EE5\u6DFB\u52A0\u4E0B\u9762\u4EE3\u7801\u7247\u6BB5\u5FEB\u901F\u751F\u6210\u4E00\u4E2Astore:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">   &quot;pinia&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">		&quot;prefix&quot;: &quot;pinia&quot;, // \u89E6\u53D1\u7684\u5173\u952E\u5B57</span></span>
<span class="line"><span style="color:#A6ACCD;">		&quot;body&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;import { defineStore, storeToRefs } from &#39;pinia&#39;;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;import { useRead } from &#39;@/hooks/useAction&#39;;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;const use\${2} = defineStore(&#39;\${1}&#39;, () =&gt; {&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;   \${3}&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;  return {&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;     &quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;  };&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;});&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;export default use\${2};&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">		],</span></span>
<span class="line"><span style="color:#A6ACCD;">		&quot;description&quot;: &quot;create pinia&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	},</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,9),p=[o];function l(r,i,c,u,d,C){return t(),a("div",null,p)}const q=s(e,[["render",l]]);export{h as __pageData,q as default};
