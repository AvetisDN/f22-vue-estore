import { defineStore } from "pinia";
import { ref, toRaw, watch } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);
  if (localStorage.getItem("primevue-cart")) {
    cart.value = JSON.parse(localStorage.getItem("primevue-cart"));
  }
  const total = ref(0);
  const totalCost = ref(0);

  const addProduct = (product) => {
    const index = cart.value.findIndex((item) => item.id === product.id);
    let tmp = cart.value;
    if (index !== -1) {
      tmp[index].quantity += 1;
    } else {
      product.quantity = 1;
      product.label = product.title;
      tmp.push(product);
    }
    cart.value = [...tmp];
  };
  const removeProduct = (id) => {
    let tmp = cart.value;
    const index = tmp.findIndex((item) => item.id === id);
    tmp.splice(index, 1);
    cart.value = [...tmp];
  };
  const increaseQuantity = (id) => {
    let tmp = cart.value;
    const index = tmp.findIndex((item) => item.id === id);
    if (tmp[index].quantity < tmp[index].stock) {
      tmp[index].quantity++;
    }
    cart.value = [...tmp];
  };
  const decreaseQuantity = (id) => {
    let tmp = cart.value;
    const index = tmp.findIndex((item) => item.id === id);
    if (tmp[index].quantity > 1) {
      tmp[index].quantity--;
    }
    cart.value = [...tmp];
  };

  const isInCart = (id) =>
    cart.value.findIndex((item) => item.id === id) !== -1;

  const countTotals = () => {
    let quantity = 0;
    let cost = 0;
    cart.value.forEach((item) => {
      quantity += item.quantity;
      cost +=
        item.quantity *
        (item.price - (item.price * item.discountPercentage) / 100);
    });
    total.value = quantity;
    totalCost.value = cost;
  };

  countTotals();

  watch(cart, () => {
    localStorage.setItem("primevue-cart", JSON.stringify(cart.value));
    countTotals();
  });

  return {
    cart,
    total,
    totalCost,
    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    isInCart,
  };
});
