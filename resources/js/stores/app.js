import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        routeLoading: false,
    }),
    actions: {
        setRouteLoading(value) {
            this.routeLoading = value;
        },
    },
});
