<template>
    <section class="home">
        <div class="home__header">
            <h1 class="home__title">
                Sistema Hospitalario Integrado
            </h1>
            <p class="home__subtitle">
                Panel principal — Infraestructura base: Laravel 12, Vue 3, JWT y multitenancy por cabecera.
            </p>
        </div>

        <ErrorMessage
            v-if="errorMessage"
            :message="errorMessage"
            :on-retry="loadUserData"
        />

        <LoadingSpinner v-if="loading" variant="skeleton" text="Cargando información del usuario…" />

        <div v-else-if="user" class="home__widgets">
            <div class="home__widget">
                <h3 class="home__widget-title">Usuario</h3>
                <p class="home__widget-value">{{ user.name }}</p>
                <p class="home__widget-label">{{ user.email }}</p>
            </div>
            <div class="home__widget">
                <h3 class="home__widget-title">Tenant</h3>
                <p class="home__widget-value">{{ tenant?.name ?? '—' }}</p>
                <p class="home__widget-label">ID: {{ tenant?.id ?? '—' }}</p>
            </div>
            <div class="home__widget">
                <h3 class="home__widget-title">Rol</h3>
                <p class="home__widget-value">{{ userRole }}</p>
                <p class="home__widget-label">{{ user?.roles?.length ?? 0 > 1 ? 'Múltiples roles' : '' }}</p>
            </div>
            <div class="home__widget">
                <h3 class="home__widget-title">Estado de sesión</h3>
                <p class="home__widget-value home__widget-value--success">Activa</p>
                <p class="home__widget-label">JWT autenticado</p>
            </div>
        </div>

        <EmptyState
            v-else-if="!loading && !errorMessage"
            title="Bienvenido"
            message="Inicia sesión para ver tu información y acceder a los módulos del sistema."
        />
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAsyncState } from '@/shared/composables/useAsyncState';
import api from '@/plugins/axios';
import LoadingSpinner from '@/shared/components/LoadingSpinner.vue';
import EmptyState from '@/shared/components/EmptyState.vue';
import ErrorMessage from '@/shared/components/ErrorMessage.vue';

const auth = useAuthStore();
const user = computed(() => auth.user);
const { loading, errorMessage, execute } = useAsyncState();
const tenant = ref(null);

const userRole = computed(() => {
    if (!user.value?.roles?.length) return 'Sin rol asignado';
    return user.value.roles.map((r) => r.name).join(', ');
});

async function loadUserData() {
    if (!auth.token) return;

    try {
        const result = await execute(async () => {
            const { data } = await api.get('/auth/me');
            return data;
        });
        tenant.value = result?.tenant ?? null;
    } catch {
        // useAsyncState already sets errorMessage
    }
}

onMounted(loadUserData);
</script>

<style scoped>
.home {
    max-width: 860px;
}

.home__header {
    margin-bottom: 1.5rem;
}

.home__title {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
}

.home__subtitle {
    color: #475569;
    line-height: 1.6;
    margin: 0;
}

.home__widgets {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

.home__widget {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1.25rem;
}

.home__widget-title {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #64748b;
    margin: 0 0 0.5rem;
}

.home__widget-value {
    font-size: 1.15rem;
    font-weight: 700;
    margin: 0 0 0.2rem;
    color: #0f172a;
}

.home__widget-value--success {
    color: #16a34a;
}

.home__widget-label {
    font-size: 0.8rem;
    color: #94a3b8;
    margin: 0;
}
</style>
