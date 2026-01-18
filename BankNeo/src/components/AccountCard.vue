<template>
  <div
      v-if="account"
      class="relative w-full max-w-[520px] aspect-[43/27]
           rounded-xl p-4 mx-auto text-white
           shadow-lg border border-black overflow-hidden
           bg-gradient-to-tr from-black via-gray-900 to-gray-400"
  >
    <!-- BRAND (top-right) -->
    <div class="absolute right-4 top-4 text-xs font-extrabold tracking-[0.2em] opacity-80">
      {{ brandText }}
    </div>

    <!-- CHIP -->
    <div class="absolute left-4 top-12 h-8 w-12 rounded-md bg-white/20 border border-white/25" />

    <!-- ACCOUNT NUMBER -->
    <div class="absolute left-4 bottom-16">
      <div class="text-[9px] tracking-widest opacity-70">ACCOUNT</div>
      <div class="text-base tracking-[0.15em]">
        {{ accountDisplay }}
      </div>
    </div>

    <!-- CARDHOLDER -->
    <div class="absolute left-4 bottom-4 min-w-0">
      <div class="text-[9px] tracking-widest opacity-70">CARDHOLDER</div>
      <div class="truncate font-semibold tracking-wide text-sm">
        {{ account.ownerName }}
      </div>
    </div>

    <!-- BALANCE -->
    <div class="absolute right-4 bottom-4 text-right">
      <div class="text-[9px] tracking-widest opacity-70">BALANCE</div>
      <div class="font-semibold tracking-wide text-sm">
        {{ formatEUR(account.balance) }}
      </div>
    </div>

    <!-- TYPE BADGE -->
    <div
        class="absolute left-4 top-4 text-[10px]
             bg-white/90 text-black px-2 py-0.5
             rounded-full font-semibold"
    >
      {{ account.type === 'zichtrekening' ? 'Zichtrekening' : 'Spaarrekening' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Account } from '../routes/bank'

const props = defineProps<{
  account?: Account | null
  brand?: string
}>()

const brandText = computed(() => props.brand ?? 'BANK NEO')

// ---- helpers ----
function groupEvery(input: string, size = 4, separator = ' ') {
  const cleaned = input.trim()
  if (!cleaned) return ''
  const parts: string[] = []
  for (let i = 0; i < cleaned.length; i += size) {
    parts.push(cleaned.slice(i, i + size))
  }
  return parts.join(separator)
}

const accountDisplay = computed(() => {
  const raw = (props.account?.cardNummer ?? '').trim()
  if (!raw) return 'BE •••• •••• •••• ••••'

  const normalized = raw.replace(/\s+/g, '')
  const m = normalized.match(/^([A-Za-z]{2})(.*)$/)

  if (m) {
    return `${m[1].toUpperCase()} ${groupEvery(m[2], 4)}`
  }

  return groupEvery(normalized, 4)
})

function formatEUR(value: number) {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
</script>
