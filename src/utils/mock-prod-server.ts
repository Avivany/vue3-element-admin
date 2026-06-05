import { createProdMockServer } from 'vite-plugin-mock/client'

const modules: {
  [key: string]: { default: object[] }
} = import.meta.glob('./modules/**/*.ts', { eager: true })

console.log('modules', modules)

const mockModules: object[] = []

Object.values(modules).flatMap((module) => {
  return module.default || []
})

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
