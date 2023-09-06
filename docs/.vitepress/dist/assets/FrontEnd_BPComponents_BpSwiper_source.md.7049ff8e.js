import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.9dd9ad44.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"FrontEnd/BPComponents/BpSwiper/source.md","filePath":"FrontEnd/BPComponents/BpSwiper/source.md","lastUpdated":1693985327000}'),l={name:"FrontEnd/BPComponents/BpSwiper/source.md"},o=p(`<h3 id="bpswiper-源码" tabindex="-1">BpSwiper(源码) <a class="header-anchor" href="#bpswiper-源码" aria-label="Permalink to &quot;BpSwiper(源码)&quot;">​</a></h3><h4 id="src-components-bpswiper-bpswipercomp-vue" tabindex="-1">src/components/BpSwiper/BpSwiperComp.vue <a class="header-anchor" href="#src-components-bpswiper-bpswipercomp-vue" aria-label="Permalink to &quot;src/components/BpSwiper/BpSwiperComp.vue&quot;">​</a></h4><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Swiper, useSwiper } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;swiper/vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Pagination, Navigation } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;swiper&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;swiper/css&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;swiper/css/pagination&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;swiper/css/navigation&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 安装的模块【下面小点，左右箭头】</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">modules</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [Pagination, Navigation];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">props</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineProps</span><span style="color:#E1E4E8;">&lt;{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">option</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 混入swiper选项</span></span>
<span class="line"><span style="color:#E1E4E8;">}&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">swiperOptions</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">computed</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    autoplay: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      delay: </span><span style="color:#79B8FF;">3000</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 自动轮播间隔时间</span></span>
<span class="line"><span style="color:#E1E4E8;">      disableOnInteraction: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      pauseOnMouseEnter: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 鼠标移入暂停</span></span>
<span class="line"><span style="color:#E1E4E8;">      reverseDirection: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 往返跑</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    loop: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    speed: </span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//切换过渡速度</span></span>
<span class="line"><span style="color:#E1E4E8;">    mousewheel: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 鼠标滚轮</span></span>
<span class="line"><span style="color:#E1E4E8;">    slidesPerView: </span><span style="color:#9ECBFF;">&#39;auto&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//设置slider容器能够同时显示的slides数量(carousel模式)。另外，支持&#39;auto&#39;值，会根据容器container的宽度调整slides数目。</span></span>
<span class="line"><span style="color:#E1E4E8;">    centeredSlides: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//设置slide居中</span></span>
<span class="line"><span style="color:#E1E4E8;">    spaceBetween: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 每个item的间距，也可以用scss穿透实现</span></span>
<span class="line"><span style="color:#E1E4E8;">    coverflowEffect: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      rotate: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//slide做3d旋转时Y轴的旋转角度。默认50。</span></span>
<span class="line"><span style="color:#E1E4E8;">      stretch: </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//每个slide之间的拉伸值（距离），越大slide靠得越紧。 默认0。</span></span>
<span class="line"><span style="color:#E1E4E8;">      depth: </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。</span></span>
<span class="line"><span style="color:#E1E4E8;">      modifier: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//depth和rotate和stretch的倍率，相当于 depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。</span></span>
<span class="line"><span style="color:#E1E4E8;">      slideShadows: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//开启slide阴影。默认 true。</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    observer: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//修改swiper自己或子元素时，自动初始化swiper</span></span>
<span class="line"><span style="color:#E1E4E8;">    observeParents: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//修改swiper的父元素时，自动初始化swiper</span></span>
<span class="line"><span style="color:#E1E4E8;">    observeSlideChildren: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    a11y: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      prevSlideMessage: </span><span style="color:#9ECBFF;">&#39;Previous slide&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      nextSlideMessage: </span><span style="color:#9ECBFF;">&#39;Next slide&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    initialSlide: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">props.option,</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 主动跳转到指定页</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleSlide</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">page</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  swiperObj.value.</span><span style="color:#B392F0;">slideTo</span><span style="color:#E1E4E8;">(page);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">swiperObj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#B392F0;">defineExpose</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  handleSlide,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#FDAEB7;font-style:italic;">swiper</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:modules</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;modules&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:loop</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.loop&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:autoplay</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.autoplay&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">@swiper</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;(Swiper) =&gt; (swiperObj = Swiper)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:navigation</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.navigation&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:speed</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.speed&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:spaceBetween</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.spaceBetween&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:coverflowEffect</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.coverflowEffect&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:centeredSlides</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.centeredSlides&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:slidesPerView</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.slidesPerView&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:mousewheel</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.mousewheel&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:observer</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.observer&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:observeParents</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.observeParents&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:observeSlideChildren</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.observeSlideChildren&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:centerInsufficientSlides</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.centerInsufficientSlides&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:pagination</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.pagination&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">:initialSlide</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;swiperOptions.initialSlide&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">slot</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">slot</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#FDAEB7;font-style:italic;">swiper</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;scss&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">scoped</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Swiper, useSwiper } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;swiper/vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Pagination, Navigation } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;swiper&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;swiper/css&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;swiper/css/pagination&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;swiper/css/navigation&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 安装的模块【下面小点，左右箭头】</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">modules</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [Pagination, Navigation];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">props</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineProps</span><span style="color:#24292E;">&lt;{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">option</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 混入swiper选项</span></span>
<span class="line"><span style="color:#24292E;">}&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">swiperOptions</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">computed</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    autoplay: {</span></span>
<span class="line"><span style="color:#24292E;">      delay: </span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 自动轮播间隔时间</span></span>
<span class="line"><span style="color:#24292E;">      disableOnInteraction: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      pauseOnMouseEnter: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 鼠标移入暂停</span></span>
<span class="line"><span style="color:#24292E;">      reverseDirection: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 往返跑</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    loop: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    speed: </span><span style="color:#005CC5;">500</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//切换过渡速度</span></span>
<span class="line"><span style="color:#24292E;">    mousewheel: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 鼠标滚轮</span></span>
<span class="line"><span style="color:#24292E;">    slidesPerView: </span><span style="color:#032F62;">&#39;auto&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//设置slider容器能够同时显示的slides数量(carousel模式)。另外，支持&#39;auto&#39;值，会根据容器container的宽度调整slides数目。</span></span>
<span class="line"><span style="color:#24292E;">    centeredSlides: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//设置slide居中</span></span>
<span class="line"><span style="color:#24292E;">    spaceBetween: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 每个item的间距，也可以用scss穿透实现</span></span>
<span class="line"><span style="color:#24292E;">    coverflowEffect: {</span></span>
<span class="line"><span style="color:#24292E;">      rotate: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//slide做3d旋转时Y轴的旋转角度。默认50。</span></span>
<span class="line"><span style="color:#24292E;">      stretch: </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//每个slide之间的拉伸值（距离），越大slide靠得越紧。 默认0。</span></span>
<span class="line"><span style="color:#24292E;">      depth: </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。</span></span>
<span class="line"><span style="color:#24292E;">      modifier: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//depth和rotate和stretch的倍率，相当于 depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。</span></span>
<span class="line"><span style="color:#24292E;">      slideShadows: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//开启slide阴影。默认 true。</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    observer: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//修改swiper自己或子元素时，自动初始化swiper</span></span>
<span class="line"><span style="color:#24292E;">    observeParents: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//修改swiper的父元素时，自动初始化swiper</span></span>
<span class="line"><span style="color:#24292E;">    observeSlideChildren: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    a11y: {</span></span>
<span class="line"><span style="color:#24292E;">      prevSlideMessage: </span><span style="color:#032F62;">&#39;Previous slide&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      nextSlideMessage: </span><span style="color:#032F62;">&#39;Next slide&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    initialSlide: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">props.option,</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 主动跳转到指定页</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleSlide</span><span style="color:#24292E;">(</span><span style="color:#E36209;">page</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  swiperObj.value.</span><span style="color:#6F42C1;">slideTo</span><span style="color:#24292E;">(page);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">swiperObj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">defineExpose</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  handleSlide,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#B31D28;font-style:italic;">swiper</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:modules</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;modules&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:loop</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.loop&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:autoplay</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.autoplay&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">@swiper</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;(Swiper) =&gt; (swiperObj = Swiper)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:navigation</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.navigation&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:speed</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.speed&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:spaceBetween</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.spaceBetween&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:coverflowEffect</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.coverflowEffect&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:centeredSlides</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.centeredSlides&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:slidesPerView</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.slidesPerView&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:mousewheel</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.mousewheel&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:observer</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.observer&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:observeParents</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.observeParents&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:observeSlideChildren</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.observeSlideChildren&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:centerInsufficientSlides</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.centerInsufficientSlides&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:pagination</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.pagination&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:initialSlide</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;swiperOptions.initialSlide&quot;</span></span>
<span class="line"><span style="color:#24292E;">  &gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">slot</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">slot</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#B31D28;font-style:italic;">swiper</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;scss&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">scoped</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h4 id="src-components-bpswiper-index-ts" tabindex="-1">src/components/BpSwiper/index.ts <a class="header-anchor" href="#src-components-bpswiper-index-ts" aria-label="Permalink to &quot;src/components/BpSwiper/index.ts&quot;">​</a></h4><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> BpSwiperVue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./BpSwiperComp.vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { SwiperSlide } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;swiper/vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { App } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">BpSwiper</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">app</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;BpSwiper&#39;</span><span style="color:#E1E4E8;">, BpSwiperVue);</span></span>
<span class="line"><span style="color:#E1E4E8;">    app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;SwiperSlide&#39;</span><span style="color:#E1E4E8;">, SwiperSlide);</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> BpSwiper;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> BpSwiperVue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./BpSwiperComp.vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { SwiperSlide } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;swiper/vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { App } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">BpSwiper</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">(</span><span style="color:#E36209;">app</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;BpSwiper&#39;</span><span style="color:#24292E;">, BpSwiperVue);</span></span>
<span class="line"><span style="color:#24292E;">    app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;SwiperSlide&#39;</span><span style="color:#24292E;">, SwiperSlide);</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> BpSwiper;</span></span></code></pre></div><h4 id="main-ts" tabindex="-1">main.ts <a class="header-anchor" href="#main-ts" aria-label="Permalink to &quot;main.ts&quot;">​</a></h4><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> BpSwiper </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@cps/BpSwiper&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">vueApp</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(BpSwiper)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> BpSwiper </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@cps/BpSwiper&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">vueApp</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(BpSwiper)</span></span></code></pre></div><p>全局声明该组件，这样，就可以全局使用了</p>`,8),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const w=s(l,[["render",t]]);export{u as __pageData,w as default};
