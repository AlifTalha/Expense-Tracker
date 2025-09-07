import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/expenses',
});

export const getExpenses = () => api.get('/');
export const addExpense = (expense) => api.post('/', expense);
export const updateExpense = (id, expense) => api.patch(`/${id}`, expense);
export const deleteExpense = (id) => api.delete(`/${id}`);

