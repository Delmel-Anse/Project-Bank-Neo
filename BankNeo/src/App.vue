<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar -->
    <Navbar />

    <!-- Main content -->
    <main class="flex-1 flex items-center justify-center">
      <h1 class="text-4xl font-bold text-blue-600 text-center">
        Vue + TypeScript + Tailwind 🚀
        <br />
        I love coding
      </h1>
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>
