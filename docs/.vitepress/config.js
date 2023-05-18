import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'bp-dapp',
  description: 'BlockPulse Decentralization Application',
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'BpButton', link: '/BpButton/index' },
          { text: '关闭图标(BpClose)', link: '/BpClose/index' },
          {
            text: '表单组件(BpForm)', link: '/BpForm/index',
            items: [
              {
                text: '表单组件(源码)', link: '/BpForm/source'
              }
            ],
            collapsed: true,
          },
          {
            text: '选项卡组件(BpTab)', link: '/BpTab/index',
            items: [
              {
                text: '横向选项卡组件(源码)', link: '/BpTab/source',
              },
              {
                text: '纵向选项卡组件(源码)', link: '/BpTab/colSource',
              },
            ],
            collapsed: true,
          },
          {
            text: '全局转圈圈(GlobalLoading)', link: '/GlobalLoading/index',
            items: [
              { text: '全局转圈圈(源码)', link: '/GlobalLoading/source' },
            ],
            collapsed: true,
          },
          {
            text: '指针光标组件(MousePoint)', link: '/MousePoint/index',
            items: [
              { text: '指针光标组件(源码)', link: '/MousePoint/source' },
            ],
            collapsed: true,
          },
          {
            text: '开屏动画(Welcome)', link: '/Welcome/index',
            items: [
              { text: '开屏动画(源码)', link: '/Welcome/source', }
            ],
            collapsed: true,
          },
          {
            text: 'Swiper(BpSwiper)', link: '/BpSwiper/index',
            items: [
              {
                text: 'BpSwiper(源码)', link: '/BpSwiper/source'
              }
            ],
            collapsed: true,
          },
          {
            text: '倒计时(Countdown)', link: '/Countdown/index',
            items: [
              {
                text: '离开始与离结束(组件)(源码)', link: '/Countdown/source'
              },
              {
                text: 'useCountdown(源码)', link: '/Countdown/hookSource'
              }
            ],
            collapsed: true,
          },
        ],
        collapsible: true,
        collapsed: false,
      },
    ],
  },
});
