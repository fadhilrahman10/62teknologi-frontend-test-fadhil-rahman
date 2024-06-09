import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css';

import router from "./router/index.js";

const app = createApp(App);
app.use(router)
app.use(PrimeVue);
app.mount('#app')
