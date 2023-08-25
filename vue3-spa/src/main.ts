import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import elementPlus from 'element-plus'
import HelloWorldVue from './components/HelloWorld.vue'


import './assets/main.css'
import TheWelcomeVue from './components/TheWelcome.vue'

const app = createApp(App)

app.component('test-com', HelloWorldVue)

app.component('test-com1', TheWelcomeVue)

app.use(createPinia())
app.use(router)

app.use(elementPlus).mount('#app')
