import './bootstrap';
import '../css/app.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useAppStore } from '@/stores/app';

const app = createApp(App);

app.use(createPinia());
app.use(router);

router.beforeEach(() => {
    const appStore = useAppStore();
    appStore.setRouteLoading(true);
});

router.afterEach(() => {
    const appStore = useAppStore();
    appStore.setRouteLoading(false);
});

app.mount('#app');
