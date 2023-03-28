import { router } from './../../router/index'
import { LOGIN_TOKEN } from './../../global/constants'
import { localCache } from '@/utils/cache'

import type { IAccount } from '@/types/index.d'
import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginSotre {
  userMenus: any
  userInfo: any
  token: string
  permissions: any[]
}

const useLoginStore = defineStore('login', {
  // state
  state: (): ILoginSotre => ({
    token: '',
    userMenus: [],
    userInfo: {},
    permissions:[]
  }),

  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.帐号登录，获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息(role)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3. 根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4. 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()


      // 请求权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 5. 动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      // 5.页面跳转
      router.push('/main')
    },

    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据

      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')

      if (token && userInfo && userMenus) {
        this.token = token
        this.userMenus = userMenus
        this.userInfo = userInfo

        // 请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 请求权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        //2.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
