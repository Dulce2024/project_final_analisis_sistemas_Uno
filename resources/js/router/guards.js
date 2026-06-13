export function authGuard(to, from, next) {
    const token = localStorage.getItem('auth_token');
    const noToken = !token || token === 'undefined' || token === 'null';

    if (to.meta.requiresAuth && noToken) {
        next({ name: 'login' });

        return;
    }

    if (to.meta.guest && !noToken) {
        next({ name: 'home' });

        return;
    }

    next();
}
