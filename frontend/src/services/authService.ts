import api from './api';

export const authService = {
    login: (credentials: any) => api.post('/login', credentials),
    logout: () => api.post('/logout'),
    check: () => api.get('/auth/check'),
    updateProfile: (data: any) => api.put('/admin/profil', data),
    updateFoto: (data: FormData) => api.post('/admin/profil/foto', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
};
