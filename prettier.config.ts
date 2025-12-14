/**
 * https://prettier.nodejs.cn/
 */
export default {
  //是否在语句末尾添加分号
  "semi": false,
  // 使用单引号而不是双引号
  "singleQuote": true,
   // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
  "trailingComma": "all",
  // 一行最多多少个字符
  "printWidth": 100,
  // 指定每个缩进级别的空格数
  "tabWidth": 2,
  // 使用制表符而不是空格缩进行
  "useTabs": false,
  // 在对象文字中的括号之间打印空格
  "bracketSpacing": true,
  // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
  "arrowParens": "always",
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  "endOfLine": "lf",
  // 在JSX中使用单引号而不是双引号
  "jsxSingleQuote": false,

  "singleAttributePerLine": false,
  // 指定HTML文件的全局空格敏感度 css\strict\ignore
  "htmlWhitespaceSensitivity": "ignore",
  // 使用默认的折行标准 always\never\preserve
  "proseWrap": "never",
  // Vue 文件中的 <script> 和 <style> 不增加额外的缩进
  "vueIndentScriptAndStyle": false,

  // 是否使用根目录下的EditorConfig配置文件
  "useEditorConfig": true,
  // 对 HTML 文件应用特定格式化规则
  "overrides": [
    {
      "files": ["*.json", "*.yml", "*.yaml"],
      "options": { "printWidth": 80 }
    }
  ]
}