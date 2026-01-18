<template>
  <div
      class="min-h-screen
           bg-gray-100 text-gray-900
           dark:bg-zinc-950 dark:text-zinc-100"
  >
    <div class="mx-auto max-w-[1100px] px-4 py-10 space-y-8">
      <!-- Hero -->
      <section
          class="rounded-2xl border shadow-sm p-6
               bg-white border-gray-200
               dark:bg-zinc-900 dark:border-zinc-700"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 class="text-3xl font-bold tracking-tight">
              Welcome back 👋
            </h1>
            <p class="mt-2 text-gray-600 dark:text-zinc-300">
              Manage your accounts, make transfers, and deposit money — all in one place.
            </p>
          </div>

          <div class="text-left md:text-right">
            <p class="text-sm text-gray-500 dark:text-zinc-400">Total balance</p>
            <p class="text-3xl font-semibold">
              {{ formatEUR(totalBalance) }}
            </p>
            <p class="mt-1 text-xs text-gray-500 dark:text-zinc-400">
              {{ accounts.length }} account{{ accounts.length === 1 ? '' : 's' }}
            </p>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <RouterLink
              to="/payments"
              class="rounded-xl px-4 py-3 border text-sm font-semibold transition
                   bg-blue-600 text-white border-blue-600
                   hover:bg-blue-700"
          >
            Make a Payment
          </RouterLink>

          <RouterLink
              to="/deposits"
              class="rounded-xl px-4 py-3 border text-sm font-semibold transition
                   bg-green-600 text-white border-green-600
                   hover:bg-green-700"
          >
            Deposit Money
          </RouterLink>

          <RouterLink
              to="/transfer"
              class="rounded-xl px-4 py-3 border text-sm font-semibold transition
                   bg-zinc-900 text-white border-zinc-900
                   hover:bg-zinc-800
                   dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700"
          >
            View Transactions
          </RouterLink>

          <RouterLink
              to="/accounts"
              class="rounded-xl px-4 py-3 border text-sm font-semibold transition
                   bg-white text-gray-900 border-gray-300
                   hover:bg-gray-100
                   dark:bg-zinc-950 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Manage Accounts
          </RouterLink>
        </div>
      </section>

      <!-- Accounts section -->
      <section class="space-y-4">
        <div class="flex items-end justify-between">
          <div>
            <h2 class="text-xl font-semibold">Your accounts</h2>
            <p class="text-sm text-gray-600 dark:text-zinc-300">
              Quick overview of your balances.
            </p>
          </div>

          <RouterLink
              to="/accounts"
              class="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            See all
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AccountCard
              v-for="acc in accounts"
              :key="acc.id"
              :account="acc"
              brand="BANK NEO"
          />
        </div>
      </section>

      <!-- Latest transactions preview -->
      <section
          class="rounded-2xl border shadow-sm p-6
               bg-white border-gray-200
               dark:bg-zinc-900 dark:border-zinc-700"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-semibold">Latest activity</h2>
            <p class="text-sm text-gray-600 dark:text-zinc-300">
              Your most recent deposits and transfers (max 10).
            </p>
          </div>

          <RouterLink
              to="/transfer"
              class="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all
          </RouterLink>
        </div>

        <div class="mt-4">
          <p v-if="transactions.length === 0" class="text-sm text-gray-500 dark:text-zinc-400">
            No transactions yet. Make a payment or deposit to get started.
          </p>

          <ul v-else class="divide-y divide-gray-200 dark:divide-zinc-700">
            <li
                v-for="tx in transactions.slice(0, 3)"
                :key="tx.date + tx.amount"
                class="py-3 flex items-center justify-between"
            >
              <div class="min-w-0">
                <p class="font-semibold">
                  {{ tx.type === 'deposit' ? 'Deposit' : 'Transfer' }}
                </p>
                <p class="text-sm text-gray-600 dark:text-zinc-300 truncate">
                  <template v-if="tx.type === 'deposit'">
                    To {{ tx.accountId }}
                  </template>
                  <template v-else>
                    From {{ tx.from }} → {{ tx.to }}
                  </template>
                </p>
                <p class="text-xs text-gray-500 dark:text-zinc-400">
                  {{ formatDate(tx.date) }}
                </p>
              </div>

              <div
                  class="font-semibold"
                  :class="tx.type === 'deposit'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'"
              >
                {{ tx.type === 'deposit' ? '+' : '-' }} {{ formatEUR(tx.amount) }}
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useBankStore } from '../routes/bank'
import AccountCard from '../components/AccountCard.vue'

const bankStore = useBankStore()
const { accounts, transactions } = storeToRefs(bankStore)

const totalBalance = computed(() =>
    accounts.value.reduce((sum, a) => sum + a.balance, 0)
)

function formatEUR(value: number) {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
}
</script>
