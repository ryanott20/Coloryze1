import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteInput = ({ value, onChange, onSelect }) => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('/medicines.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data); // Debugging line
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle selection of an item from the dropdown
  const handleDrugNameSelect = (event, newValue) => {
    if (newValue) {
      onSelect(newValue.name); // Pass the selected drug name to the parent component
    } else {
      onSelect(''); // Handle the case when no value is selected
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if within a form
      const selectedOption = items.find(item => item.name.toLowerCase() === inputValue.toLowerCase());
      if (selectedOption) {
        handleDrugNameSelect(event, selectedOption);
      } else if (inputValue) {
        // If no exact match, select the first option that starts with the input value
        const firstMatch = items.find(item => item.name.toLowerCase().startsWith(inputValue.toLowerCase()));
        if (firstMatch) {
          handleDrugNameSelect(event, firstMatch);
        }
      }
    }
  };

  return (
    <Autocomplete
      options={items}
      getOptionLabel={(option) => option.name || ''}
      value={items.find((item) => item.name === value) || null}
      onChange={handleDrugNameSelect}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Drug Name"
          variant="outlined"
          onKeyDown={handleKeyDown} // Add keydown event handler
          InputProps={{
            ...params.InputProps,
            style: { borderRadius: '12px' } // Apply rounded corners here
          }}
          InputLabelProps={{
            style: { borderRadius: '12px' } // Optional: Ensure label fits with rounded corners
          }}
        />
      )}
      noOptionsText="No options"
    />
  );
};

export default AutocompleteInput;