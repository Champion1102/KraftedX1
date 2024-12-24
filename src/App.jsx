import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calculator from './Calculator';
import History from './History';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [isScientific, setIsScientific] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (key >= '0' && key <= '9') {
        handleClick(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleClick(key);
      } else if (key === 'Enter') {
        handleCalculate();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  const handleClick = (value) => {
    // Clear the input if it contains an error message
    if (['Invalid input', 'Add more than one number in operation', 'Cannot divide by zero', 'Error', 'Infinity'].includes(input)) {
      setInput(value);
    } else {
      setInput(input + value);
    }
  };

  const handleClear = () => {
    setInput('');
  };

  const handleBackspace = () => {
    if (input.length > 0) {
      setInput(input.slice(0, -1));
    }
  };

  const handleCalculate = () => {
    try {
      // Check for invalid input
      if (/[^0-9+\-*/().^%sqrtlogsincoatan]/.test(input)) {
        setInput('Invalid input');
        return;
      }

      // Check if input consists only of operators
      if (/^[+\-*/().^%sqrtlogsincoatan]+$/.test(input)) {
        setInput('Invalid input');
        return;
      }

      // Check for incomplete operations
      if (/[\+\-\*/^%]$/.test(input)) {
        setInput('Add more than one number in operation');
        return;
      }

      // Check for division by zero
      if (input.includes('/0')) {
        setInput('Cannot divide by zero');
        return;
      }

      // Evaluate the expression
      const result = eval(input.replace(/sqrt/g, 'Math.sqrt').replace(/log/g, 'Math.log10').replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan').replace(/\^/g, '**'));

      // Check for infinity
      if (result === Infinity || result === -Infinity) {
        setInput('Infinity');
      } else {
        setInput(result.toString());
      }

      // Update history
      setHistory([...history, { expression: input, result: result.toString() }]);
    } catch {
      setInput('Error');
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleDeleteHistoryItem = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  const toggleScientificMode = () => {
    setIsScientific(!isScientific);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`bg-pattern ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="calculator-container">
          <div className="header">
            <h1>Calculator</h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="mb-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <Routes>
            <Route
              path="/"
              element={
                <Calculator
                  input={input}
                  handleClick={handleClick}
                  handleClear={handleClear}
                  handleBackspace={handleBackspace}
                  handleCalculate={handleCalculate}
                  isScientific={isScientific}
                  toggleScientificMode={toggleScientificMode}
                  isDarkMode={isDarkMode}
                />
              }
            />
            <Route
              path="/history"
              element={
                <History
                  history={history}
                  handleClearHistory={handleClearHistory}
                  handleDeleteHistoryItem={handleDeleteHistoryItem}
                  isDarkMode={isDarkMode}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;