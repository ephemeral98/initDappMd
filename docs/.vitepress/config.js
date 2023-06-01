import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'bp-dapp',
  description: 'BlockPulse Decentralization Application',
  themeConfig: {
    sidebar: [
      {
        text: '常用组件',
        items: [
          { text: 'BpButton', link: '/BPComponents/BpButton/index' },
          { text: '关闭图标(BpClose)', link: '/BPComponents/BpClose/index' },
          {
            text: '表单组件(BpForm)',
            link: '/BPComponents/BpForm/index',
            items: [
              {
                text: '表单组件(源码)',
                link: '/BPComponents/BpForm/source',
              },
            ],
            collapsed: true,
          },
          {
            text: '选项卡组件(BpTab)',
            link: '/BPComponents/BpTab/index',
            items: [
              {
                text: '横向选项卡组件(源码)',
                link: '/BPComponents/BpTab/source',
              },
              {
                text: '纵向选项卡组件(源码)',
                link: '/BPComponents/BpTab/colSource',
              },
            ],
            collapsed: true,
          },
          {
            text: '转圈圈(BpLoad)',
            link: '/BPComponents/BpLoad/index',
            items: [{ text: '转圈圈(源码)', link: '/BPComponents/BpLoad/source' }],
            collapsed: true,
          },
          {
            text: '指针光标组件(MousePoint)',
            link: '/BPComponents/MousePoint/index',
            items: [{ text: '指针光标组件(源码)', link: '/BPComponents/MousePoint/source' }],
            collapsed: true,
          },
          {
            text: '开屏动画(Welcome)',
            link: '/BPComponents/Welcome/index',
            items: [{ text: '开屏动画(源码)', link: '/BPComponents/Welcome/source' }],
            collapsed: true,
          },
          {
            text: 'Swiper(BpSwiper)',
            link: '/BPComponents/BpSwiper/index',
            items: [
              {
                text: 'BpSwiper(源码)',
                link: '/BPComponents/BpSwiper/source',
              },
            ],
            collapsed: true,
          },
          {
            text: '倒计时(Countdown)',
            link: '/BPComponents/Countdown/index',
            items: [
              {
                text: '离开始与离结束(组件)(源码)',
                link: '/BPComponents/Countdown/source',
              },
              {
                text: 'useCountdown(源码)',
                link: '/BPComponents/Countdown/hookSource',
              },
            ],
            collapsed: true,
          },
        ],
        collapsible: true,
        collapsed: false,
      },
      {
        text: '常用方法',
        items: [
          {
            text: 'allowAccounts',
            link: '/BPFunction/allowAccounts/index',
            items: [{ text: 'allowAccounts源码', link: '/BPFunction/allowAccounts/source' }],
          },
        ],
      },
    ],
  },
});
