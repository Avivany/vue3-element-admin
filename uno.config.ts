import {
  defineConfig,
  presetIcons,
  presetWebFonts,
  presetTagify,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { globbySync } from 'globby'
import path from 'path'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

/**
 * 同步扫描本地 SVG 图标，生成 FileSystemIconLoader 配置
 */
const svgDir = path.resolve(__dirname, 'src/assets/svgs')
const files = globbySync(['**/*.svg'], {
  cwd: svgDir, // 基于 svg 根目录匹配，
  onlyFiles: true,
})
/**
 * 整理本地图标
 */
const localIcons = () => {
  const icons: Record<string, string[]> = {}
  files.forEach((filePath) => {
    const fileName = path.basename(filePath) // 获取文件名，包括后缀,
    const fileNameWithoutExt = path.parse(fileName).name // 获取去除后缀的文件名
    const folderName = path.basename(path.dirname(filePath)) // 获取文件夹名
    if (!icons[folderName]) {
      icons[folderName] = []
    }
    icons[folderName].push(`i-${folderName}:${fileNameWithoutExt}`)
  })
  return icons
}
/**
 * 读取本地 SVG 目录，获取所有 svg 图标，并按照文件夹分类
 * @returns
 */
const getLocalIconCollections = () => {
  const collections: Record<string, ReturnType<typeof FileSystemIconLoader>> = {}
  files.forEach((filePath) => {
    const folderName = path.dirname(filePath)
    const collectionName = folderName === '.' ? 'default' : folderName

    if (!collections[collectionName]) {
      const iconDir = path.resolve(svgDir, collectionName)
      collections[collectionName] = FileSystemIconLoader(iconDir, (svg) => {
        // 为 SVG 自动添加 fill="currentColor"（方便颜色适配）
        return svg.includes('fill="') ? svg : svg.replace(/^<svg /, '<svg fill="currentColor" ')
      })
    }
  })
  return collections
}
// 同步生成本地图标集合
const localIconCollections = getLocalIconCollections()
// 同步生成安全列表
const generateSafeList = (): string[] => {
  try {
    const icons = localIcons()
    return Object.keys(icons).flatMap((item) => icons[item]) as string[]
  } catch (error) {
    console.error('无法读取图标目录:', error)
    return []
  }
}
export default defineConfig({
  content: {
    filesystem: ['src/**'],
  },
  presets: [
    //标签化 示例：<i-carbon-AssetDigitalTwin/>或 <i-carbon-bottles-01/>
    presetTagify(),
    presetIcons({
      //外属性
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        width: '1em',
        height: '1em',
        'vertical-align': 'middle',
      },
      collections: {
        //svg图标名称 使用'i-svg:图标名'
        // ep图标库
        /***
         * 示例：
         * <i class="i-tabler-align-box-top-center"></i>
         * <i class="i-tabler:air-traffic-control">
         * <i class="i-carbon:barcode"></i>
         */
        ep: () => import('@iconify-json/ep/icons.json').then((i) => i.default),
        //tabler图标库
        tabler: () => import('@iconify-json/tabler/icons.json').then((i) => i.default),
        // 本地图标集
        // <i class="i-pay:pay"></i>
        ...localIconCollections,
      },
    }),
    presetWebFonts({}),
  ],
  // 安全列表
  safelist: generateSafeList(),
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-center-x': 'flex justify-center',
    'flex-center-y': 'flex items-center',
  },
  theme: {
    breakpoints: Object.fromEntries(
      [640, 768, 1024, 1280, 1536, 1920, 2560].map((size, index) => [
        ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'][index],
        `${size}px`,
      ]),
    ),
  },
  rules: [],
  transformers: [
    //处理指令类（如 @apply、@screen、@variants）
    transformerDirectives(),
    //处理变体类的组合（如 hover:bg-red-500、focus:text-white）
    transformerVariantGroup(),
  ],
})
