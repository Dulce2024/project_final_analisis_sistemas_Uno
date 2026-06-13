<template>
    <Transition name="alert-slide">
        <div v-if="visible" class="app-alert" :class="`app-alert--${type}`">
            <span class="app-alert__icon">
                <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <svg v-else-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
            </span>
            <p class="app-alert__message">{{ message }}</p>
            <button v-if="dismissible" class="app-alert__close" type="button" @click="dismiss"
                aria-label="Cerrar alerta">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    </Transition>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue';

const props = defineProps({
    message: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'info',
        validator: (v) => ['info', 'success', 'warning', 'error'].includes(v),
    },
    dismissible: {
        type: Boolean,
        default: true,
    },
    duration: {
        type: Number,
        default: 0,
    },
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue', 'dismiss']);

const visible = ref(props.modelValue);
let timer = null;

watch(() => props.modelValue, (val) => {
    visible.value = val;
    if (val && props.duration > 0) {
        startTimer();
    }
});

watch(visible, (val) => {
    emit('update:modelValue', val);
    if (!val) {
        emit('dismiss');
    }
});

function startTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        visible.value = false;
    }, props.duration);
}

function dismiss() {
    visible.value = false;
}

function show() {
    visible.value = true;
    if (props.duration > 0) {
        startTimer();
    }
}

onBeforeUnmount(() => {
    clearTimeout(timer);
});

defineExpose({ show, dismiss });
</script>

<style scoped>
.app-alert {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
}

.app-alert--info {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1e40af;
}

.app-alert--success {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
}

.app-alert--warning {
    background: #fffbeb;
    border: 1px solid #fde68a;
    color: #92400e;
}

.app-alert--error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
}

.app-alert__icon {
    flex-shrink: 0;
    display: flex;
}

.app-alert__message {
    flex: 1;
    margin: 0;
    line-height: 1.4;
}

.app-alert__close {
    flex-shrink: 0;
    background: none;
    border: none;
    padding: 0.2rem;
    cursor: pointer;
    opacity: 0.6;
    color: inherit;
}

.app-alert__close:hover {
    opacity: 1;
}

.alert-slide-enter-active,
.alert-slide-leave-active {
    transition: all 0.25s ease;
}

.alert-slide-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.alert-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
