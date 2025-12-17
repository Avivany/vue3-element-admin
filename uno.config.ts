import {
  defineConfig,
  presetUno,
  presetIcons,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  type Config,
} from 'unocss'
import globby from 'globby'
import path from 'path'
import fs from 'fs/promises'
import { parseSvg } from '@iconify/utils'

async function loadLocalIcons(dir: string = path.resolve(__dirname, 'src/assets/svgs')) {
  const iconsMap: Record<string, string> = {}
  try {
    const svgFiles = await globby(['**/*.svg'], { cwd: dir })
    for (const file of svgFiles) {
      //解析图标名
      const iconName = file.replace(/\.svg$/, '').replace(/\//g, '-')
      //读取svg内容
      const svgContent = await fs.readFile(path.join(dir, file), 'utf-8')
      const parserSvg = parseSvg(svgContent)
      iconsMap[iconName] = parserSvg.body
    }
  } catch (error) {
    console.log('本地图标加载失败', error)
  }
}

export default defineConfig(
  async (): Promise<Config> => ({
    presets: [
      presetUno(),
      presetIcons({
        //外属性
        scale: 1.2,
        warn: true,
        extraProperties: {
          display: 'inline-block',
          'vertical-align': 'middle',
        },
        collections: {
          //svg图标名称 使用'i-svg:图标名'
          // ep图标库
          ep: () => import('@iconify-json/ep/icons.json').then((i) => i.default),
          //tabler图标库
          tabler: () => import('@iconify-json/tabler/icons.json').then((i) => i.default),
          loacl: async () => ({
            icons: await loadLocalIcons(),
            prefix: 'i-local-', //图标类名前缀
          }),
        },
      }),
      presetWebFonts({}),
    ],
    variants: [],
    shortcuts: {
      'flex-center': 'flex justify-center items-center',
      'flex-center-x': 'flex justify-center',
      'flex-center-y': 'flex items-center',
    },
    rules: [],
    transformers: [transformerDirectives(), transformerVariantGroup()],
  }),
)
