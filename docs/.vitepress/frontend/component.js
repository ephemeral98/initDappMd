// 常用组件
export default {
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
      text: '滚动动画',
      link: '/BPComponents/ScrollAnimate/template',
      items: [
        { text: '滚动动画Vue模板', link: '/BPComponents/ScrollAnimate/template' },
        { text: '滚动动画Hook', link: '/BPComponents/ScrollAnimate/hook' },
      ],
      collapsed: true,
    },
  ],
  collapsible: true,
  collapsed: false,
};
