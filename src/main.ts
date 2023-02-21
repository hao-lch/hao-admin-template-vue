import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'

import './style/index.scss'
import "normalize.css"
import 'nprogress/nprogress.css'
import "./mock/index"
import svgIcon from './components/SvgIcon/index.vue'
import Alert from './components/Alert/index.vue'

import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component("SvgIcon", svgIcon)
app.component("Alert", Alert)
app.mount('#app')