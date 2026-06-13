<template>
    <div class="layout">
        <div v-if="routeLoading" class="layout__route-loading" />

        <header class="layout__header">
            <div class="layout__brand">
                Hospital HIS
            </div>
            <nav class="layout__nav">
                <router-link class="layout__link" to="/">
                    Inicio
                </router-link>
                <router-link v-if="!isAuthenticated" class="layout__link" to="/login">
                    Acceso
                </router-link>
                <button
                    v-if="isAuthenticated"
                    class="layout__logout"
                    type="button"
                    @click="handleLogout"
                    :disabled="loggingOut"
                >
                    <LoadingSpinner v-if="loggingOut" size="sm" />
                    <span v-else>Cerrar sesión</span>
                </button>
            </nav>
        </header>

        <AppAlert
            v-if="alertStore.message"
            :message="alertStore.message"
            :type="alertStore.type"
            :model-value="alertStore.visible"
            @update:model-value="alertStore.dismiss"
        />

        <main class="layout__main">
            <slot />
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useAlertStore } from '@/stores/alert';
import LoadingSpinner from '@/shared/components/LoadingSpinner.vue';
import AppAlert from '@/shared/components/AppAlert.vue';

const router = useRouter();
const auth = useAuthStore();
const alertStore = useAlertStore();
const loggingOut = ref(false);

const isAuthenticated = computed(() => !!auth.token);

defineExpose({
    setRouteLoading(val) { routeLoading.value = val; },
});

const routeLoading = ref(false);

async function handleLogout() {
    loggingOut.value = true;
    try {
        await auth.logout();
        await router.push({ name: 'login' });
    } catch {
        alertStore.show('Error al cerrar sesión.', 'error');
    } finally {
        loggingOut.value = false;
    }
}
</script>

<style scoped>
.layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f8fafc;
    color: #0f172a;
    position: relative;
}

@keyframes route-loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
}

.layout__route-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 25%;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #3b82f6);
    animation: route-loading 1.5s ease-in-out infinite;
    z-index: 100;
}

.layout__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    background: #ffffff;
}

.layout__brand {
    font-weight: 600;
    letter-spacing: 0.02em;
}

.layout__nav {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.layout__link {
    color: #0f172a;
    text-decoration: none;
    font-weight: 500;
}

.layout__link.router-link-active {
    color: #2563eb;
}

.layout__logout {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 0.4rem 0.85rem;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    color: #475569;
    display: flex;
    align-items: center;
    min-height: 34px;
}

.layout__logout:hover:not(:disabled) {
    background: #e2e8f0;
    color: #dc2626;
}

.layout__logout:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.layout__main {
    flex: 1;
    padding: 1.5rem;
    position: relative;
}
</style>
