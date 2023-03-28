import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'
type content = InstanceType<typeof PageContent>
function usePageContent() {
  const contentRef = ref<content | any >()
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
