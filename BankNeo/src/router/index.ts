import { createRouter, createWebHistory } from 'vue-router'

// Import your page components
import HomePage from '../pages/HomePage.vue'
import AccountPage from "../pages/AccountPage.vue";
import PaymentsPage from '../pages/PaymentsPage.vue'

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    {path: '/accounts', name:'Accounts', component: AccountPage },
    { path: '/payments', name: 'Payments', component: PaymentsPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router