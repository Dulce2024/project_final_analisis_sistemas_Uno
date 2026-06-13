<template>
    <div class="loading" :class="[`loading--${size}`, { 'loading--overlay': overlay }]">
        <div class="loading__spinner" :class="`loading__spinner--${variant}`">
            <template v-if="variant === 'dots'">
                <span class="loading__dot" />
                <span class="loading__dot" />
                <span class="loading__dot" />
            </template>
            <template v-else-if="variant === 'skeleton'">
                <div class="loading__skeleton-line" />
                <div class="loading__skeleton-line" />
                <div class="loading__skeleton-line loading__skeleton-line--short" />
            </template>
        </div>
        <p v-if="text" class="loading__text">{{ text }}</p>
    </div>
</template>

<script setup>
defineProps({
    size: {
        type: String,
        default: 'md',
        validator: (v) => ['sm', 'md', 'lg'].includes(v),
    },
    variant: {
        type: String,
        default: 'spinner',
        validator: (v) => ['spinner', 'dots', 'skeleton'].includes(v),
    },
    text: {
        type: String,
        default: '',
    },
    overlay: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped>
.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 2rem;
    color: #64748b;
}

.loading--sm { gap: 0.5rem; padding: 1rem; }
.loading--lg { gap: 1rem; padding: 3rem; }

.loading--overlay {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.8);
    border-radius: inherit;
    z-index: 10;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading__spinner {
    border: 3px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}

.loading--sm .loading__spinner--spinner { width: 20px; height: 20px; border-width: 2px; }
.loading--md .loading__spinner--spinner { width: 32px; height: 32px; }
.loading--lg .loading__spinner--spinner { width: 48px; height: 48px; border-width: 4px; }

.loading__spinner--dots {
    display: flex;
    gap: 0.35rem;
    border: none;
    animation: none;
}

.loading__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #2563eb;
    animation: bounce 1.2s infinite ease-in-out;
}

.loading__dot:nth-child(2) { animation-delay: 0.2s; }
.loading__dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
}

.loading__spinner--skeleton {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;
    max-width: 400px;
    border: none;
    animation: none;
}

.loading__skeleton-line {
    height: 14px;
    border-radius: 8px;
    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.loading__skeleton-line--short { width: 60%; }

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.loading__text {
    font-size: 0.9rem;
    margin: 0;
    text-align: center;
}
</style>
