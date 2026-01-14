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
    recipientName?: string // optional
}

const STORAGE_KEY = 'bank-state'

export const useBankStore = defineStore('bank', () => {
    const stored = localStorage.getItem(STORAGE_KEY)

    const accounts = ref<Account[]>(
        stored
            ? JSON.parse(stored).accounts
            : [
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
    )

    const transactions = ref<Transaction[]>(
        stored ? JSON.parse(stored).transactions : []
    )

    // Persist state automatically
    watch(
        () => ({ accounts: accounts.value, transactions: transactions.value }),
        (state) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        },
        { deep: true }
    )

    function transfer(
        fromId: string,
        toId: string,
        amount: number,
        recipientName?: string // make optional
    ) {
        if (amount <= 0) throw new Error('Amount must be greater than zero')

        const from = accounts.value.find((a) => a.id === fromId)
        const to = accounts.value.find((a) => a.id === toId)

        if (!from || !to) throw new Error('Account does not exist')
        if (from.id === to.id) throw new Error('Cannot transfer to same account')
        if (from.balance < amount) throw new Error('Insufficient balance')

        from.balance -= amount
        to.balance += amount

        transactions.value.unshift({
            type: 'transfer',
            from: from.id,
            to: to.id,
            amount,
            date: new Date().toISOString(),
            recipientName, // optional for notes only
        })

        transactions.value = transactions.value.slice(0, 10)
    }

    return {
        accounts,
        transactions,
        transfer,
    }
})

