<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Navbar />

    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>