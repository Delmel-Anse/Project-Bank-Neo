<template>
  <div class="bg-white shadow rounded-xl p-5 border border-gray-200">
    <div class="flex justify-between items-start">
      <div>
        <p class="text-sm text-gray-500">
          {{ formattedDate }}
        </p>

        <p class="text-lg font-medium text-gray-800">
          Transfer
        </p>

        <p class="text-sm text-gray-600 mt-1">
          From: <strong>{{ transaction.from }}</strong>
        </p>

        <p class="text-sm text-gray-600">
          To: <strong>{{ transaction.to }}</strong>
        </p>

        <p
            v-if="transaction.recipientName"
            class="text-sm text-gray-600"
        >
          Recipient: {{ transaction.recipientName }}
        </p>
      </div>

      <div class="text-right">
        <p class="text-lg font-semibold text-red-600">
          - € {{ transaction.amount.toFixed(2) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Transaction } from '@/stores/bank'

const props = defineProps<{
  transaction: Transaction
}>()

const formattedDate = computed(() =>
    new Date(props.transaction.date).toLocaleString()
)
</script>
