import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Account {
    id: string
    ownerName: string
    accountNummer:string
    type:'zichtrekening' | 'spaarrekening'
    balance: number
}

export const useBankStore = defineStore('bank', () => {
    const accounts = ref<Account[]>([
        { id: 'Acc-001', ownerName: 'Anse Delmel',accountNummer:'BE3298746516874',type:"zichtrekening", balance: 1000 },
        { id: 'ACC-002', ownerName: 'Anse Delmel',accountNummer:'BE4426385467416',type:"spaarrekening", balance: 250 },
    ])

    function deposit(accountId: string, amount: number) {
        const account = accounts.value.find(a => a.id === accountId)
        if (!account || amount <= 0) return
        account.balance += amount
    }

    return {
        accounts,
        deposit,
    }
})