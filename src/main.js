import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "@/assets/theme.css";
import "@/assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import router from "@/router";
import Menubar from "primevue/menubar";
import { createPinia } from "pinia";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Rating from "primevue/rating";
import Menu from "primevue/menu";
import Badge from "primevue/badge";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";
import Card from "primevue/card";
import Carousel from "primevue/carousel";

const pinia = createPinia();

const app = createApp(App);
app.use(PrimeVue, { ripple: true, inputStyle: "filled" });
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Menubar", Menubar);
app.component("Menu", Menu);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Rating", Rating);
app.component("Badge", Badge);
app.component("ConfirmDialog", ConfirmDialog);
app.component("ConfirmPopup", ConfirmPopup);
app.component("Toast", Toast);
app.component("Card", Card);
app.component("Carousel", Carousel);

app.use(ConfirmationService);
app.use(ToastService);
app.use(router);
app.use(pinia);

app.mount("#app");
