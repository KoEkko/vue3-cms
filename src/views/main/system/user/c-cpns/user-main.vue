<template>
  <div class="user-main">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table border style="width: 100%" :data="usersList">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          type="index"
          width="60px"
          label="序号"
        />
        <el-table-column
          align="center"
          width="150px"
          label="用户名"
          prop="name"
        />
        <el-table-column
          align="center"
          width="150px"
          label="真实姓名"
          prop="realname"
        />
        <el-table-column
          align="center"
          width="150px"
          label="手机号码"
          prop="cellphone"
        />
        <el-table-column
          align="center"
          width="100px"
          label="状态"
          prop="enable"
        >
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'primary' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
              <el-button size="small" icon="Edit" type="primary" text @click="editBtnClick(scope.row)">
              编辑
            </el-button>
            <el-button size="small" icon="Delete" type="danger" text @click="deleteBtnClick(scope.row.id)">
            删除
          </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="usersTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

const systemStore = useSystemStore()
// 先定义变量
const currentPage = ref(1)
const pageSize = ref(10)
const emit = defineEmits(['newClick','editClick'])
// 初次渲染表格数据
fetchUserListData()

const { usersList, usersTotalCount } = storeToRefs(systemStore)

function deleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}

function handleSizeChange() {
  fetchUserListData()
}

function handleCurrentChange() {
  fetchUserListData()
}

// 定义函数，用于发送网络请求
function fetchUserListData(formData: any = {}) {
  // 1. 获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  // 2.发起网络请求
  systemStore.postUsersListAction({...pageInfo, ...formData})
}

function handleNewUserClick() {
  emit('newClick')
}
function editBtnClick(itemData:any) {
  emit('editClick',itemData)
}
defineExpose({fetchUserListData})
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  background-color: #fff;
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
  .pagination {
    padding:20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
