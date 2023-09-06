import components from './FrontEndBar/components'
import middleware from './BackEndBar/middleware'
import backEndFunc from './BackEndBar/function'
import fontEndFunc from './FrontEndBar/fontEndFunc'
import specialEffect from './FrontEndBar/specialEffect'
import hooks from './FrontEndBar/hooks'

export default {
  '/FrontEnd/': [
    {
      text: '关于前端',
      items: [components, fontEndFunc, specialEffect, hooks],
    },
  ],
  '/BackEnd/': [
    {
      text: '关于后端',
      items: [middleware, backEndFunc],
    },
  ],
  '/FrontBack': [
    {
      text: '关于前后交互',
    },
  ],
}
