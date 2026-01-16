<template>
  <div class="flex flex-col items-center">
    <div class="w-full max-w-[960px] bg-white shadow-md rounded-2xl p-8 border border-gray-200">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Deposit Money
      </h2>

      <!-- Select account -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Select Account
        </label>
        <select
            v-model="accountId"
            class="w-full border rounded-md p-3 focus:ring-2 focus:ring-green-500"
        >
          <option disabled value="">Choose account</option>
          <option
              v-for="account in accounts"
              :key="account.id"
              :value="account.id"
          >
            {{ formatAccountLabel(account) }}
          </option>
        </select>
      </div>

      <!-- Amount -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <input
            v-model.number="amount"
            type="number"
            min="1"
            max="1000"
            class="w-full border rounded-md p-3"
            placeholder="0.00"
            :class="{ 'border-red-500': amountError }"
        />
        <p v-if="amountError" class="text-sm text-red-600 mt-1">
          {{ amountError }}
        </p>
      </div>

      <!-- Balance preview -->
      <p v-if="selectedAccount" class="text-sm text-gray-500 mb-4">
        Current balance:
        <strong>€ {{ selectedAccount.balance.toFixed(2) }}</strong>
      </p>

      <!-- Error -->
      <p v-if="errorMessage" class="text-sm text-red-600 mb-4">
        {{ errorMessage }}
      </p>

      <!-- Success -->
      <p v-if="successMessage" class="text-sm text-green-600 mb-4">
        {{ successMessage }}
      </p>

      <!-- Submit -->
      <button
          :disabled="!canSubmit"
          @click="doDeposit"
          class="w-full bg-green-600 disabled:bg-gray-400 text-white py-3 rounded hover:bg-green-700 transition"
      >
        Deposit Money
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBankStore } from '../routes/bank'

// Store
const bankStore = useBankStore()
const { accounts } = storeToRefs(bankStore)

// State
const accountId = ref<string>('')
const amount = ref<number | null>(null)
const errorMessage = ref<string>('')
const successMessage = ref<string>('')

// Selected account
const selectedAccount = computed(() =>
    accounts.value.find(acc => acc.id === accountId.value)
)

// Validation
const amountError = computed(() => {
  if (amount.value === null) return ''
  if (amount.value <= 0) return 'Enter an amount greater than 0'
  if (amount.value > 1000) return 'Maximum deposit per transaction is €1000'
  return ''
})

const canSubmit = computed(() =>
    selectedAccount.value !== undefined &&
    amount.value !== null &&
    !amountError.value
)

// Label formatter
function formatAccountLabel(account: { ownerName: string; type: string }) {
  return `${account.ownerName} – ${
      account.type === 'zichtrekening' ? 'Zichtrekening' : 'Spaarrekening'
  }`
}

// ✅ Deposit logic now uses the store (and logs transaction)
function doDeposit() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!canSubmit.value || amount.value === null) {
    errorMessage.value = amountError.value || 'Please select an account and enter a valid amount'
    return
  }

  try {
    bankStore.deposit(accountId.value, amount.value)
    successMessage.value = `€ ${amount.value.toFixed(2)} deposited successfully`
    amount.value = null
  } catch (err: any) {
    errorMessage.value = err.message
  }
}
</script>
