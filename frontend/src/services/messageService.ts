import api from './api';

export const messageService = {
    getAll: () => api.get('/admin/pesan'),
    markAsRead: (id: string | number) => api.post(`/admin/pesan/${id}/baca`),
    delete: (id: string | number) => api.delete(`/admin/pesan/${id}`)
};
