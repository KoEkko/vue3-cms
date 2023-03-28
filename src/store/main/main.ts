import { getEntireDepartments, getEntireMenus, getEntireRoles } from "@/service/main/main";
import { defineStore } from "pinia";

interface IMainStore {
  entireRoles: any[]
  entireDepartments:any[]
  entireMenus:any[]
}

const useMainStore = defineStore('main', {
  state: ():IMainStore => ({
    entireRoles:[],
    entireDepartments:[],
    entireMenus:[]
  }),
  actions: {
    async fetchEntireDataAction() {
      const departmentRes = await getEntireDepartments()
      const roleRes = await getEntireRoles()
      const menuResult = await getEntireMenus()
      this.entireRoles = roleRes.data.list
      this.entireDepartments = departmentRes.data.list
      this.entireMenus = menuResult.data.list
    }
  }
})

export default useMainStore
