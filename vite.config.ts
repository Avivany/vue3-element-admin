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

//mock插件
import { viteMockServe } from 'vite-plugin-mock'

// 平台名称，版本。依赖提示
import { name, version, dependencies, devDependencies } from './package.json'

const __APP_INFO__ = {
  pkg: { name, version, dependencies, devDependencies },
  timesTamp: Date.now(),
}

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  console.log('mode', mode)
  console.log('env', env)
  const isProd = mode === 'production'
  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('i-'),
          },
        },
      }),
      viteMockServe({
        mockPath: resolve(__dirname, './mock'),
        enable: true, // 是否启用 mock 功能
        logger: false, // 是否在控制台显示请求日志
        ignore: /^_/, // 忽略下划线开头的文件
      }),
      UnoCSS({ configFile: './uno.config.ts' /*注意这里的后缀名*/ }),
      AutoImport({
        resolvers: [
          ElementPlusResolver({ importStyle: 'sass' }), //自动导入ElementPlus
          IconsResolver({}), //自动导入图标组件
        ],
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
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
          ElementPlusResolver({ importStyle: 'sass' }),
          IconsResolver({
            enabledCollections: ['ep'], //ep图标库
          }),
        ],
        dirs: ['src/components', 'src/**/components'],
        dts: resolve(resolve(__dirname, 'src'), 'types', 'components.d.ts'), //自动导入组件类型声明文件位置，默认默认根目录
      }),
      Icons({
        autoInstall: true, //自动安装
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/svgs/sys')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@/styles': resolve(__dirname, 'src/common/styles'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: false,
      proxy: {
        // 代理 /dev-api 的请求
        [env.VITE_APP_BASE_API as string]: {
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
          additionalData: `@use "@/common/styles/index.scss" as *;`,
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'element-plus', 'axios', 'vue-i18n'],
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    build: {
      // 触发警告的 chunk 大小。（以 kB 为单位）
      chunkSizeWarningLimit: 2000,
      // 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器, 类型:boolean | 'oxc' | 'terser' | 'esbuild'
      minify: isProd ? 'terser' : false,
      terserOptions: isProd
        ? {
            compress: {
              keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
              drop_console: true, // 生产环境去除 console.log, console.warn, console.error 等
              drop_debugger: true, // 生产环境去除 debugger
              pure_funcs: ['console.log', 'console.info'], // 移除指定的函数调用
            },
            format: {
              comments: false, // 删除注释
            },
          }
        : {},
    },
  }
})
