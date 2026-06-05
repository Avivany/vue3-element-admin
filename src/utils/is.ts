// 缓存 toString 方法以提高性能
const toString = Object.prototype.toString

// 更精确的函数类型定义
export type Func<Args extends unknown[] = unknown[], Return = unknown> = (...args: Args) => Return
export type AsyncFunc<Args extends unknown[] = unknown[], Return = unknown> = (
  ...args: Args
) => Promise<Return>

// 获取某个值的类型
export function getValueType(val: unknown): string {
  return toString.call(val).slice(8, -1)
}

// 判断值是否为某个类型（带类型保护）
export function is<T = unknown>(val: unknown, type: string): val is T {
  return toString.call(val) === `[object ${type}]`
}

// 是否已定义
export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

// 是否未定义
export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

// 是否为数值（优化 NaN 检查）
export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !isNaN(val)
}

// 是否为字符串
export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

// 是否为布尔类型
export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

// 是否为数组（更严格的检查）
export function isArray<T = unknown>(val: unknown): val is T[] {
  return Array.isArray(val)
}

// 是否为函数
export function isFunction<T extends Func = Func>(val: unknown): val is T {
  return typeof val === 'function'
}

// 是否为AsyncFunction
export function isAsyncFunction<T = unknown>(val: unknown): val is AsyncFunc<unknown[], T> {
  return is(val, 'AsyncFunction')
}

// 是否为对象（排除数组、函数、null等）
export function isObject(val: unknown): val is Record<string | number | symbol, unknown> {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

// 是否为纯对象（plain object）
export function isPlainObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === 'object' && toString.call(val) === '[object Object]'
}

// 是否为时间
export function isDate(val: unknown): val is Date {
  return val instanceof Date && !isNaN(val.getTime())
}

// 是否为promise（更严格的检查）
export function isPromise<T = unknown>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

// 判断是否客户端（更准确）
export const isClient = (): boolean => {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined'
}

// 是否为浏览器窗口对象
export function isWindow(val: unknown): val is Window {
  return typeof window !== 'undefined' && val === window
}

// 是否为 element 元素（更准确）
export function isElement(val: unknown): val is Element {
  if (val == null || typeof val !== 'object') {
    return false
  }

  try {
    // 优先使用 instanceof（最准确），兼容 Element 全局变量存在的场景
    if (typeof Element !== 'undefined' && val instanceof Element) {
      return true
    }

    // 兼容跨 window/iframe 场景：通过 nodeType + nodeName 双重校验
    const elementLike = val as Record<string, unknown>
    // nodeType === 1 是 Element 核心特征，nodeName 需为非空字符串（排除伪对象）
    const hasValidNodeType = typeof elementLike.nodeType === 'number' && elementLike.nodeType === 1
    const hasValidNodeName =
      typeof elementLike.nodeName === 'string' && elementLike.nodeName.length > 0

    return hasValidNodeType && hasValidNodeName
  } catch {
    // 捕获任意异常（如属性不可访问、跨域 iframe 权限问题等）
    return false
  }
}

// 是否为 HTMLElement
export function isHTMLElement(val: unknown): val is HTMLElement {
  return val instanceof HTMLElement
}

// 是否为 null
export function isNull(val: unknown): val is null {
  return val === null
}

// 是否为 null 或 undefined
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return val === null || typeof val === 'undefined'
}

// 是否为 16 进制颜色（支持透明度）
export function isHexColor(str: string): boolean {
  return /^#?([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(str)
}

// 检查值是否为 Map 对象
export function isMap<K = unknown, V = unknown>(val: unknown): val is Map<K, V> {
  return is(val, 'Map')
}

// 检查值是否为 Set 对象
export function isSet<T = unknown>(val: unknown): val is Set<T> {
  return is(val, 'Set')
}

// 是否为空（优化逻辑，添加更多类型支持）
export function isEmpty(val: unknown): boolean {
  if (val == null) return true

  if (isString(val) || isArray(val)) {
    return val.length === 0
  }

  if (isMap(val) || isSet(val)) {
    return val.size === 0
  }

  if (isObject(val) || isPlainObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

// 首字母转大写（优化正则）
export function titleCase(val: string): string {
  return val.replace(/\b[a-z]/g, (char) => char.toUpperCase())
}

// 下划转驼峰（支持连续下划线）
export function camelCase(val: string): string {
  return val.replace(/_+([a-z])/g, (_, char) => char.toUpperCase())
}

// 驼峰转下划线
export function snakeCase(val: string): string {
  return val.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`).replace(/^_/, '')
}
