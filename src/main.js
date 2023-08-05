import './assets/sass/_normalize.scss'
import './assets/sass/_ampoule.scss'

import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue'
import router from './router'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

createApp(App).use(plugin, defaultConfig({theme:'genesis'})).use(router).mount('#app')