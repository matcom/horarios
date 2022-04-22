import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

//import BootstrapVue3,{  IconsPlugin } from 'bootstrap-vue-3'


//Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
//import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

//app.use(BootstrapVue3)
app.use(createPinia())
app.use(router)

app.mount('#app')
