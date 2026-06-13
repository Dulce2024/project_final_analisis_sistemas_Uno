import { ref } from 'vue';

export function useAsyncState() {
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const errorMessage = ref('');

    function reset() {
        data.value = null;
        loading.value = false;
        error.value = null;
        errorMessage.value = '';
    }

    function setError(err) {
        error.value = err;
        errorMessage.value = err?.response?.data?.message
            ?? err?.response?.data?.errors?.[0]
            ?? err?.message
            ?? 'Ocurrió un error inesperado.';
    }

    async function execute(asyncFn) {
        loading.value = true;
        error.value = null;
        errorMessage.value = '';

        try {
            const result = await asyncFn();
            data.value = result;
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            loading.value = false;
        }
    }

    const isEmpty = () => !loading.value && !error.value && data.value !== null
        && (Array.isArray(data.value) ? data.value.length === 0
            : typeof data.value === 'object' && Object.keys(data.value).length === 0);

    return {
        data,
        loading,
        error,
        errorMessage,
        execute,
        reset,
        setError,
        isEmpty,
    };
}
