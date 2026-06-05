// Block：模块名（命名空间），如 user-card；
// Element：模块内元素，如 user-card__avatar；
// Modifier：元素状态(修饰符)，如 user-card__avatar--large。
/**
 * block 单区块
 *  block__element 区块+元素
 *  block–modifier 区块+修饰符
 *  block__element–-modifier 区块+元素
 */
import namespaceModule from './css-module/namespace.module.scss'

/**
 *
 * @param block ，用于声明组件的命名空间
 * @param namespaceOverrides 自定义命名空间
 */

export const useNamespace = (block: string = '', namespaceOverrides?: string) => {
  const finalNamespace = (namespaceOverrides ?? namespaceModule.namespace) as string
  const elNamespace = namespaceModule.elNamespace as string

  /**
   * 创建 BEM 元素
   * console.log(createBem('el', 'button', 'icon', 'text', 'primary'));
   * 输出：el-button-icon__text--primary
   */
  const createBem = (
    namespace: string,
    block: string,
    blockSuffix?: string,
    element?: string,
    modifier?: string,
  ) => {
    const space = `${namespace}-${block}`
    return (
      space +
      [
        blockSuffix ? `-${blockSuffix}` : '',
        element ? `__${element}` : '',
        modifier ? `--${modifier}` : '',
      ]
        .filter(Boolean)
        .join('')
    )
  }

  const b = (blockSuffix?: string) => {
    return createBem(finalNamespace, block, blockSuffix)
  }

  const e = (element: string) => {
    return createBem(finalNamespace, block, '', element)
  }

  const m = (modifier: string) => {
    return createBem(finalNamespace, block, '', '', modifier)
  }

  const be = (blockSuffix: string, element: string) => {
    return createBem(finalNamespace, block, blockSuffix, element)
  }

  const bm = (blockSuffix: string, modifier: string) => {
    return createBem(finalNamespace, block, blockSuffix, '', modifier)
  }

  const em = (element: string, modifier: string) => {
    return createBem(finalNamespace, block, '', element, modifier)
  }

  const bem = (blockSuffix: string, element: string, modifier: string) => {
    return createBem(finalNamespace, block, blockSuffix, element, modifier)
  }

  const is = (name: string, bool = true) => {
    return bool ? `is-${name}` : ''
  }

  const has = (name: string, bool = true) => {
    return bool ? `has-${name}` : ''
  }

  const no = (name: string, bool = true) => {
    return bool ? `no-${name}` : ''
  }

  const join = (scope?: string) => {
    return `${finalNamespace}-${scope}`
  }
  //拼接 element plus 命名空间
  const joinEl = (scope?: string) => {
    return `${elNamespace}-${scope}`
  }

  //定义css变量名称
  const cssVarName = (name: string) => `--${finalNamespace}-${name}`
  const cssVar = (name: string) => `var(${cssVarName(name)})`

  //el
  const cssElVarName = (name: string) => `--${elNamespace}-${name}`
  const cssElVar = (name: string) => `var(${cssElVarName(name)})`

  return {
    createBem,
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
    has,
    no,

    //css
    cssVarName,
    cssVar,
    cssElVarName,
    cssElVar,

    //拼接命名空间
    join,
    joinEl,

    //命名空间
    namespace: finalNamespace,
    elNamespace: elNamespace,

    //css 原始命名信息
    namespaceModule,
  }
}
