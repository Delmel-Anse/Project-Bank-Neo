<template>
  <div
      class="min-h-screen flex items-center justify-center p-6
           bg-gray-100 text-gray-900
           dark:bg-zinc-950 dark:text-zinc-100"
  >
    <div class="w-full max-w-[1000px] space-y-6">
      <PaymentCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import PaymentCard from '../components/PaymentCard.vue'


</script>