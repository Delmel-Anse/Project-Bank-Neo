<template>
  <div class="max-w-md w-full bg-white shadow-md rounded-xl p-6 border border-gray-200">
    <!-- Header -->
    <h2 class="text-xl font-semibold text-gray-800 mb-6">
      Make a Payment
    </h2>

    <!-- From account -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        From Account
      </label>

      <select
          v-model="fromAccountId"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    </div>

    <!-- Recipient name -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Account Name
      </label>
      <input
          v-model="recipientName"
          type="text"
          placeholder="Recipient account name"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Recipient account number -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Account Number
      </label>
      <input
          v-model="recipientAccount"
          type="text"
          placeholder="Recipient account number"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Amount -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Amount
      </label>
      <input
          v-model.number="amount"
          type="number"
          min="0"
          placeholder="0.00"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Note -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Note
      </label>
      <input
          v-model="note"
          type="text"
          placeholder="Payment description (optional)"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Balance info -->
    <p
        v-if="selectedFromAccount"
        class="text-sm text-gray-500 mb-4"
    >
      Available balance:
      <span class="font-medium">
        € {{ selectedFromAccount.balance.toFixed(2) }}
      </span>
    </p>

    <!-- Submit -->
    <button
        :disabled="!canSubmit"
        class="w-full bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
        @click="submitPayment"
    >
      Send Payment
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBankStore } from '../routes/bank'

const bankStore = useBankStore()
const { accounts } = storeToRefs(bankStore)

// Form state
const fromAccountId = ref('')
const recipientName = ref('')
const recipientAccount = ref('')
const amount = ref(0)
const note = ref('')

// Selected account
const selectedFromAccount = computed(() =>
    accounts.value.find(acc => acc.id === fromAccountId.value)
)

// Button validation
const canSubmit = computed(() => {
  return (
      selectedFromAccount.value !== undefined &&
      amount.value > 0 &&
      amount.value <= (selectedFromAccount.value?.balance ?? 0) &&
      recipientName.value.trim().length > 0 &&
      recipientAccount.value.trim().length > 0
  )
})

// Label formatter
function formatAccountLabel(account: {
  ownerName: string
  type: string
}) {
  const typeLabel =
      account.type === 'zichtrekening'
          ? 'Zichtrekening'
          : 'Spaarrekening'

  return `${account.ownerName} – ${typeLabel}`
}

// Submit handler (logic later)
function submitPayment() {
  if (!canSubmit.value || !selectedFromAccount.value) return

  console.log('Payment submitted:', {
    from: selectedFromAccount.value,
    toName: recipientName.value,
    toAccount: recipientAccount.value,
    amount: amount.value,
    note: note.value,
  })

  // Reset form
  amount.value = 0
  note.value = ''
}
</script>
