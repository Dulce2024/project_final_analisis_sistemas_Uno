<template>
    <div class="empty-state">
        <div class="empty-state__icon" v-if="icon || showDefaultIcon">
            <span v-if="icon" v-html="icon" />
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        </div>
        <h3 class="empty-state__title">{{ title }}</h3>
        <p v-if="message" class="empty-state__message">{{ message }}</p>
        <slot />
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: 'Sin datos disponibles',
    },
    message: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
    showDefaultIcon: {
        type: Boolean,
        default: true,
    },
});
</script>

<style scoped>
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
    text-align: center;
    color: #94a3b8;
}

.empty-state__icon {
    margin-bottom: 1rem;
    opacity: 0.5;
}

.empty-state__title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #64748b;
    margin: 0 0 0.35rem;
}

.empty-state__message {
    font-size: 0.9rem;
    color: #94a3b8;
    margin: 0;
    max-width: 360px;
    line-height: 1.5;
}
</style>
