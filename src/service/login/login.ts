
import type { IAccount } from '@/types'
import hyRequest from './../index'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`,
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
