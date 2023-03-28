import type { RouteRecordRaw } from 'vue-router'
// 1. 获取所有的路由对象,放到数组中
// 1.1 读取router/main 所有的ts文件
function loadLocalRoutes() {
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }
  )
  const localRoutes: RouteRecordRaw[] = []
  // 1.2 将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 1. 加载本地路由
  const localRoutes = loadLocalRoutes()
  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const subitem of menu.children) {
      const route = localRoutes.find((item) => item.path === subitem.url)
      if (route) {
        // 1.给route的顶层菜单添加重定向功能（但是只需要添加一次即可）
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      if (!firstMenu && route) {
        firstMenu = subitem
      }
    }
  }
  return routes
}

export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

// 面包屑问题

export function mapPathToBreadCrumbs(path: string, userMenus: any[]) {
  const breadCrumbs: any[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadCrumbs.push({ name: menu.name, path: menu.url })
        breadCrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadCrumbs
}

export function mapMenuListToIds(menuList:any[]) {
  const ids:number[] = []

  function recurseGetId(menu:any[]) {
    for(const item of menu) {
      if(item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return ids
}

export function mapMenusToPermissions(menuList:any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any[]) {
    for( const item of menus) {
      if( item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }

  recurseGetPermission(menuList)

  return permissions
}
