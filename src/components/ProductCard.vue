<template>
  <Card class="overflow-hidden">
    <template #header>
      <img
        class="w-full h-15rem object-cover"
        :alt="product.title"
        :src="product.thumbnail"
      />
    </template>
    <template #title> {{ product.title }} </template>
    <template #subtitle> {{ product.category }} </template>
    <template #content> </template>
    <template #footer>
      <div class="flex justify-content-between align-items-center">
        <div class="flex flex-column gap-1 font-semibold align-items-end">
          <div class="line-through text-red-400">
            ${{ product.price.toFixed(2) }}
          </div>
          <div class="text-xl">
            ${{ formatPrice(product.price, product.discountPercentage) }}
          </div>
        </div>
        <Button
          class="hidden md:flex"
          :label="isInCart(product.id) ? 'In Cart' : 'Buy'"
          icon="pi pi-shopping-bag"
          @click="addProduct(product)"
          :severity="isInCart(product.id) ? 'secondary' : 'primary'"
          :disabled="isInCart(product.id)"
        />
        <Button
          class="flex md:hidden"
          icon="pi pi-shopping-bag"
          @click="addProduct(product)"
          :severity="isInCart(product.id) ? 'secondary' : 'primary'"
          :disabled="isInCart(product.id)"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { useCartStore } from "@/store/cart";

defineProps(["product"]);

const { addProduct, isInCart } = useCartStore();

const formatPrice = (price, discount = 0) =>
  (price - (discount * price) / 100).toFixed(2);
</script>

<style>
.p-card-content {
  padding: 0rem !important;
}
.p-card-title {
  font-size: 1.25rem !important;
  white-space: nowrap;
}
</style>
