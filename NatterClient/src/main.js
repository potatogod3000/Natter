// Vue
import { createApp } from 'vue'
import App from './App.vue'

// Vue Router
import router from './router'

// Pinia - Store
import { createPinia } from 'pinia'

// Base CSS
import './assets/base.css'

// Setup App
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Mount App in <div id="app"> at index.html
app.mount('#app')
