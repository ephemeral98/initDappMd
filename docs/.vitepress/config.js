import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'bp-dapp',
  description: 'BlockPulse Decentralization Application',
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: '关闭图标(BpClose)', link: '/BpClose' },
          { text: '表单组件(BpForm)', link: '/BpForm' },
          { text: '选项卡组件(BpTab)', link: '/BpTab' },
          { text: '全局转圈圈(GlobalLoading)', link: '/GlobalLoading' },
          { text: '指针光标组件(MousePoint)', link: '/MousePoint' },
          { text: '开屏动画(Welcome)', link: '/Welcome' },
          { text: 'Swiper(BpSwiper)', link: '/BpSwiper' },
        ],
        collapsible: true,
        collapsed: false,
      },
    ],
  },
});
