import React from 'react';
import { Link } from 'react-router-dom';

function History({ history, handleClearHistory, handleDeleteHistoryItem, isDarkMode }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">History</h2>
        <button
          onClick={handleClearHistory}
          className={`p-2 rounded ${isDarkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
        >
          Clear History
        </button>
      </div>
      {history.length === 0 ? (
        <p className="text-center text-gray-500">No history found</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{item.expression} = {item.result}</span>
              <button
                onClick={() => handleDeleteHistoryItem(index)}
                className={`p-2 rounded ${isDarkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/" className={`p-2 rounded ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
        Back to Calculator
      </Link>
    </div>
  );
}

export default History;