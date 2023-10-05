<template>
  <div class="flex flex-column gap-2" v-if="products">
    <h2 class="flex align-items-center gap-1">
      <i :class="icon" class="text-primary" v-if="icon"></i>
      {{ title }}
    </h2>
    <Carousel
      :value="products"
      num-visible="3"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <div class="p-2">
          <ProductCard :product="slotProps.data" />
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import ProductCard from "@/components/ProductCard.vue";
import { ref } from "vue";

const props = defineProps(["title", "icon", "products"]);

const responsiveOptions = ref([
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "991px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<style>
@media (min-width: 1248px) {
  .p-carousel {
    width: calc(100% + 96px);
    transform: translateX(-48px);
  }
}
</style>
