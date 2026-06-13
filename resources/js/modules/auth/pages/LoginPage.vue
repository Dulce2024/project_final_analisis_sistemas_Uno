<template>
    <section class="login">
        <div class="login__card">
            <h2 class="login__title">
                Iniciar sesión
            </h2>
            <p class="login__desc">
                Ingresa tus credenciales para acceder al sistema.
            </p>

            <ErrorMessage
                v-if="errorMessage"
                :message="errorMessage"
                title="Error al iniciar sesión"
                inline
            />

            <form class="login__form" @submit.prevent="handleSubmit" v-if="!loading">
                <label class="login__label">
                    ID de tenant (X-Tenant-ID)
                    <input
                        v-model="tenantId"
                        class="login__input"
                        type="text"
                        required
                        autocomplete="off"
                        :disabled="submitting"
                    >
                </label>
                <label class="login__label">
                    Correo
                    <input
                        v-model="email"
                        class="login__input"
                        type="email"
                        required
                        autocomplete="username"
                        :disabled="submitting"
                    >
                </label>
                <label class="login__label">
                    Contraseña
                    <input
                        v-model="password"
                        class="login__input"
                        type="password"
                        required
                        autocomplete="current-password"
                        :disabled="submitting"
                    >
                </label>
                <button class="login__submit" type="submit" :disabled="submitting">
                    <LoadingSpinner
                        v-if="submitting"
                        size="sm"
                        text=""
                    />
                    <span v-else>Entrar</span>
                </button>
            </form>

            <LoadingSpinner v-if="submitting && !errorMessage" text="Validando credenciales…" />
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoadingSpinner from '@/shared/components/LoadingSpinner.vue';
import ErrorMessage from '@/shared/components/ErrorMessage.vue';

const router = useRouter();
const auth = useAuthStore();

const tenantId = ref(auth.tenantId ?? '');
const email = ref('');
const password = ref('');
const submitting = ref(false);
const errorMessage = ref('Credenciales inválidas. Verifica tu correo y contraseña.');

async function handleSubmit() {
    errorMessage.value = '';
    submitting.value = true;

    try {
        auth.setTenantId(tenantId.value);
        await auth.login({
            email: email.value,
            password: password.value,
        });
        await router.push({ name: 'home' });
    } catch (error) {
        const message = error?.response?.data?.message
            ?? error?.response?.data?.errors?.email?.[0]
            ?? 'No fue posible iniciar sesión.';
        errorMessage.value = message;
    } finally {
        submitting.value = false;
    }
}
</script>

<style scoped>
.login {
    display: flex;
    justify-content: center;
    padding-top: 2rem;
}

.login__card {
    width: 100%;
    max-width: 420px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}

.login__title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
}

.login__desc {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0 0 1rem;
}

.login__form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.login__label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.9rem;
    color: #334155;
}

.login__input {
    border: 1px solid #cbd5f5;
    border-radius: 8px;
    padding: 0.65rem 0.75rem;
    font-size: 1rem;
}

.login__input:disabled {
    background: #f1f5f9;
    cursor: not-allowed;
}

.login__submit {
    margin-top: 0.5rem;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    background: #2563eb;
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
}

.login__submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.login__submit:hover:not(:disabled) {
    background: #1d4ed8;
}
</style>
