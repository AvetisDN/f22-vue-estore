<template>
    <div class="surface-card shadow-1 p-4 border-round-sm">
        <DataTable v-if="products.length > 0" :value="products" paginator :rows="10"
                   :rows-per-page-options="[10, 20, 50, products.length]" removableSort v-model:filters="filters"
                   filterDisplay="row"
                   :globalFilterFields="['title']" class="p-datatable-sm">

            <template #header>
                <div class="flex justify-content-end">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search"/>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search"/>
                    </span>
                </div>
            </template>

            <template #empty> No products found.</template>
            <template #loading> Loading products data. Please wait.</template>

            <Column field="title" header="Product name" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.title }}
                </template>
                <template #filter="{filterModel, filterCallback}">
                    <InputText v-model="filterModel.value" @input="filterCallback" class="p-column-filter"
                               placeholder="Search by name"/>
                </template>
            </Column>
            <Column field="thumbnail" header="Image">
                <template #body="slotProps">
                    <img :src="slotProps.data.thumbnail" class="w-6rem h-4rem object-cover shadow-1">
                </template>
            </Column>
            <Column field="price" header="Price" sortable
                    :sort-field="(item) => item.price - item.discountPercentage*item.price/100">
                <template #body="slotProps">
                    ${{ formatPrice(slotProps.data.price, slotProps.data.discountPercentage) }}
                </template>
            </Column>
            <Column field="rating" header="Rating">
                <template #body="slotProps">
                    <div class="flex gap-3 align-items-center">
                        <Rating :model-value="Math.round(slotProps.data.rating)" readonly :cancel="false"/>
                        ({{ slotProps.data.rating }})
                    </div>
                </template>
            </Column>
            <Column>
                <template #body="slotProps">
                    <Button label="Buy" icon="pi pi-shopping-bag" @click="addProduct(toRaw(slotProps.data))" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>

import {useProductStore} from "@/store/products";
import {storeToRefs} from "pinia";
import {FilterMatchMode} from 'primevue/api';
import {ref, toRaw} from "vue";
import {useCartStore} from "@/store/cart";

const store = useProductStore()
const {products} = storeToRefs(store)

const {addProduct} = useCartStore()

const formatPrice = (price, discount = 0) => (price - discount * price / 100).toFixed(2)

const filters = ref({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    title: {value: null, matchMode: FilterMatchMode.STARTS_WITH}
});

</script>

<style scoped>

</style>