/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 应用标题
   */
  VITE_APP_TITLE: string
  /**
   * 应用端口
   */
  VITE_APP_PORT: number
  /**
   * API基础路径(反向代理)
   */
  VITE_APP_BASE_API: string
  /**
   * 接口地址
   */
  VITE_APP_API_URL: string

  /**
   * 是否启用Mock
   */
  VITE_MOCK_DEV_SERVER?: boolean
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>
}

/** 处理后的环境变量（全局可用） */
/** 原生读取出的环境变量经过处理后的类型 src 下任意位置可用此访问 类比 __dirname 使用 */
declare const __RUNTIME_CONFIG__: ViteEnv
