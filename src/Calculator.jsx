import React from 'react';
import { Link } from 'react-router-dom';

function Calculator({ input, handleClick, handleClear, handleBackspace, handleCalculate, isScientific, toggleScientificMode, isDarkMode }) {
  const handleButtonClick = (value) => {
    handleClick(value);
    document.getElementById(value).classList.add('bg-blue-700');
    setTimeout(() => {
      document.getElementById(value).classList.remove('bg-blue-700');
    }, 100);
  };

  const handleBackspaceClick = () => {
    if (['Invalid input', 'Add more than one number in operation', 'Cannot divide by zero', 'Error', 'Infinity'].includes(input)) {
      handleClear();
    } else {
      handleBackspace();
    }
  };

  const isErrorMessage = ['Invalid input', 'Add more than one number in operation', 'Cannot divide by zero', 'Error', 'Infinity'].includes(input);

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className={`mb-4 text-right text-3xl font-mono p-4 rounded input-display ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} ${isErrorMessage ? 'error-message' : ''}`}>{input}</div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {['7', '8', '9', '/'].map((value) => (
          <button
            key={value}
            id={value}
            onClick={() => handleButtonClick(value)}
            className={`p-4 rounded ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {value}
          </button>
        ))}
        {['4', '5', '6', '*'].map((value) => (
          <button
            key={value}
            id={value}
            onClick={() => handleButtonClick(value)}
            className={`p-4 rounded ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {value}
          </button>
        ))}
        {['1', '2', '3', '-'].map((value) => (
          <button
            key={value}
            id={value}
            onClick={() => handleButtonClick(value)}
            className={`p-4 rounded ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {value}
          </button>
        ))}
        {['0', '.', '=', '+'].map((value) => (
          <button
            key={value}
            id={value}
            onClick={() => value === '=' ? handleCalculate() : handleButtonClick(value)}
            className={`p-4 rounded ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {value}
          </button>
        ))}
        {isScientific && (
          <>
            {['sqrt', 'log', 'sin', 'cos', 'tan', '^'].map((value) => (
              <button
                key={value}
                id={value}
                onClick={() => handleButtonClick(value)}
                className={`p-4 rounded ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                {value}
              </button>
            ))}
          </>
        )}
        <button
          onClick={handleClear}
          className={`col-span-2 p-4 rounded ${isDarkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
        >
          Clear
        </button>
        <button
          onClick={handleBackspaceClick}
          className={`col-span-2 p-4 rounded ${isDarkMode ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
        >
          Backspace
        </button>
        <button
          onClick={toggleScientificMode}
          className={`col-span-4 p-4 rounded ${isDarkMode ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
        >
          {isScientific ? 'Standard Mode' : 'Scientific Mode'}
        </button>
        <Link to="/history" className={`col-span-4 p-4 rounded text-center ${isDarkMode ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}>
          View History
        </Link>
      </div>
    </div>
  );
}

export default Calculator;