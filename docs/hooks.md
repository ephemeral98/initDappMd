# 常用hooks: @/hooks/*

## useScrollCallback
> 页面滚动时候触发

### useScrollThrottle
节流滚动

栗子：
```
useScrollThrottle(() => {
  console.log('do scroll...');
}, 100);
```

### useScrollBottom
当页面滚动到底部的时候，触发回调

栗子：
```
useScrollBottom(() => {
  console.log('do scroll...');
}, 100);
```
