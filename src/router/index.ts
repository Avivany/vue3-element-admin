import type {App} from 'vue';
import { createRouter, createWebHashHistory,type RouteRecordRaw } from 'vue-router';

import staticRoutes from './staticRoutes'; 

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});
export function setupRouter(app: App<Element>) {
  app.use(router);
}
export default router;