<script setup lang="ts">

</script>

<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">

        <!-- Logo / Brand -->
        <div class="flex items-center">
          <span class="text-xl font-bold text-blue-600">
            BankNeo
          </span>
        </div>

        <!-- Desktop Links -->
        <div class="hidden md:flex space-x-8">
          <a
              href="#"
              class="text-gray-700 hover:text-blue-600 transition"
          >
            Dashboard
          </a>
          <a
              href="#"
              class="text-gray-700 hover:text-blue-600 transition"
          >
            Accounts
          </a>
          <a
              href="#"
              class="text-gray-700 hover:text-blue-600 transition"
          >
            Payments
          </a>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <button
              class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>
