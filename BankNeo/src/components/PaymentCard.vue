<template>
  <div class="flex flex-col items-center">
    <div class="w-full max-w-[960px] bg-white shadow-md rounded-2xl p-8 border border-gray-200">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Make a Payment
      </h2>

      <!-- FROM ACCOUNT -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          From Account
        </label>
        <select
            v-model="fromAccountId"
            class="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': fromAccountError }"
        >
          <option disabled value="">Select account</option>
          <option
              v-for="account in accounts"
              :key="account.id"
              :value="account.id"
          >
            {{ formatAccountLabel(account) }}
          </option>
        </select>
        <p v-if="fromAccountError" class="text-sm text-red-600 mt-1">
          {{ fromAccountError }}
        </p>
      </div>

      <!-- TO ACCOUNT -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          To Account
        </label>
        <select
            v-model="toAccountId"
            class="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': toAccountError }"
            :disabled="!fromAccountId"
        >
          <option disabled value="">Select recipient</option>
          <option
              v-for="account in recipientAccounts"
              :key="account.id"
              :value="account.id"
          >
            {{ formatAccountLabel(account) }}
          </option>
        </select>
        <p v-if="toAccountError" class="text-sm text-red-600 mt-1">
          {{ toAccountError }}
        </p>
      </div>

      <!-- AMOUNT -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <input
            v-model.number="amount"
            type="number"
            min="1"
            class="w-full border rounded-md p-3"
            :class="{ 'border-red-500': amountError }"
            placeholder="0.00"
        />
        <p v-if="amountError" class="text-sm text-red-600 mt-1">
          {{ amountError }}
        </p>
      </div>

      <!-- BALANCE INFO -->
      <p v-if="selectedFromAccount" class="text-sm text-gray-500 mb-4">
        Available balance:
        <strong>€ {{ selectedFromAccount.balance.toFixed(2) }}</strong>
      </p>

      <!-- SUBMIT -->
      <button
          :disabled="!canSubmit"
          @click="submitPayment"
          class="w-full bg-blue-600 disabled:bg-gray-400 text-white py-3 rounded hover:bg-blue-700 transition"
      >
        Send Payment
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
const fromAccountId = ref('')
const toAccountId = ref('')
const amount = ref<number | null>(null)

// Selected accounts
const selectedFromAccount = computed(() =>
    accounts.value.find(acc => acc.id === fromAccountId.value)
)

const recipientAccounts = computed(() =>
    accounts.value.filter(acc => acc.id !== fromAccountId.value)
)

// Validation errors
const fromAccountError = computed(() =>
    !fromAccountId.value ? 'Select an account to send from' : ''
)

const toAccountError = computed(() =>
    fromAccountId.value && !toAccountId.value
        ? 'Select a recipient account'
        : ''
)

const amountError = computed(() => {
  if (amount.value === null) return ''
  if (amount.value <= 0) return 'Amount must be greater than 0'
  if (
      selectedFromAccount.value &&
      amount.value > selectedFromAccount.value.balance
  ) {
    return 'Insufficient balance'
  }
  return ''
})

// Can submit
const canSubmit = computed(() =>
    !fromAccountError.value &&
    !toAccountError.value &&
    !amountError.value
)

// Label formatter
function formatAccountLabel(account: {
  ownerName: string
  cardNummer: string
}) {
  return `${account.ownerName} – ${account.cardNummer}`
}

// Submit
function submitPayment() {
  if (!canSubmit.value) return

  bankStore.transfer(
      fromAccountId.value,
      toAccountId.value,
      amount.value!,
      'Internal transfer'
  )

  // Reset form
  amount.value = null
  toAccountId.value = ''
}
</script>
