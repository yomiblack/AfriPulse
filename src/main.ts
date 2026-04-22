import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/router';
import { Analytics } from '@vercel/analytics/next';
import App from './App.vue';
import '@/assets/main.css';

const app = createApp(App);

app.use(createPinia()); // register Pinia globally — all stores now available
app.use(router); // register Vue Router
app.component('Analytic', Analytics);
app.mount('#app');
