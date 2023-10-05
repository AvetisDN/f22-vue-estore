<template>
  <div class="flex flex-column gap-4 p-4">
    <h1>Home</h1>
    <ProductCarousel
      title="Latest Products"
      icon="pi pi-thumbs-up-fill"
      :products="latestProducts"
    />
    <ProductCarousel title="Smartphones" :products="smartphonesProducts" />
    <ProductCarousel title="Laptops" :products="laptopsProducts" />
  </div>
</template>

<script setup>
import { useProductStore } from "@/store/products";
import { storeToRefs } from "pinia";
import ProductCarousel from "@/components/ProductCarousel.vue";

const store = useProductStore();
const { latestProducts, smartphonesProducts, laptopsProducts } =
  storeToRefs(store);

console.log(latestProducts.value);
</script>

<style scoped></style>
