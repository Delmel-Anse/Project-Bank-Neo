<template>
  <div class="bg-white shadow rounded-xl p-5 border border-gray-200">
    <div class="flex justify-between items-start">
      <div>
        <p class="text-sm text-gray-500">{{ formattedDate }}</p>

        <p class="text-lg font-semibold text-gray-800 mt-1">
          {{ title }}
        </p>

        <!-- Transfer -->
        <template v-if="transaction.type === 'transfer'">
          <p class="text-sm text-gray-600 mt-2">
            From: <strong>{{ transaction.from }}</strong>
          </p>
          <p class="text-sm text-gray-600">
            To: <strong>{{ transaction.to }}</strong>
          </p>
        </template>

        <!-- Deposit -->
        <template v-else>
          <p class="text-sm text-gray-600 mt-2">
            Account: <strong>{{ transaction.accountId }}</strong>
          </p>
        </template>
      </div>

      <div class="text-right">
        <p
            class="text-lg font-semibold"
            :class="transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'"
        >
          {{ transaction.type === 'deposit' ? '+' : '-' }}
          € {{ transaction.amount.toFixed(2) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Transaction } from '../routes/bank'

const props = defineProps<{ transaction: Transaction }>()

const formattedDate = computed(() =>
    new Date(props.transaction.date).toLocaleString()
)

const title = computed(() =>
    props.transaction.type === 'deposit' ? 'Deposit' : 'Transfer'
)
</script>
