<template>
  <div class="surface-card shadow-1 p-4 border-round-sm">
    <div v-if="cart.length > 0">
      <DataTable :value="cart">
        <Column field="thumbnail" header="Image">
          <template #body="slotProps">
            <img
              :src="slotProps.data.thumbnail"
              class="w-6rem h-4rem object-cover shadow-1"
            />
          </template>
        </Column>
        <Column field="title" header="Product name">
          <template #body="slotProps">
            {{ slotProps.data.title }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              @input="filterCallback"
              class="p-column-filter"
              placeholder="Search by name"
            />
          </template>
        </Column>
        <Column field="price" header="Price">
          <template #body="slotProps">
            {{ slotProps.data.quantity }}
            * ${{
              formatPrice(
                slotProps.data.price,
                slotProps.data.quantity,
                slotProps.data.discountPercentage,
              )
            }}
            = ${{
              formatPrice(
                slotProps.data.price * slotProps.data.quantity,
                slotProps.data.quantity,
                slotProps.data.discountPercentage,
              )
            }}
          </template>
        </Column>
        <Column header="Quantity">
          <template #body="slotProps">
            <div class="flex gap-2 align-items-center">
              <Button
                icon="pi pi-minus"
                severity="secondary"
                size="small"
                :disabled="slotProps.data.quantity === 1"
                @click="decreaseQuantity(slotProps.data.id)"
              />
              <h3>{{ slotProps.data.quantity }}</h3>
              <Button
                icon="pi pi-plus"
                severity="secondary"
                size="small"
                :disabled="slotProps.data.quantity === slotProps.data.stock"
                @click="increaseQuantity(slotProps.data.id)"
              />
            </div>
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              severity="danger"
              size="small"
              @click="deleteConfirm($event, slotProps.data.id)"
            />
          </template>
        </Column>
      </DataTable>
      <div
        class="flex flex-column align-items-end p-4 gap-2 text-xl font-medium"
      >
        <div>Total: {{ total }} {{ total > 1 ? "products" : "product" }}</div>
        <div>Cost: ${{ totalCost.toFixed(2) }}</div>
      </div>
    </div>
    <h3 v-else class="text-center text-gray-500">The Cart is Empty</h3>
  </div>
</template>

<script setup>
import { useCartStore } from "@/store/cart";
import { storeToRefs } from "pinia";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const formatPrice = (price, quantity, discount = 0) =>
  (price - (discount * price) / 100).toFixed(2);

const store = useCartStore();
const { removeProduct, increaseQuantity, decreaseQuantity } = store;
const { cart, total, totalCost } = storeToRefs(store);

const confirm = useConfirm();
const toast = useToast();

const deleteConfirm = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to delete this product?",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    rejectClass: "p-button-secondary",
    header: "Product removing",
    group: "dialog",
    accept: () => {
      removeProduct(id);
      toast.add({
        severity: "success",
        summary: "Deleted",
        detail: "Product was removed from cart",
        life: 3000,
      });
    },
  });
};
</script>

<style scoped></style>
