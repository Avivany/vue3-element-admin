import { defineConfig, type UserConfig, type ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// vite-plugin-svg-icons 整合本地svg图标，此方法与Unicss图标方式可以2选1
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCSS from 'unocss/vite'

// const pathSrc=resolve(__dirname,"scr");

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  // const isProd=mode==='production'
  return {
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(), //自动导入ElementPlus
          IconsResolver({}), //自动导入图标组件
        ],
        imports: ['vue'],
        vueTemplate: true, //是否在vue模板自动导入
        dts: resolve(resolve(__dirname, 'src'), 'types', 'auto-imports.d.ts'), //自动导入组件类型声明文件位置，默认根目录
        eslintrc: {
          //解决自动导入ESlint报错
          enabled: true, //已存在文件设置默认 false，需要更新时再打开，防止每次更新都重新生成
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep'], //ep图标库
          }),
        ],
        dts: resolve(resolve(__dirname, 'src'), 'types', 'components.d.ts'), //自动导入组件类型声明文件位置，默认默认根目录
      }),
      Icons({
        autoInstall: true, //自动安装
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/svgs')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: false,
      proxy: {
        // 代理 /dev-api 的请求
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          target: env.VITE_APP_API_URL,
          rewrite: (path: string) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },
    css: {
      // css 预处理
      preprocessorOptions: {
        // 定义global scss variable,全局共享的
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
  }
})
