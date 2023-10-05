import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("products", () => {
  const products = ref([]);
  const latestProducts = ref([]);
  const smartphonesProducts = ref([]);
  const laptopsProducts = ref([]);
  const categories = ref([]);

  const fetchAllProducts = () => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => (products.value = data.products));
  };
  const fetchAllCategories = () => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => (categories.value = data));
  };

  const fetchLatestProducts = () => {
    fetch("https://dummyjson.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => (latestProducts.value = data.products));
  };
  const fetchSmartphones = (slug) => {
    fetch("https://dummyjson.com/products/category/smartphones")
      .then((res) => res.json())
      .then((data) => (smartphonesProducts.value = data.products));
  };
  const fetchLaptops = (slug) => {
    fetch("https://dummyjson.com/products/category/laptops")
      .then((res) => res.json())
      .then((data) => (laptopsProducts.value = data.products));
  };

  return {
    products,
    fetchAllProducts,
    categories,
    fetchAllCategories,
    latestProducts,
    fetchLatestProducts,
    smartphonesProducts,
    fetchSmartphones,
    laptopsProducts,
    fetchLaptops,
  };
});
