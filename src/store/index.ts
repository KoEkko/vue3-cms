import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'
const store = createPinia()

function registerStore(app: App) {
  app.use(store)
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
