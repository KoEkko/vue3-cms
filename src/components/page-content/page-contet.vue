<template>
  <div class="user-main">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" v-if="isCreate" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table
        border
        style="width: 100%"
        :data="pageList"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="editBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop" />
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotalCount"
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
import usePermissions from '@/hooks/usePermissions';

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

const systemStore = useSystemStore()
// 先定义变量/ 属性
const currentPage = ref(1)
const pageSize = ref(10)
const props = defineProps<IProps>()
const emit = defineEmits(['newClick', 'editClick'])

// 获取是否有对应的 增删改查 的权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 在初次渲染之前，就添加 store 的监听事件
// 实现 三种操作 改变 页码数
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'editPageDataAction' ||
      name === 'newPageDataAction' ||
      name === 'deletePageByIdAction'
    ) {
      currentPage.value = 1
    }
  })
})
// 初次渲染表格数据
fetchUserListData()

const { pageList, pageTotalCount } = storeToRefs(systemStore)

function handleSizeChange() {
  fetchUserListData()
}

function handleCurrentChange() {
  fetchUserListData()
}

// 定义函数，用于发送网络请求
function fetchUserListData(formData: any = {}) {
  if(!isQuery) return 
  // 1. 获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 删除/新建/编辑的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
function handleNewUserClick() {
  emit('newClick')
}
function editBtnClick(itemData: any) {
  emit('editClick', itemData)
}
defineExpose({ fetchUserListData })
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
    padding: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
