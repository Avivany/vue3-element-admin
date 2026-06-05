// import i18n from '@/locales'
// /**
//  * 判断翻译是否存在，存在并返回翻译值
//  *
//  */
// export const translationLangValue = (value: string, prefix: string) => {
//   const { t, te } = i18n.global
//   const isExist = te(`${prefix}.` + value)
//   if (isExist) {
//     return t(`${prefix}.` + value)
//   }
// }
// /**
//  * 判断是否是外链
//  */
// export const isExternalLinks = (path: string): boolean => {
//   if (!path || typeof path !== 'string') return false
//   return /^(https?:|http?:|mailto:|tel:|\/\/)/i.test(path)
// }

// /**
//  * 过滤菜单:如需要隐藏的：hidden：true
//  */
// export const filterShowRoutes = (menuList: Menu.MenuItem[]) => {
//   return (menuList || []).filter((route) => {
//     if (route.children?.length) route.children = filterShowRoutes(route.children)
//     return !route.meta?.hidden
//   })
// }
// /**
//  * 递归打平嵌套路由，消除 children 层级
//  * @param routes 原始嵌套路由数组
//  * @param parentPath 父路由路径（用于拼接子路由路径，内部递归使用，外部调用无需传递）
//  * @param parentMeta 父路由元信息（用于继承父路由 meta，可选）
//  * @returns 扁平后的一级路由数组
//  */
// export const flattenRoutes = (
//   routes: Menu.MenuItem[],
//   parentPath = '',
//   parentMeta: Record<string, unknown> = {},
// ): Menu.MenuItem[] => {
//   let flatRoutes: Menu.MenuItem[] = []
//   ;(routes || []).forEach((route) => {
//     // 1. 拼接完整路径
//     const fullPath = getCombinedPath(parentPath, route.path)

//     // 2. 继承并合并父路由 meta（子路由 meta 优先级高于父路由）
//     const mergedMeta = { ...parentMeta, ...route.meta }
//     // 3. 构造扁平后的路由项（剔除 children 属性，后续递归处理）
//     const flatRoute: Menu.MenuItem = {
//       path: route.path,
//       fullPath: fullPath,
//       name: route.name,
//       redirect: route.redirect,
//       component: route.component,
//       meta: mergedMeta,
//     }

//     flatRoutes.push(flatRoute)

//     //递归处理当前路由的 children 子路由
//     if (route.children && route.children.length > 0) {
//       const childFlatRoutes = flattenRoutes(route.children, fullPath, mergedMeta)
//       flatRoutes = flatRoutes.concat(childFlatRoutes)
//     }
//   })
//   return flatRoutes
// }
// /**
//  * 辅助函数：拼接父路径和子路径，处理边界情况（如 /parent + /child = /parent/child，/parent + child = /parent/child）
//  * @param parentPath 父路由路径
//  * @param childPath 子路由路径
//  * @returns 拼接后的完整路径
//  */
// export const getCombinedPath = (parentPath: string, childPath: string): string => {
//   // 处理子路径是绝对路径的情况
//   if (childPath.startsWith('/')) {
//     return childPath
//   }

//   // 处理父路径是空字符串（根路由）的情况
//   if (!parentPath) {
//     return childPath.startsWith('/') ? childPath : `/${childPath}`
//   }

//   // 常规拼接：父路径末尾去 /，子路径开头不去 /，拼接后加 /
//   const normalizedParentPath = parentPath.endsWith('/') ? parentPath.slice(0, -1) : parentPath
//   return `${normalizedParentPath}/${childPath}`
// }
