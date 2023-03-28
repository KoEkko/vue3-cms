import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type CallbackType = (data?: any) => void
type modal = InstanceType<typeof PageModal>
function usePageModal(newCallback?:CallbackType ,editCallback?: CallbackType) {
  const modalRef = ref<modal | any>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    // 1.让modal显示出来
    modalRef.value?.setModalVisible(false, itemData)
    // 2.编辑的回调
    if (editCallback) editCallback(itemData)
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
