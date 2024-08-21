import React, { useState } from 'react';
import './output.css';

function App() {
  const [formFields, setFormFields] = useState({
    drugName: '',
    adultDose: '',
    drugStrength: '',
    weight: '',
  });

  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [unit] = useState('mg');
  const [showCalculations, setShowCalculations] = useState(false);

  const handleAnotherCalculation = () => {
    setFormFields({
      drugName: '',
      adultDose: '',
      drugStrength: '',
      weight: '',
    });
    setResult(null);
    setProgress(0);
    setShowCalculations(false);
  };

  const updateProgress = () => {
    const filledFields = Object.values(formFields).filter(Boolean).length;
    setProgress((filledFields / Object.keys(formFields).length) * 100);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'adultDose' || name === 'weight') {
      // Ensure only valid numeric input
      const numericValue = value.replace(/[^0-9.]/g, '');
      setFormFields((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormFields((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputBlur = () => {
    updateProgress();
  };

  const calculateDosage = () => {
    const adultDose = parseFloat(formFields.adultDose);
    const weight = parseFloat(formFields.weight);
    if (isNaN(adultDose) || isNaN(weight)) {
      // Display error message using a toast or alert
      alert('Please enter valid numbers for the Inputs.');
      return;
    }
    let dosage = adultDose * weight;

    setResult({
      dosage,
      dispenseMethod: 'Oral suspension',
      strength: `${formFields.drugStrength} ${unit}`,
      instructions: `${dosage} ${unit} per day`,
    });
    setShowCalculations(true);
  };

  return (
    <div
      className="bg-base-200 absolute inset-0 bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url('/doctor_gradient.png')`,
      }}
    >
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md py-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button className="btn btn-ghost" tabIndex={0} aria-label="Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <button onClick={() => window.location.href = '/'}>Calculator</button>
              </li>
              <li>
                <button>About</button>
              </li>
              <li>
                <button>Database</button>
              </li>
            </ul>
          </div>
          <button onClick={() => window.location.href = '/'} className="btn btn-ghost text-xl">
            <img
              src="/logo.svg"
              style={{ width: '12rem' }}
              className="object-cover"
              alt="logo"
            />
          </button>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-4 space-x-4 text-lg font-medium">
            <li><button onClick={() => window.location.href = '/'}>Calculator</button></li>
            <li><button>About</button></li>
            <li><button>Database</button></li>
          </ul>
        </div>
        <div className="navbar-end mx-4">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="theme-controller" value="dracula" />

            {/* sun icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>

      <section className="flex flex-col items-center justify-center p-8 mt-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-base-500 mb-4 w-full">Pediatric Dosage Calculator</h1>
          {/* Form Section */}
          <div className="bg-base-100 shadow-xl rounded-xl p-8 space-y-8 max-w-x w-full">
            {!result ? (
              <>
                <input
                  type="text"
                  name="drugName"
                  placeholder="Drug Name"
                  className="input input-bordered w-full"
                  value={formFields.drugName}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                <input
                  type="number"
                  name="adultDose"
                  placeholder="Adult Dose (mg/day):"
                  className="input input-bordered w-full"
                  value={formFields.adultDose}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                <input
                  type="number"
                  name="drugStrength"
                  placeholder="Drug Strength"
                  className="input input-bordered w-full"
                  value={formFields.drugStrength}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight (kg)"
                  className="input input-bordered w-full"
                  value={formFields.weight}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                <button className="btn bg-blue-400 hover:bg-blue-500 w-full" onClick={calculateDosage}>Calculate</button>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-accent h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <div className="result bg-gray-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Dosage Information:</h2>
                <p className="text-lg mb-2"><strong>Total Dosage:</strong> {result.dosage} mg/day</p>
                <p className="text-lg mb-2"><strong>Dispense Method:</strong> {result.dispenseMethod}</p>
                <p className="text-lg mb-2"><strong>Strength:</strong> {result.strength}</p>
                <p className="text-lg mb-4"><strong>Instructions:</strong> {result.instructions}</p>
                {showCalculations && (
                  <div className="bg-gray-200 p-4 rounded-lg mt-4">
                    <h3 className="text-xl font-semibold mb-2">Calculations:</h3>
                    <p><strong>Adult Dose:</strong> {formFields.adultDose} mg/day</p>
                    <p><strong>Weight:</strong> {formFields.weight} kg</p>
                    <p><strong>Calculated Dosage:</strong> {result.dosage} {unit} per day</p>
                  </div>
                )}
                <button
                  className="btn bg-green-400 hover:bg-green-500 text-white w-full py-2 rounded-lg mt-4"
                  onClick={() => setShowCalculations(!showCalculations)}
                >
                  {showCalculations ? 'Hide Calculations' : 'Show Calculations'}
                </button>
                <button
                  className="btn bg-blue-400 hover:bg-blue-500 text-white w-full py-2 rounded-lg mt-4"
                  onClick={handleAnotherCalculation}
                >
                  Calculate Another
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
