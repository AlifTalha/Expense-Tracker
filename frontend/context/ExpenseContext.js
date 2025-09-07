import { createContext, useContext, useState, useEffect } from 'react';
import { getExpenses, addExpense as apiAddExpense, updateExpense as apiUpdateExpense, deleteExpense as apiDeleteExpense } from '../utils/api';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    startDate: null,
    endDate: null
  });

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const { data } = await getExpenses();
      let filteredExpenses = data.expenses;
      
      // Apply filters
      if (filters.category) {
        filteredExpenses = filteredExpenses.filter(
          exp => exp.category === filters.category
        );
      }
      
      if (filters.startDate) {
        filteredExpenses = filteredExpenses.filter(
          exp => new Date(exp.date) >= filters.startDate
        );
      }
      
      if (filters.endDate) {
        filteredExpenses = filteredExpenses.filter(
          exp => new Date(exp.date) <= filters.endDate
        );
      }
      
      setExpenses(filteredExpenses);
      setTotal(filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expense) => {
    try {
      const { data } = await apiAddExpense(expense);
      setExpenses([data, ...expenses]);
      setTotal(total + data.amount);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || err.message };
    }
  };

  const updateExpense = async (id, expense) => {
    try {
      const { data } = await apiUpdateExpense(id, expense);
      setExpenses(expenses.map(exp => 
        exp._id === id ? data : exp
      ));
      setTotal(expenses.reduce((sum, exp) => sum + exp.amount, 0));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || err.message };
    }
  };

  const removeExpense = async (id) => {
    try {
      await apiDeleteExpense(id);
      const removedExpense = expenses.find(exp => exp._id === id);
      setExpenses(expenses.filter(exp => exp._id !== id));
      setTotal(total - removedExpense.amount);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || err.message };
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        total,
        loading,
        error,
        editingExpense,
        setEditingExpense,
        createExpense,
        updateExpense,
        removeExpense,
        filters,
        setFilters
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);