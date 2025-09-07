import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseChart from './ExpenseChart';
import CategoryFilter from './CategoryFilter';
import DateRangeFilter from './DateRangeFilter';

const ExpenseList = () => {
  const { expenses, total, loading, error, removeExpense, setEditingExpense, filters, setFilters } = useExpenses();
  const [showChart, setShowChart] = useState(false);

  const handleCategoryFilter = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleDateRangeFilter = (startDate, endDate) => {
    setFilters(prev => ({ ...prev, startDate, endDate }));
  };

  const clearFilters = () => {
    setFilters({ category: '', startDate: null, endDate: null });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-green-100 text-green-800',
      Transport: 'bg-blue-100 text-blue-800',
      Shopping: 'bg-purple-100 text-purple-800',
      Entertainment: 'bg-yellow-100 text-yellow-800',
      Utilities: 'bg-red-100 text-red-800',
      Others: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Expense Summary</h2>
          <button
            onClick={() => setShowChart(!showChart)}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
          >
            {showChart ? 'Hide Chart' : 'Show Chart'}
          </button>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-gray-600">Total Expenses:</span>
            <span className="ml-2 text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex space-x-2">
            {(filters.category || filters.startDate || filters.endDate) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1 bg-gray-500 text-white rounded-md text-sm hover:bg-gray-600"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        {showChart && <ExpenseChart expenses={expenses} />}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <CategoryFilter 
            selectedCategory={filters.category}
            onSelectCategory={handleCategoryFilter}
          />
          <DateRangeFilter
            startDate={filters.startDate}
            endDate={filters.endDate}
            onDateRangeChange={handleDateRangeFilter}
          />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Expense History</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No expenses found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{expense.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${expense.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setEditingExpense(expense)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeExpense(expense._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;