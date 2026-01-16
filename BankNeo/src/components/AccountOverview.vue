<template>
  <section class="w-full">
    <h2 class="text-xl font-semibold mb-4">Accounts</h2>

    <div class="space-y-4">
      <AccountCard
          v-for="account in accounts"
          :key="account.id"
          :account="account"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBankStore } from '../routes/bank.ts'
import AccountCard from '../components/AccountCard.vue'

const bankStore = useBankStore()
const { accounts } = storeToRefs(bankStore)
</script>
