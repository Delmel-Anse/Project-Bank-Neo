<template>
  <div
      v-if="account"
      class="w-full max-w-[960px] bg-gradient-to-r from-black to-gray-300 shadow-lg rounded-2xl p-6 mb-6 mx-auto text-white relative overflow-hidden border-2 border-black"
  >
    <!-- Card type badge -->
    <div
        class="absolute top-4 right-4 text-sm bg-white text-blue-600 px-3 py-1 rounded-full font-semibold"
    >
      {{ account.type === 'zichtrekening' ? 'Zichtrekening' : 'Spaarrekening' }}
    </div>

    <!-- Owner Name -->
    <h2 class="text-2xl font-bold">
      {{ account.ownerName }}
    </h2>

    <!-- Card Number -->
    <p class="tracking-widest mt-2 text-lg">
      {{ account.cardNummer }}
    </p>

    <!-- Balance -->
    <p class="mt-6 text-lg">
      Balance:
      <strong>{{ formatEUR(account.balance) }}</strong>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Account } from '../routes/bank.ts'

// Props
defineProps<{
  account?: Account | null
}>()

// Belgian euro formatting: € 1.234,56
function formatEUR(value: number) {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
</script>
