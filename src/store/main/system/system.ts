import type { ISystemState } from './type';
import { deleteUserById, editUserData, newUserData, postPagesListData, postUsersListData, deletePageById, newPageData, editPageData } from "@/service/main/system/system";
import { defineStore } from "pinia";
import useMainStore from '../main';

const useSystemStore = defineStore('system', {
  state: ():ISystemState => ({
    usersList:[],
    usersTotalCount:0,
    pageList:[],
    pageTotalCount:0
  }),
  actions:{
    async postUsersListAction(dataInfo:any) {
      const usersListResult = await postUsersListData(dataInfo)
      const { list, totalCount } = usersListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserByIdAction(id:number) {
      const deleteRes = await deleteUserById(id)
      this.postUsersListAction({ offset: 0 ,size:10})
    },
    async newUserDataAction(userInfo:any) {
      const newResult = await newUserData(userInfo)
      this.postUsersListAction({offset:0 , size: 10})
    },
    async editUserDataAction(id:number, userInfo:any) {
      const editUserResult = await editUserData(id,userInfo)
      this.postUsersListAction({ offset:0, size:10 })
    },

    /** 针对页面的 */
    async postPageListAction(pageName:string, dataInfo:any) {
      const pageListResult = await postPagesListData(pageName, dataInfo)
      const { totalCount, list} = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName:string , id:number) {
      const deleteResult = await deletePageById(pageName, id)

      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName:string, pageInfo:any) {
      const newResult = await newPageData(pageName, pageInfo)
      this.postPageListAction(pageName ,{ offset:0, size:10})
      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName:string, id: number, pageInfo:any) {
      const editResult = await editPageData(pageName,id,pageInfo)
      this.postPageListAction(pageName,{ offset:0, size:10 })
      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
