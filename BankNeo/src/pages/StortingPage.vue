<template>
  <div
      class="min-h-screen flex items-center justify-center p-6
           bg-gray-100 text-gray-900
           dark:bg-zinc-950 dark:text-zinc-100"
  >
    <div class="w-full max-w-[820px]">
      <DepositCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import DepositCard from '../components/DepositCard.vue'
</script>
