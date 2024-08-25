import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    setError(null);
    setResponse(null);

    try {
      // Validate JSON
      const parsedInput = JSON.parse(input);

      // Call API
      const result = await axios.post('https://your-api-url.vercel.app/bfhl', parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON or API error');
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions || []);
  };

  const renderResponse = () => {
    if (!response) return null;

    const options = selectedOptions.map(option => option.value);
    const filteredResponse = {};

    if (options.includes('Alphabets') && response.alphabets) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (options.includes('Numbers') && response.numbers) {
      filteredResponse.numbers = response.numbers;
    }
    if (options.includes('Highest lowercase alphabet') && response.highest_lowercase_alphabet) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h2>Response:</h2>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  const dropdownOptions = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
  ];

  return (
    <div className="App">
      <h1>Your Roll Number</h1> {/* Replace with your roll number */}
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Enter JSON here"
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      {response && (
        <Select
          options={dropdownOptions}
          isMulti
          onChange={handleSelectChange}
        />
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
