import { readFileSync } from 'fs'
import { resolve, dirname, isAbsolute } from 'path'
import { transform as svgrTransform } from '@svgr/core'
import { transform as esbuildTransform } from 'esbuild'
import type { StorybookConfig } from '@storybook/nextjs-vite'
import type { Plugin } from 'vite'

const VIRTUAL_PREFIX = '\0svgr:'
const SRC_ROOT = resolve(process.cwd(), 'src')

function resolveAlias(id: string, importer?: string): string | null {
  if (id.startsWith('@/')) return resolve(SRC_ROOT, id.slice(2))
  if (isAbsolute(id)) return id
  if (importer) return resolve(dirname(importer.split('?')[0]), id)
  return null
}

const svgrPlugin: Plugin = {
  name: 'storybook-svgr',
  enforce: 'pre',
  resolveId(id, importer) {
    if (!id.endsWith('.svg')) return null
    const abs = resolveAlias(id, importer)
    if (!abs) return null
    return VIRTUAL_PREFIX + abs
  },
  async load(id) {
    if (!id.startsWith(VIRTUAL_PREFIX)) return null
    const svgPath = id.slice(VIRTUAL_PREFIX.length)
    const svg = readFileSync(svgPath, 'utf-8')
    const jsx = await svgrTransform(svg, {
      plugins: ['@svgr/plugin-jsx'],
      jsx: { runtime: 'automatic' },
    })
    const { code } = await esbuildTransform(jsx, { loader: 'jsx', jsx: 'automatic' })
    return { code, map: null }
  },
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = [svgrPlugin, ...(viteConfig.plugins ?? [])]
    return viteConfig
  },
}

export default config
