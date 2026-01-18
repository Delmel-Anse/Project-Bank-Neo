<template>
  <div
      class="min-h-screen flex flex-col
           bg-gray-100 text-gray-900
           dark:bg-zinc-950 dark:text-zinc-100"
  >
    <!-- Always visible navbar -->
    <Navbar />

    <!-- Page content -->
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>
