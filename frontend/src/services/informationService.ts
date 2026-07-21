import api from './api';

export const informationService = {
    getAll: (page = 1) => api.get(`/admin/informasi?page=${page}`),
    create: (data: any) => api.post('/admin/informasi', data),
    update: (id: string | number, data: any) => api.put(`/admin/informasi/${id}`, data),
    delete: (id: string | number) => api.delete(`/admin/informasi/${id}`)
};
