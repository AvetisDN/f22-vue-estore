import Home from "@/views/Home.vue";
import Table from "@/views/Table.vue";
import Cart from "@/views/Cart.vue";
import {createRouter, createWebHistory} from "vue-router";
import Category from "@/views/Category.vue";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/table',
        component: Table
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/category/:slug',
        component: Category
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router