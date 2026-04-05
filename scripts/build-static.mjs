import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = resolve(root, 'dist')

/** 历史 VitePress 导出的静态站（与 yarn preview 所见一致） */
const entries = [
  'index.html',
  '404.html',
  'logo.svg',
  'hashmap.json',
  'assets',
  'FrontEnd',
  'BackEnd',
  'SpecialEffect',
]

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

for (const name of entries) {
  const src = resolve(root, name)
  if (!existsSync(src)) {
    console.warn(`[build-static] 跳过（不存在）: ${name}`)
    continue
  }
  cpSync(src, resolve(dist, name), { recursive: true })
}

console.log('')
console.log('  已输出到 dist/，内容与仓库根目录静态资源一致。')
console.log('  线上需按 base /vitepress-demo/ 部署（同 yarn preview）。')
console.log('')
