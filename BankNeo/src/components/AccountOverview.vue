<template>
  <section>
    <h2 class="text-xl font-semibold mb-4">Accounts</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
import { useBankStore } from '../routes/bank'
import AccountCard from './AccountCard.vue'

const bankStore = useBankStore()
const { accounts } = storeToRefs(bankStore)
</script>