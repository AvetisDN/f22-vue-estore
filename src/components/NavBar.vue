<template>
    <div class="p-menubar py-0 border-noround shadow-1">
        <Menubar :model="items" class="container border-none">
            <template #start>
                <div class="flex gap-1 text-3xl mr-4 text-primary">
                    <i class="pi pi-shopping-bag text-3xl"></i>
                    <span class="hidden md:block">LOGO</span>
                </div>
            </template>
            <template #item="{label, item, props, root, hasSubmenu}">
                <router-link v-if="item.route" :to="item.route" v-slot="routerProps" class="p-menuitem-link"  :class="{'p-menuitem-active': route.fullPath === item.route}">
                        <span v-bind="props.icon"/>
                        <span v-bind="props.label">{{ label }}</span>
                        <Badge v-if="label === 'Cart'" :value="total" class="ml-2" severity="info" />
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span v-bind="props.icon" />
                    <span v-bind="props.label">{{ label }}</span>
                    <span :class="[hasSubmenu && (root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right')]" v-bind="props.submenuicon" />
                </a>
            </template>
            <template #end>
                <div class="flex gap-2 ml-2">
                    <CartInformer/>
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useProductStore} from "@/store/products";
import {storeToRefs} from "pinia";
import CartInformer from "@/components/CartInformer.vue";
import {useCartStore} from "@/store/cart";

const store = useProductStore()
const {categories} = storeToRefs(store)

const cartStore = useCartStore()
const {total} = storeToRefs(cartStore)

const route = useRoute()
const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        route: '/'
    },
    {
        label: 'Table',
        icon: 'pi pi-table',
        route: '/table'
    },
    {
        label: 'Cart',
        icon: 'pi pi-shopping-cart',
        route: '/cart'
    },

]);

watch(categories, () => {
    items.value.push({
        label: 'Categories',
        icon: 'pi pi-list',
        items: JSON.parse(JSON.stringify(categories.value)).map(cat => ({
            label: cat,
            route: `/category/${cat}`
        }))
    })
})

</script>

<style scoped>

</style>