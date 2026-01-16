import { createRouter, createWebHistory } from 'vue-router'

// Import your page components
import HomePage from '../pages/HomePage.vue'
import AccountPage from "../pages/AccountPage.vue";
import PaymentsPage from '../pages/PaymentsPage.vue'
import DepositsPage from '../pages/StortingPage.vue'
import TransfersPage from '../pages/TransferPage.vue'

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    {path: '/accounts', name:'Accounts', component: AccountPage },
    { path: '/payments', name: 'Payments', component: PaymentsPage },
    {path: '/deposits', name: 'Deposits', component: DepositsPage},
    {path: '/transfer', name: 'Transfers', component: TransfersPage},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router