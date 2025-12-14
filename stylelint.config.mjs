export default {
  extends: [
    //Stylelint 标准共享配置
    'stylelint-config-standard',
    //扩展 stylelint-config-recommended 共享配置并为 SCSS 配置其规则
    'stylelint-config-recommended-scss',
    //扩展 stylelint-config-recommended 共享配置并为 Vue 配置其规则
    'stylelint-config-recommended-vue/scss',
    //html配置（支持很多类型文件，具体看源码）
    'stylelint-config-html/vue',
    //属性排序配置
    'stylelint-config-recess-order',
    //prettier配置
    'stylelint-prettier/recommended',
  ],
  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.{css,scss}'],
      customSyntax: 'postcss-scss',
    },
  ],
  plugins: [
    //统一代码风格，格式冲突时以 Prettier 规则为准
    'stylelint-prettier',
  ],
  //自定义规则
  rules: {
    //强制执行 Prettier 格式化规则,配合prettier.config.cjs
    'prettier/prettier': true,
    //允许 global 、export 、v-deep等伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep', 'slotted'],
      },
    ],
    // 允许空的样式文件
    'no-empty-source': true,
    //允许非常规数值格式
    'declaration-property-value-no-unknown': null,
    //禁用默认的未知 at-rule 检查
    'at-rule-no-unknown': null,
    //启用 SCSS 特定的 at-rule 检查
    'scss/at-rule-no-unknown': true,
  },
}
