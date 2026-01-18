<template>
  <div
      class="rounded-xl p-5 border shadow
           bg-white border-gray-200
           dark:bg-zinc-900 dark:border-zinc-700"
  >
    <div class="flex justify-between items-start gap-4">
      <div>
        <!-- Date -->
        <p class="text-sm text-gray-500 dark:text-zinc-400">
          {{ formattedDate }}
        </p>

        <!-- Title -->
        <p class="text-lg font-semibold text-gray-800 dark:text-zinc-100 mt-1">
          {{ title }}
        </p>

        <!-- Transfer -->
        <template v-if="transaction.type === 'transfer'">
          <p class="text-sm text-gray-600 dark:text-zinc-300 mt-2">
            From:
            <strong>{{ formatAccount(transaction.from) }}</strong>
          </p>
          <p class="text-sm text-gray-600 dark:text-zinc-300">
            To:
            <strong>{{ formatAccount(transaction.to) }}</strong>
          </p>
        </template>

        <!-- Deposit -->
        <template v-else>
          <p class="text-sm text-gray-600 dark:text-zinc-300 mt-2">
            Account:
            <strong>{{ formatAccount(transaction.accountId!) }}</strong>
          </p>
        </template>
      </div>

      <!-- Amount -->
      <div class="text-right shrink-0">
        <p
            class="text-lg font-semibold"
            :class="
            transaction.type === 'deposit'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          "
        >
          {{ transaction.type === 'deposit' ? '+' : '-' }}
          {{ formatEUR(transaction.amount) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBankStore } from '../routes/bank'
import type { Transaction } from '../routes/bank'

const props = defineProps<{ transaction: Transaction }>()

// Access accounts from store
const bankStore = useBankStore()
const { accounts } = storeToRefs(bankStore)

// Format date
const formattedDate = computed(() =>
    new Date(props.transaction.date).toLocaleString()
)

// Title
const title = computed(() =>
    props.transaction.type === 'deposit' ? 'Deposit' : 'Transfer'
)

// Resolve account ID → "John Doe – Zichtrekening"
function formatAccount(accountId: string) {
  const acc = accounts.value.find(a => a.id === accountId)
  if (!acc) return accountId

  return `${acc.ownerName} – ${
      acc.type === 'zichtrekening' ? 'Zichtrekening' : 'Spaarrekening'
  }`
}

// Currency formatter
function formatEUR(value: number) {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
</script>
