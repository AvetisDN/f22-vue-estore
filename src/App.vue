<script setup>
import NavBar from "@/components/NavBar.vue";
import { useProductStore } from "@/store/products";
import { onMounted } from "vue";

const {
  fetchAllProducts,
  fetchAllCategories,
  fetchLatestProducts,
  fetchSmartphones,
  fetchLaptops,
} = useProductStore();
onMounted(() => {
  fetchAllProducts();
  fetchAllCategories();
  fetchLatestProducts();
  fetchSmartphones();
  fetchLaptops();
});
</script>

<template>
  <ConfirmDialog group="dialog" />
  <ConfirmPopup group="popup" />
  <Toast position="bottom-right" />
  <div class="w-full min-h-screen surface-ground">
    <NavBar />
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>
