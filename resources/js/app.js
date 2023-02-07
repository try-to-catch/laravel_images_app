import './bootstrap';
import { createApp } from 'vue';

const app = createApp({});

import App from './App.vue';
app.component('v-app', App);

app.mount('#app');
