import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangeFilter = ({ startDate, endDate, onDateRangeChange }) => {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  const handleApply = () => {
    onDateRangeChange(localStartDate, localEndDate);
  };

  const handleClear = () => {
    setLocalStartDate(null);
    setLocalEndDate(null);
    onDateRangeChange(null, null);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Filter by Date Range</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Start Date</label>
          <DatePicker
            selected={localStartDate}
            onChange={date => setLocalStartDate(date)}
            selectsStart
            startDate={localStartDate}
            endDate={localEndDate}
            className="w-full p-1 border border-gray-300 rounded text-sm"
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">End Date</label>
          <DatePicker
            selected={localEndDate}
            onChange={date => setLocalEndDate(date)}
            selectsEnd
            startDate={localStartDate}
            endDate={localEndDate}
            minDate={localStartDate}
            className="w-full p-1 border border-gray-300 rounded text-sm"
            placeholderText="Select end date"
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleApply}
          className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          onClick={handleClear}
          className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default DateRangeFilter;