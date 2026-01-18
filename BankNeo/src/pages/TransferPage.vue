<template>
  <div
      class="min-h-screen p-6 flex justify-center
           bg-gray-100 text-gray-900
           dark:bg-zinc-950 dark:text-zinc-100"
  >
    <div class="w-full max-w-[960px] space-y-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-zinc-100 mb-2">
        Latest Transactions
      </h1>

      <p v-if="transactions.length === 0" class="text-gray-500 dark:text-zinc-400">
        No transactions yet.
      </p>

      <TransactionCard
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
import TransactionCard from '../components/TransactionCard.vue'

const bankStore = useBankStore()
const { transactions } = storeToRefs(bankStore)
</script>
