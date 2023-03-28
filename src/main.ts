import { router } from './router/index'
import { createApp } from 'vue'
import registerIcons from './global/register-icons'
import App from './App.vue'
import registerStore from './store'
import './assets/css/index.less'


const app = createApp(App)
app.use(registerIcons)
app.use(registerStore)
app.use(router)
app.mount('#app')
