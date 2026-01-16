<template>
  <div class="max-w-[960px] mx-auto p-4">
    <AccountsOverview />

    <div class="text-center mt-6">
      <button
          @click="resetAllAccounts"
          class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded transition"
      >
        Reset All Accounts
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountsOverview from '../components/AccountOverview.vue'
import { useBankStore } from '../routes/bank.ts'

const bankStore = useBankStore()

function resetAllAccounts() {
  bankStore.resetAccounts()
}
</script>
