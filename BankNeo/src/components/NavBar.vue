<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">

        <!-- Logo -->
        <div class="flex items-center">
          <span class="text-xl font-bold text-blue-600">BankNeo</span>
        </div>

        <!-- Links -->
        <div class="hidden md:flex space-x-8">
          <RouterLink to="/" class="text-gray-700 hover:text-blue-600 transition">Home</RouterLink>
          <RouterLink to="accounts" class="text-gray-700 hover:text-blue-600 transition">Account</RouterLink>
          <RouterLink to="/payments" class="text-gray-700 hover:text-blue-600 transition">Payments</RouterLink>
        </div>

        <!-- Sign in button -->
        <div class="flex items-center space-x-4">
          <button class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Sign in
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>