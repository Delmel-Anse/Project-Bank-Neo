<template>
  <div class="flex flex-col items-center">
    <div
        class="w-full max-w-[960px] rounded-2xl p-8 border shadow-md
             bg-white border-gray-200
             dark:bg-zinc-900 dark:border-zinc-700"
    >
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-zinc-100 mb-6">
        Make a Payment
      </h2>

      <!-- FROM ACCOUNT -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
          From Account
        </label>
        <select
            v-model="fromAccountId"
            class="w-full rounded-md p-3
                 border border-gray-300 dark:border-zinc-700
                 bg-white dark:bg-zinc-950
                 text-gray-900 dark:text-zinc-100
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <label class="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
          To Account
        </label>
        <select
            v-model="toAccountId"
            :disabled="!fromAccountId"
            class="w-full rounded-md p-3
                 border border-gray-300 dark:border-zinc-700
                 bg-white dark:bg-zinc-950
                 text-gray-900 dark:text-zinc-100
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 disabled:opacity-60"
            :class="{ 'border-red-500': toAccountError }"
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
        <label class="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
          Amount
        </label>

        <input
            v-model="amountInput"
            inputmode="decimal"
            type="text"
            placeholder="0,00"
            @input="onAmountInput"
            @blur="onAmountBlur"
            class="w-full rounded-md p-3
                 border border-gray-300 dark:border-zinc-700
                 bg-white dark:bg-zinc-950
                 text-gray-900 dark:text-zinc-100
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': amountError }"
        />

        <p v-if="amountError" class="text-sm text-red-600 mt-1">
          {{ amountError }}
        </p>
      </div>

      <!-- BALANCE INFO -->
      <p v-if="selectedFromAccount" class="text-sm text-gray-500 dark:text-zinc-400 mb-4">
        Available balance:
        <strong class="text-gray-800 dark:text-zinc-100">
          {{ formatEUR(selectedFromAccount.balance) }}
        </strong>
      </p>

      <!-- ✅ SUCCESS MESSAGE (NEW) -->
      <p
          v-if="successMessage"
          class="text-sm text-green-600 dark:text-green-400 mb-4"
      >
        {{ successMessage }}
      </p>

      <!-- SUBMIT -->
      <button
          :disabled="!canSubmit"
          @click="submitPayment"
          class="w-full py-3 rounded text-white transition
               bg-blue-600 hover:bg-blue-700
               disabled:bg-gray-400 disabled:hover:bg-gray-400"
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

const bankStore = useBankStore()
const { accounts } = storeToRefs(bankStore)

// ids
const fromAccountId = ref('')
const toAccountId = ref('')

// amount: string input + parsed number
const amountInput = ref('')
const amountValue = ref<number | null>(null)

// ✅ NEW: success message state
const successMessage = ref('')

const selectedFromAccount = computed(() =>
    accounts.value.find(acc => acc.id === fromAccountId.value)
)

const recipientAccounts = computed(() =>
    accounts.value.filter(acc => acc.id !== fromAccountId.value)
)

// errors
const fromAccountError = computed(() =>
    !fromAccountId.value ? 'Select an account to send from' : ''
)

const toAccountError = computed(() =>
    fromAccountId.value && !toAccountId.value ? 'Select a recipient account' : ''
)

const amountError = computed(() => {
  if (amountValue.value === null) return ''
  if (amountValue.value <= 0) return 'Amount must be greater than 0'
  if (selectedFromAccount.value && amountValue.value > selectedFromAccount.value.balance) {
    return 'Insufficient balance'
  }
  return ''
})

const canSubmit = computed(() =>
    !fromAccountError.value &&
    !toAccountError.value &&
    amountValue.value !== null &&
    !amountError.value
)

function formatAccountLabel(account: { ownerName: string; cardNummer: string }) {
  return `${account.ownerName} – ${account.cardNummer}`
}

function formatEUR(value: number) {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// --- amount formatting helpers (max 2 decimals, comma) ---
function sanitizeAmountInput(raw: string) {
  let s = raw.replace(/[^\d,]/g, '')
  const firstComma = s.indexOf(',')
  if (firstComma !== -1) {
    s = s.slice(0, firstComma + 1) + s.slice(firstComma + 1).replace(/,/g, '')
    const [intPart, decPart = ''] = s.split(',')
    s = intPart + ',' + decPart.slice(0, 2)
  }
  if (s.length > 1 && s.startsWith('0') && !s.startsWith('0,')) {
    s = s.replace(/^0+/, '')
    if (s === '') s = '0'
  }
  return s
}

function parseAmountToNumber(s: string): number | null {
  if (!s) return null
  const n = Number(s.replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

function onAmountInput() {
  amountInput.value = sanitizeAmountInput(amountInput.value)
  amountValue.value = parseAmountToNumber(amountInput.value)
}

function onAmountBlur() {
  const n = amountValue.value
  if (n === null) {
    amountInput.value = ''
    return
  }
  amountInput.value = n.toFixed(2).replace('.', ',')
}

function submitPayment() {
  if (!canSubmit.value) return

  try {
    bankStore.transfer(
        fromAccountId.value,
        toAccountId.value,
        amountValue.value!,
        'Internal transfer'
    )

    // ✅ set success message
    successMessage.value = `Transfer of ${formatEUR(amountValue.value!)} completed successfully`

    // reset
    amountInput.value = ''
    amountValue.value = null
    toAccountId.value = ''

    // ✅ auto-clear after 3 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err: any) {
    // optional: if you have error message UI elsewhere, set it here
    // console.error(err)
  }
}
</script>
