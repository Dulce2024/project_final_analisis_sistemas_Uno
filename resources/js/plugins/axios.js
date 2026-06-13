import axios from 'axios';
import { useAlertStore } from '@/stores/alert';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? '/api/v1',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    const tenantId = localStorage.getItem('tenant_id');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (tenantId) {
        config.headers['X-Tenant-ID'] = tenantId;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
                const token = localStorage.getItem('auth_token');
                if (token) {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_user');
                    window.location.hash = '#/login';
                    window.location.reload();
                }
            }

            const alertStore = useAlertStore();
            if (status >= 500) {
                alertStore.show(
                    data?.message ?? 'Error interno del servidor.',
                    'error',
                );
            }
        } else if (error.request) {
            const alertStore = useAlertStore();
            alertStore.show(
                'No se pudo conectar con el servidor. Verifica tu conexión.',
                'error',
            );
        }

        return Promise.reject(error);
    },
);

export default api;
