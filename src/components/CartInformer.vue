<template>
    <InputText type="search" size="small" class="flex-shrink-1 min-w-0" placeholder="Search..."/>
    <Button size="small" icon="pi pi-shopping-cart" :badge="'' + total" badge-class="p-badge-info" @click="toggle" aria-haspopup="true"
            aria-controls="overlay_menu" severity="secondary"/>
    <Menu ref="menu" :model="cart" :popup="true">
        <template #item="{ item, label, props }">
            <a class="flex gap-2" v-bind="props.action">
                <span v-bind="props.label">{{ label }}</span>
                <Badge class="ml-auto" :value="item.quantity" severity="info"/>
            </a>
        </template>
        <template #end>
            <div class="flex justify-content-end font-bold py-2 px-4 border-top-1 border-gray-300">
                Total: ${{ totalCost.toFixed(2) }}
            </div>
        </template>
    </Menu>
</template>

<script setup>
import {useCartStore} from "@/store/cart";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const store = useCartStore()
const {cart, total, totalCost, cartMenu} = storeToRefs(store)

const menu = ref();

const toggle = (event) => {
    menu.value.toggle(event);
};

</script>
