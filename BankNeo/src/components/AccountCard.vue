<template>
  <div class="bg-white rounded-xl shadow p-6 border border-gray-200">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-lg font-semibold text-gray-800">
        {{ account.ownerName }}
      </h3>
      <span class="text-sm text-gray-500">
        {{ account.id }}
      </span>
    </div>

    <div class="text-2xl font-bold text-gray-900">
      € {{ formattedBalance }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Account {
  id: string
  ownerName: string
  balance: number
}

const props = defineProps<{
  account: Account
}>()

const formattedBalance = computed(() =>
    props.account.balance.toFixed(2)
)
</script>
