
import hyRequest from "@/service";

// 用户界面 的网络请求
export function postUsersListData(dataInfo:any) {
  return hyRequest.post({
    url:'/users/list',
    data:dataInfo
  })
}

export function deleteUserById(id:number) {
  return hyRequest.delete({
    url:`/users/${id}`
  })
}

export function newUserData(userInfo:any ) {
  return hyRequest.post({
    url:'/users',
    data:userInfo
  })
}

export function editUserData(id:number, userInfo:any) {
  return hyRequest.patch({
    url:`/users/${id}`,
    data:userInfo
  })
}

// 统一页面的网络请求，封装

export function postPagesListData(pageName:string ,dataInfo:any) {
  return hyRequest.post({
    url:`/${pageName}/list`,
    data:dataInfo
  })
}

export function deletePageById(pageName:string, id:number) {
  return hyRequest.delete({
    url:`/${pageName}/${id}`
  })
}

export function newPageData(pageName:string, pageInfo:any) {
  return hyRequest.post({
    url:`/${pageName}`,
    data:pageInfo
  })
}

export function editPageData(pageName:string, id:number , pageInfo:any ) {
  return hyRequest.patch({
    url:`/${pageName}/${id}`,
    data:pageInfo
  })
}

