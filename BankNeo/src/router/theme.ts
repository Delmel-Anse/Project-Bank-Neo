import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'theme'

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(false)

    function applyTheme(dark: boolean) {
        isDark.value = dark
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
    }

    function initTheme() {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'dark') return applyTheme(true)
        if (saved === 'light') return applyTheme(false)

        // fallback: system preference
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
        applyTheme(prefersDark)
    }

    function toggle() {
        applyTheme(!isDark.value)
    }

    return { isDark, initTheme, toggle, applyTheme }
})
