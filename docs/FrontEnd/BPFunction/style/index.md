# 关于css

## 使用 unocss + scss

- 超过750px的屏幕，项目默认1rem即1px

配合unocss的简写：

```html
<div class="w-100"></div>
```

== **注意：** 这样不是 unocss 默认的 w-100，而是 100rem ==

这样即 width: 100rem; 当屏幕超过 750px的时候，即 width: 100px;

其他详情可以查看 unocss.config.ts

