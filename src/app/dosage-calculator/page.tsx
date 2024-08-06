"use client";
import React, { useState } from 'react';
import styles from './PediatricDosageCalculator.module.css';

interface DosageResult {
  dosage: number;
  dispenseMethod: string;
  strength: string;
  instructions: string;
}

const PediatricDosageCalculator: React.FC = () => {
  const [drugName, setDrugName] = useState<string>('');
  const [drugStrength, setDrugStrength] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [bsa, setBsa] = useState<number>(0);
  const [adultDose, setAdultDose] = useState<number>(0);
  const [result, setResult] = useState<DosageResult | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [unit, setUnit] = useState<'mg' | 'mcg'>('mg');
  const [calculationMethod, setCalculationMethod] = useState<string>('weight');

  const medicines = ['Amoxicillin', 'Ibuprofen', 'Paracetamol']; // Example medicines

  const handleDrugNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDrugName(value);
    if (value.length > 0) {
      const filteredSuggestions = medicines.filter(medicine =>
        medicine.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setDrugName(suggestion);
    setSuggestions([]);
  };

  const calculateDosage = (): void => {
    let dosage = 0;

    switch (calculationMethod) {
      case 'weight':
        dosage = adultDose * weight;
        break;
      case 'bsa1':
        dosage = (adultDose * bsa) / 1.73;
        break;
      case 'bsa2':
        dosage = adultDose * bsa;
        break;
      case 'young':
        dosage = adultDose * (age / (age + 12));
        break;
      case 'clark':
        dosage = adultDose * (weight / 150);
        break;
      default:
        break;
    }

    setResult({
      dosage,
      dispenseMethod: 'Oral suspension',
      strength: `${drugStrength} ${unit}`,
      instructions: `${dosage} ${unit} per day`
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pediatric Dosage Calculator</h1>
      <div className={styles.methodToggle}>
        <button
          className={calculationMethod === 'weight' ? styles.activeButton : styles.button}
          onClick={() => setCalculationMethod('weight')}
        >
          Weight
        </button>
        <button
          className={calculationMethod === 'bsa1' ? styles.activeButton : styles.button}
          onClick={() => setCalculationMethod('bsa1')}
        >
          BSA (1)
        </button>
        <button
          className={calculationMethod === 'bsa2' ? styles.activeButton : styles.button}
          onClick={() => setCalculationMethod('bsa2')}
        >
          BSA (2)
        </button>
        <button
          className={calculationMethod === 'young' ? styles.activeButton : styles.button}
          onClick={() => setCalculationMethod('young')}
        >
          Young’s Rule
        </button>
        <button
          className={calculationMethod === 'clark' ? styles.activeButton : styles.button}
          onClick={() => setCalculationMethod('clark')}
        >
          Clark’s Rule
        </button>
      </div>
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); calculateDosage(); }}>
        <div className={styles.inputGroup}>
          <label htmlFor="drugName">Drug Name:</label>
          <input
            id="drugName"
            type="text"
            value={drugName}
            onChange={handleDrugNameChange}
            placeholder="e.g., Amoxicillin"
            className={styles.searchBar}
            required
          />
          {suggestions.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="adultDose">Adult Dose (mg/day):</label>
          <input
            id="adultDose"
            type="number"
            value={adultDose || ''}
            onChange={(e) => setAdultDose(Number(e.target.value))}
            placeholder="Enter adult dose"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="drugStrength">Drug Strength:</label>
          <input
            id="drugStrength"
            type="number"
            value={drugStrength || ''}
            onChange={(e) => setDrugStrength(Number(e.target.value))}
            placeholder={`Enter strength in ${unit}`}
            className={styles.input}
            required
          />
          <button
            type="button"
            className={unit === 'mg' ? styles.activeButton : styles.button}
            onClick={() => setUnit(unit === 'mg' ? 'mcg' : 'mg')}
          >
            {unit === 'mg' ? 'Switch to mcg' : 'Switch to mg'}
          </button>
        </div>
        {calculationMethod === 'weight' || calculationMethod === 'clark' ? (
          <div className={styles.inputGroup}>
            <label htmlFor="weight">Weight ({calculationMethod === 'clark' ? 'lbs' : 'kg'}):</label>
            <input
              id="weight"
              type="number"
              value={weight || ''}
              onChange={(e) => setWeight(Number(e.target.value))}
              placeholder={`Enter weight in ${calculationMethod === 'clark' ? 'lbs' : 'kg'}`}
              className={styles.input}
              required
            />
          </div>
        ) : null}
        {calculationMethod === 'bsa1' || calculationMethod === 'bsa2' ? (
          <div className={styles.inputGroup}>
            <label htmlFor="bsa">Body Surface Area (m²):</label>
            <input
              id="bsa"
              type="number"
              value={bsa || ''}
              onChange={(e) => setBsa(Number(e.target.value))}
              placeholder="Enter BSA in m²"
              className={styles.input}
              required
            />
          </div>
        ) : null}
        {calculationMethod === 'young' ? (
          <div className={styles.inputGroup}>
            <label htmlFor="age">Age (years):</label>
            <input
              id="age"
              type="number"
              value={age || ''}
              onChange={(e) => setAge(Number(e.target.value))}
              placeholder="Enter age in years"
              className={styles.input}
              required
            />
          </div>
        ) : null}
        <button type="submit" className={styles.button}>Calculate Dosage</button>
      </form>

      {result && (
        <div className={styles.result}>
          <h2>Dosage Information:</h2>
          <p><strong>Total Dosage:</strong> {result.dosage} mg/day</p>
          <p><strong>Dispense Method:</strong> {result.dispenseMethod}</p>
          <p><strong>Strength:</strong> {result.strength}</p>
          <p><strong>Instructions:</strong> {result.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default PediatricDosageCalculator;