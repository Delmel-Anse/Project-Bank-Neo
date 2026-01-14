<template>
  <div class="flex flex-col items-center">
    <!-- Account card only shows when selected -->
    <AccountCard :account="selectedFromAccount" />

    <!-- Payment form -->
    <div class="w-full max-w-[960px] bg-white shadow-md rounded-2xl p-8 border border-gray-200">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Make a Payment
      </h2>

      <!-- From Account -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">From Account</label>
        <select
            v-model="fromAccountId"
            class="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="">Select account</option>
          <option v-for="account in accounts" :key="account.id" :value="account.id">
            {{ formatAccountLabel(account) }}
          </option>
        </select>
      </div>

      <!-- Recipient Name -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
        <input
            v-model="recipientName"
            type="text"
            class="w-full border rounded-md p-3"
            placeholder="Account Name (optional)"
        />
      </div>

      <!-- Recipient Account Number -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Recipient Account Number</label>
        <input
            v-model="recipientAccount"
            type="text"
            class="w-full border rounded-md p-3"
            placeholder="BEXXXXXXXXXXXXXX"
        />
        <p v-if="recipientAccount && !recipientExists" class="text-sm text-red-600 mt-1">
          Account number does not exist
        </p>
      </div>

      <!-- Amount -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
        <input
            v-model.number="amount"
            type="number"
            min="1"
            class="w-full border rounded-md p-3"
            placeholder="0.00"
        />
      </div>

      <!-- Available Balance -->
      <p v-if="selectedFromAccount" class="text-sm text-gray-500 mb-4">
        Available balance: <strong>€ {{ selectedFromAccount.balance.toFixed(2) }}</strong>
      </p>

      <!-- Error message -->
      <p v-if="errorMessage" class="text-sm text-red-600 mb-4">
        {{ errorMessage }}
      </p>

      <!-- Submit button -->
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
import AccountCard from './AccountCard.vue'

// Pinia store
const bankStore = useBankStore()
const { accounts } = storeToRefs(bankStore)

// Form state
const fromAccountId = ref<string>('')
const recipientName = ref<string>('')
const recipientAccount = ref<string>('')
const amount = ref<number>(0)
const errorMessage = ref<string>('')

// Selected source account
const selectedFromAccount = computed(() =>
    accounts.value.find(acc => acc.id === fromAccountId.value)
)

// Recipient exists (check by card number)
const recipientExists = computed(() =>
    accounts.value.some(acc => acc.cardNummer === recipientAccount.value)
)

// Validation for submit
const canSubmit = computed(() => {
  if (!selectedFromAccount.value) return false
  if (amount.value <= 0) return false
  if (amount.value > selectedFromAccount.value.balance) return false
  if (!recipientExists.value) return false
  if (recipientAccount.value === selectedFromAccount.value.cardNummer) return false
  return true
})

// Format dropdown labels
function formatAccountLabel(account: { ownerName: string; type: string }) {
  return `${account.ownerName} – ${account.type === 'zichtrekening' ? 'Zichtrekening' : 'Spaarrekening'}`
}

// Submit payment
function submitPayment() {
  errorMessage.value = ''

  if (!canSubmit.value) {
    errorMessage.value = 'Please fill in all fields correctly'
    return
  }

  const recipient = accounts.value.find(acc => acc.cardNummer === recipientAccount.value)
  if (!recipient) {
    errorMessage.value = 'Recipient account number does not exist'
    return
  }

  bankStore.transfer(
      fromAccountId.value,
      recipient.id,
      amount.value,
      recipientName.value
  )

  // Reset form
  amount.value = 0
  recipientName.value = ''
  recipientAccount.value = ''
}
</script>
