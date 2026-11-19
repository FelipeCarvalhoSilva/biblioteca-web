import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
});

export const autorService = {
  listar: () => api.get('/autores').then(res => res.data),
  buscar: id => api.get(`/autores/${id}`).then(res => res.data),
  criar: autor => api.post('/autores', autor).then(res => res.data),
  atualizar: (id, autor) => api.put(`/autores/${id}`, autor).then(res => res.data),
  deletar: id => api.delete(`/autores/${id}`)
};

export const livroService = {
  listar: () => api.get('/livros').then(res => res.data),
  buscar: id => api.get(`/livros/${id}`).then(res => res.data),
  criar: livro => api.post('/livros', livro).then(res => res.data),
  atualizar: (id, livro) => api.put(`/livros/${id}`, livro).then(res => res.data),
  deletar: id => api.delete(`/livros/${id}`)
};
