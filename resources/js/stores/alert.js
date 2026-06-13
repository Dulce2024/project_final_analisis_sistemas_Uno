import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
    state: () => ({
        message: '',
        type: 'info',
        visible: false,
    }),
    actions: {
        show(message, type = 'info') {
            this.message = message;
            this.type = type;
            this.visible = true;
        },
        dismiss() {
            this.visible = false;
            this.message = '';
        },
    },
});
