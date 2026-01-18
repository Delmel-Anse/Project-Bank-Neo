<template>
  <nav class="bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">

        <!-- Logo -->
        <div class="flex items-center">
          <span class="text-xl font-bold text-blue-600">BankNeo</span>
        </div>

        <!-- Links -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink
              to="/"
              class="text-gray-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </RouterLink>

          <RouterLink
              to="/accounts"
              class="text-gray-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Account
          </RouterLink>

          <RouterLink
              to="/payments"
              class="text-gray-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Payments
          </RouterLink>

          <RouterLink
              to="/deposits"
              class="text-gray-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Deposits
          </RouterLink>

          <RouterLink
              to="/transfer"
              class="text-gray-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Transfers
          </RouterLink>

          <!-- Dark mode toggle -->
          <button
              @click="theme.toggle"
              class="ml-2 px-3 py-2 rounded-md text-sm
                   border border-gray-300 dark:border-zinc-700
                   text-gray-800 dark:text-zinc-100
                   hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            {{ theme.isDark ? '☀️ Light' : '🌙 Dark' }}
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useThemeStore } from '../router/theme'

const theme = useThemeStore()
</script>
