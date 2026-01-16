<template>
  <div class="min-h-screen bg-gray-100 p-6 flex justify-center">
    <div class="w-full max-w-[1000px] space-y-6">
      <h1 class="text-2xl font-semibold text-gray-800">
        Recent Transfers
      </h1>

      <!-- Empty state -->
      <div
          v-if="transactions.length === 0"
          class="bg-white rounded-xl shadow p-6 text-gray-500 text-center"
      >
        No transfers yet
      </div>

      <!-- Transfer cards -->
      <TransferCard
          v-for="tx in transactions"
          :key="tx.date + tx.amount"
          :transaction="tx"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBankStore } from '../routes/bank'
import TransferCard from '../components/TransactionCard.vue'

const bankStore = useBankStore()
const { transactions } = storeToRefs(bankStore)
</script>