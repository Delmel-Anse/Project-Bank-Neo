<template>
  <div class="flex flex-col items-center">
    <div
        class="w-full max-w-[960px] rounded-2xl p-8 border shadow-md
             bg-white border-gray-200
             dark:bg-zinc-900 dark:border-zinc-700"
    >
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-zinc-100 mb-6">
        Deposit Money
      </h2>

      <!-- Select account -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
          Select Account
        </label>
        <select
            v-model="accountId"
            class="w-full rounded-md p-3
                 border border-gray-300 dark:border-zinc-700
                 bg-white dark:bg-zinc-950
                 text-gray-900 dark:text-zinc-100
                 focus:outline-none focus:ring-2 focus:ring-green-500"
            :class="{ 'border-red-500': accountError }"
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
        <p v-if="accountError" class="text-sm text-red-600 mt-1">
          {{ accountError }}
        </p>
      </div>

      <!-- Amount -->
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
                 focus:outline-none focus:ring-2 focus:ring-green-500"
            :class="{ 'border-red-500': amountError }"
        />

        <p v-if="amountError" class="text-sm text-red-600 mt-1">
          {{ amountError }}
        </p>
      </div>

      <!-- Balance preview -->
      <p v-if="selectedAccount" class="text-sm text-gray-500 dark:text-zinc-400 mb-4">
        Current balance:
        <strong class="text-gray-800 dark:text-zinc-100">
          {{ formatEUR(selectedAccount.balance) }}
        </strong>
      </p>

      <!-- Error -->
      <p v-if="errorMessage" class="text-sm text-red-600 mb-4">
        {{ errorMessage }}
      </p>

      <!-- Success -->
      <p v-if="successMessage" class="text-sm text-green-600 dark:text-green-400 mb-4">
        {{ successMessage }}
      </p>

      <!-- Submit -->
      <button
          :disabled="!canSubmit"
          @click="doDeposit"
          class="w-full py-3 rounded text-white transition
               bg-green-600 hover:bg-green-700
               disabled:bg-gray-400 disabled:hover:bg-gray-400"
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

const bankStore = useBankStore()
const { accounts } = storeToRefs(bankStore)

const accountId = ref('')
const errorMessage = ref('')
const successMessage = ref('')

// amount string + number
const amountInput = ref('')
const amountValue = ref<number | null>(null)

const selectedAccount = computed(() =>
    accounts.value.find(acc => acc.id === accountId.value)
)

const accountError = computed(() =>
    !accountId.value ? 'Select an account to deposit into' : ''
)

const amountError = computed(() => {
  if (amountValue.value === null) return ''
  if (amountValue.value <= 0) return 'Enter an amount greater than 0'
  if (amountValue.value > 1000) return 'Maximum deposit per transaction is €1000'
  return ''
})

const canSubmit = computed(() =>
    !accountError.value &&
    amountValue.value !== null &&
    !amountError.value
)

function formatAccountLabel(account: { ownerName: string; type: string }) {
  return `${account.ownerName} – ${
      account.type === 'zichtrekening' ? 'Zichtrekening' : 'Spaarrekening'
  }`
}

function formatEUR(value: number) {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// limit to 2 decimals with comma
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

function doDeposit() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!canSubmit.value) return

  try {
    bankStore.deposit(accountId.value, amountValue.value!)

    successMessage.value = `Deposited ${formatEUR(amountValue.value!)} successfully`

    // reset input
    amountInput.value = ''
    amountValue.value = null

    // ✅ auto-clear success after 3 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)

  } catch (err: any) {
    errorMessage.value = err.message
  }
}
</script>
