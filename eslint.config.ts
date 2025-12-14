//ESlint基础配置
import js from '@eslint/js'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
//Typescript 支持
import tseslint from 'typescript-eslint'
//Vue支持
import pluginVue from 'eslint-plugin-vue'

//

// 代码风格与格式化
import eslintConfigPrettier from 'eslint-config-prettier'

// 解析自动导入配置
import fs from 'node:fs'
let autoImportGlobals = {}
try {
  autoImportGlobals =
    JSON.parse(fs.readFileSync('./.eslintrc-auto-import.json', 'utf-8')).globals || {}
} catch (error) {
  // 文件不存在或解析错误时使用空对象
  console.warn('Could not load auto-import globals', error)
}

export default defineConfig([
  globalIgnores(['**/dist/**', '**/node_modules/**', '**/auto-imports.d.ts', '**/components.d.ts']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...autoImportGlobals,
      },
    },
    //配置规则：https://typescript-eslint.nodejs.cn/
    rules: {
      // 禁止 any 类型
      '@typescript-eslint/no-explicit-any': 'off',
      //禁止空函数.
      '@typescript-eslint/no-empty-function': 'off',
      //禁止意外使用 "空对象" 类型.
      '@typescript-eslint/no-empty-object-type': 'warn',
      //禁止 @ts-<directive> 注释或要求指令后有描述.
      '@typescript-eslint/ban-ts-comment': 'off',
      //禁止使用 ! 后缀运算符进行非空断言.
      // '@typescript-eslint/no-non-null-assertion': 'off',
      //不允许未使用的变量.
      // '@typescript-eslint/no-unused-vars': 'warn', // 降级为警告
      //不允许未使用的表达式.
      '@typescript-eslint/no-unused-expressions': 'warn', // 降级为警告
      //强制一致使用类型导入
      // '@typescript-eslint/consistent-type-imports': 'off',
      //当仅导入时，强制使用顶层导入类型限定符具有内联类型限定符的说明符
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  //配置规则： https://eslint.vuejs.ac.cn/rules/
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      // 关闭组件命名规则
      'vue/multi-word-component-names': 'off',
      //强制有效的 v-for 指令
      'vue/valid-v-for': 'warn',
      // 禁止 v-for 指令或作用域属性的变量定义未使用
      'vue/no-unused-vars': 'error',
      // 禁止修改组件 props
      'vue/no-mutating-props': 'off',
      //
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      //在模板中强制组件命名风格的大小写
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      //禁止不规则空格
      'no-irregular-whitespace': 'off',
    },
  },
  eslintConfigPrettier,
])
