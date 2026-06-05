//定义css变量的命名空间
export type ScssVariables = {
  //自定义Block 节点
  namespace: string
  //元素前缀
  elNamespace: string
} & { [key: string]: unknown }

export const variables: ScssVariables
export default variables
