export default {
  //多扩展名匹配
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.{cjs,json}': ['prettier --write'],
  //匹配vue文件
  '*.{vue,html}': ['prettier --write', 'eslint --fix', 'stylelint --fix'],
  //匹配CSS,SCSS,less,styl文件
  '*.{css,scss,less,styl,html}': ['prettier --write', 'stylelint --fix'],
  //匹配Markdown文件
  '*.md': ['prettier --write'],
}
