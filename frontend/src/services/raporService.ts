import api from './api';

export const raporService = {
    getAll: (page = 1, date = '', search = '') => 
        api.get(`/admin/rapor?page=${page}&date=${date}&search=${search}`),
    create: (data: any) => api.post('/admin/rapor', data),
    update: (id: string | number, data: any) => api.put(`/admin/rapor/${id}`, data),
    delete: (id: string | number) => api.delete(`/admin/rapor/${id}`)
};
