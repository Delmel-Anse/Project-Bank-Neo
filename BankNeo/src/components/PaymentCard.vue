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

        <!-- use text input so we can control decimals + comma -->
        <input
            v-model="amountInput"
            inputmode="decimal"
            type="text"
            class="w-full border rounded-md p-3"
            :class="{ 'border-red-500': amountError }"
            placeholder="0,00"
            @input="onAmountInput"
            @blur="onAmountBlur"
        />

        <p v-if="amountError" class="text-sm text-red-600 mt-1">
          {{ amountError }}
        </p>
      </div>

      <!-- BALANCE INFO -->
      <p v-if="selectedFromAccount" class="text-sm text-gray-500 mb-4">
        Available balance:
        <strong>{{ formatEUR(selectedFromAccount.balance) }}</strong>
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

// Amount is kept as:
// - amountInput (string) for the textbox (supports comma)
// - amountValue (number|null) for calculations
const amountInput = ref('')
const amountValue = ref<number | null>(null)

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

// Can submit
const canSubmit = computed(() =>
    !fromAccountError.value &&
    !toAccountError.value &&
    amountValue.value !== null &&
    !amountError.value
)

// Label formatter
function formatAccountLabel(account: { ownerName: string; cardNummer: string }) {
  return `${account.ownerName} – ${account.cardNummer}`
}

// € 1.234,56 formatting (Belgium)
function formatEUR(value: number) {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// Allow only digits + one comma, and max 2 decimals
function sanitizeAmountInput(raw: string) {
  // keep digits and comma only
  let s = raw.replace(/[^\d,]/g, '')

  // only one comma
  const firstComma = s.indexOf(',')
  if (firstComma !== -1) {
    s =
        s.slice(0, firstComma + 1) +
        s.slice(firstComma + 1).replace(/,/g, '')
  }

  // max 2 decimals
  if (firstComma !== -1) {
    const [intPart, decPart = ''] = s.split(',')
    s = intPart + ',' + decPart.slice(0, 2)
  }

  // prevent leading zeros like 00012 (optional, keeps it nicer)
  // keep "0," valid
  if (s.length > 1 && s.startsWith('0') && !s.startsWith('0,')) {
    s = s.replace(/^0+/, '')
    if (s === '') s = '0'
  }

  return s
}

function parseAmountToNumber(s: string): number | null {
  if (!s) return null
  // convert "12,34" -> 12.34
  const normalized = s.replace(',', '.')
  const n = Number(normalized)
  if (!Number.isFinite(n)) return null
  return n
}

function onAmountInput() {
  amountInput.value = sanitizeAmountInput(amountInput.value)
  amountValue.value = parseAmountToNumber(amountInput.value)
}

// On blur: force 2 decimals display (e.g. "5" -> "5,00", "5,1" -> "5,10")
function onAmountBlur() {
  const n = amountValue.value
  if (n === null) {
    amountInput.value = ''
    return
  }
  // show with comma + 2 decimals
  amountInput.value = n.toFixed(2).replace('.', ',')
}

// Submit
function submitPayment() {
  if (!canSubmit.value) return

  bankStore.transfer(
      fromAccountId.value,
      toAccountId.value,
      amountValue.value!,
      'Internal transfer'
  )

  // Reset form
  amountInput.value = ''
  amountValue.value = null
  toAccountId.value = ''
}
</script>
