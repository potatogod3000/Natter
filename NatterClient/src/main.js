// Vue
import { createApp } from 'vue'
import App from './App.vue'

// Vue Router
import router from './router'

// Pinia - Store
import { createPinia } from 'pinia'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faServer } from '@fortawesome/free-solid-svg-icons'

library.add(faServer)

// Base CSS
import './assets/base.css'

// Setup App
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

// Global Properties
app.provide('apiUrl', 'http://localhost:5000')

// Mount App in <div id="app"> at index.html
app.mount('#app')
