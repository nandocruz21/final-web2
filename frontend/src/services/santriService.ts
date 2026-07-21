import api from './api';

export const santriService = {
    getAll: () => api.get('/admin/santri'),
    getById: (id: string | number) => api.get(`/admin/santri/${id}`),
    create: (data: FormData | any) => api.post('/admin/santri', data, {
        headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
    }),
    update: (id: string | number, data: FormData | any) => api.post(`/admin/santri/${id}`, data, {
        headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
    }),
    delete: (id: string | number) => api.delete(`/admin/santri/${id}`),
    updateStatus: (id: string | number, status: string) => api.post(`/admin/santri/${id}/status`, { status }),
    downloadPdf: (id: string | number) => api.get(`/admin/santri/${id}/report-pdf`, { responseType: 'blob' })
};
