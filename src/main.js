import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { HiRefresh } from 'oh-vue-icons/icons'

addIcons(HiRefresh)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(router)
app.use(store)
app.mount('#app')
