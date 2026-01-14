<template>
  <div
      v-if="account"
      class="w-full max-w-[960px] bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg rounded-2xl p-6 mb-6 mx-auto text-white relative overflow-hidden"
  >
    <!-- Card type badge -->
    <div class="absolute top-4 right-4 text-sm bg-white text-blue-600 px-3 py-1 rounded-full font-semibold">
      {{ account.type === 'zichtrekening' ? 'Zichtrekening' : 'Spaarrekening' }}
    </div>

    <!-- Owner Name -->
    <h2 class="text-2xl font-bold">{{ account.ownerName }}</h2>

    <!-- Card Number -->
    <p class="tracking-widest mt-2 text-lg">{{ account.cardNummer }}</p>

    <!-- Balance -->
    <p class="mt-6 text-lg">
      Balance: <strong>€ {{ account.balance.toFixed(2) }}</strong>
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Account } from '../routes/bank'

const props = defineProps<{
  account?: Account | null
}>()
</script>
