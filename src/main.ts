import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"; //импорт css для Element Plus
import "./styles/main.scss";

const app = createApp(App);

app.use(createPinia);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
