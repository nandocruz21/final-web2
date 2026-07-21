import api from './api';

export const publicService = {
    getHomeData: () => api.get('/home'),
    checkRapor: (query: string = '') => query ? api.get(`/cek-rapor?q=${query}`) : api.get('/cek-rapor'),
    searchSantri: (query: string) => api.get(`/cek-rapor?q=${query}`),
    getRiwayat: (id: string | number) => api.get(`/riwayat/${id}`),
    downloadRaporPdf: (id: string | number) => api.get(`/cetak-rapor/${id}`, { responseType: 'blob' }),
    getPengumuman: (kategori: string, page: number, search: string) => {
        let url = `/pengumuman?kategori=${kategori}&page=${page}`;
        if (search) url += `&q=${search}`;
        return api.get(url);
    },
    getAllTestimoni: () => api.get('/testimoni'),
    submitTestimoni: (data: any) => api.post('/testimoni', data),
    submitContactMessage: (data: any) => api.post('/hubungi', data)
};
