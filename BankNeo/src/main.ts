import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import { useThemeStore } from './router/theme.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// init theme after mount (safe)
const theme = useThemeStore()
theme.initTheme()
