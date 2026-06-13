<template>
    <div class="error-message" :class="{ 'error-message--inline': inline }">
        <div class="error-message__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
        </div>
        <div class="error-message__body">
            <p class="error-message__title">{{ title }}</p>
            <p v-if="message" class="error-message__detail">{{ message }}</p>
        </div>
        <button v-if="onRetry" class="error-message__retry" type="button" @click="onRetry">
            Reintentar
        </button>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: 'Ocurrió un error',
    },
    message: {
        type: String,
        default: '',
    },
    onRetry: {
        type: Function,
        default: null,
    },
    inline: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped>
.error-message {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 10px;
    color: #991b1b;
}

.error-message--inline {
    padding: 0.6rem 0.85rem;
    font-size: 0.85rem;
}

.error-message__icon {
    flex-shrink: 0;
    margin-top: 0.1rem;
    opacity: 0.8;
}

.error-message__body {
    flex: 1;
    min-width: 0;
}

.error-message__title {
    font-weight: 600;
    margin: 0;
    font-size: 0.95rem;
}

.error-message__detail {
    margin: 0.25rem 0 0;
    font-size: 0.85rem;
    opacity: 0.85;
    line-height: 1.4;
}

.error-message__retry {
    flex-shrink: 0;
    background: #dc2626;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.4rem 0.85rem;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
}

.error-message__retry:hover {
    background: #b91c1c;
}
</style>
