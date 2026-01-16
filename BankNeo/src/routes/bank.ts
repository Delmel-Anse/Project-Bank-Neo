import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface Account {
    id: string
    ownerName: string
    type: 'zichtrekening' | 'spaarrekening'
    cardNummer: string
    balance: number
}

export interface Transaction {
    type: 'transfer'
    from: string
    to: string
    amount: number
    date: string
    recipientName?: string
}

const STORAGE_KEY = 'bank-state'

const DEFAULT_ACCOUNTS: Account[] = [
    {
        id: 'ACC-001',
        ownerName: 'John Doe',
        type: 'zichtrekening',
        cardNummer: 'BE3268549646846',
        balance: 1000,
    },
    {
        id: 'ACC-002',
        ownerName: 'John Doe',
        type: 'spaarrekening',
        cardNummer: 'BE4436554654632',
        balance: 250,
    },
]

function cloneAccounts(list: Account[]) {
    return list.map(a => ({ ...a }))
}

export const useBankStore = defineStore('bank', () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : null

    const accounts = ref<Account[]>(
        parsed?.accounts ? parsed.accounts : cloneAccounts(DEFAULT_ACCOUNTS)
    )

    const transactions = ref<Transaction[]>(
        parsed?.transactions ? parsed.transactions : []
    )

    watch(
        () => ({ accounts: accounts.value, transactions: transactions.value }),
        (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)),
        { deep: true }
    )

    function transfer(fromId: string, toId: string, amount: number, recipientName?: string) {
        if (!Number.isFinite(amount) || amount <= 0) throw new Error('Amount must be greater than 0')
        if (fromId === toId) throw new Error('Cannot transfer to the same account')

        const from = accounts.value.find(a => a.id === fromId)
        const to = accounts.value.find(a => a.id === toId)
        if (!from || !to) throw new Error('Account not found')
        if (from.balance < amount) throw new Error('Insufficient balance')

        from.balance -= amount
        to.balance += amount

        transactions.value.unshift({
            type: 'transfer',
            from: from.id,
            to: to.id,
            amount,
            date: new Date().toISOString(),
            recipientName,
        })

        transactions.value = transactions.value.slice(0, 10)
    }

    function deposit(accountId: string, amount: number) {
        if (!Number.isFinite(amount) || amount <= 0) throw new Error('Amount must be greater than 0')
        const acc = accounts.value.find(a => a.id === accountId)
        if (!acc) throw new Error('Account not found')
        acc.balance += amount
    }

    function resetAccounts() {
        accounts.value = cloneAccounts(DEFAULT_ACCOUNTS)
        transactions.value = []
        localStorage.removeItem(STORAGE_KEY)
    }

    return { accounts, transactions, transfer, deposit, resetAccounts }
})
