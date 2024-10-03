import React, { useEffect, useState } from 'react';
import './output.css';
import AutocompleteInput from './AutocompleteInput';

const drugData = [
  {
    "name": "Tylenol",
    "generic_name": "Acetaminophen",
    "dosage": {
      "weight_based": "10-15 mg/kg per dose",
      "max_dose_per_day": "75 mg/kg",
      "age_based": {
        "age_range_2_3_years": "160 mg every 4-6 hours",
        "age_range_4_5_years": "240 mg every 4-6 hours"
      }
    }
  },
  {
    "name": "Motrin",
    "generic_name": "Ibuprofen",
    "dosage": {
      "weight_based": "5-10 mg/kg per dose",
      "max_dose_per_day": "40 mg/kg",
      "age_based": {
        "age_range_6_12_months": "50 mg every 6-8 hours",
        "age_range_1_3_years": "100 mg every 6-8 hours"
      }
    }
  },
  {
    "name": "Amoxil",
    "generic_name": "Amoxicillin",
    "dosage": {
      "weight_based": "20-40 mg/kg/day divided into 2-3 doses",
      "max_dose_per_day": "80 mg/kg",
      "age_based": {
        "age_range_1_2_years": "125 mg every 8 hours",
        "age_range_3_5_years": "250 mg every 8 hours"
      }
    }
  },
  {
    "name": "Zithromax",
    "generic_name": "Azithromycin",
    "dosage": {
      "weight_based": "10 mg/kg on day 1, 5 mg/kg on days 2-5",
      "max_dose_per_day": "500 mg",
      "age_based": {
        "age_range_2_3_years": "100 mg once daily for 3 days",
        "age_range_4_5_years": "200 mg once daily for 3 days"
      }
    }
  },
  {
    "name": "Augmentin",
    "generic_name": "Amoxicillin/Clavulanate",
    "dosage": {
      "weight_based": "20-40 mg/kg/day divided into 2 doses",
      "max_dose_per_day": "90 mg/kg",
      "age_based": {
        "age_range_1_2_years": "200 mg every 12 hours",
        "age_range_3_5_years": "400 mg every 12 hours"
      }
    }
  },
  {
    "name": "Benadryl",
    "generic_name": "Diphenhydramine",
    "dosage": {
      "weight_based": "1 mg/kg per dose",
      "max_dose_per_day": "50 mg",
      "age_based": {
        "age_range_2_3_years": "6.25 mg every 4-6 hours",
        "age_range_4-5 years": "12.5 mg every 4-6 hours"
      }
    }
  },
  {
    "name": "Albuterol",
    "generic_name": "Albuterol Sulfate",
    "dosage": {
      "weight_based": "0.15 mg/kg per dose",
      "max_dose_per_day": "2.5 mg/dose",
      "age_based": {
        "age_range_1_2_years": "0.63 mg via nebulizer every 6-8 hours",
        "age_range_3_5 years": "1.25 mg via nebulizer every 6-8 hours"
      }
    }
  },
  {
    "name": "Prednisolone",
    "generic_name": "Prednisolone Sodium Phosphate",
    "dosage": {
      "weight_based": "1-2 mg/kg/day",
      "max_dose_per_day": "60 mg",
      "age_based": {
        "age_range_1_2 years": "5 mg once daily",
        "age_range_3_5 years": "10 mg once daily"
      }
    }
  },
  {
    "name": "Risperdal",
    "generic_name": "Risperidone",
    "dosage": {
      "weight_based": "0.01-0.02 mg/kg/day",
      "max_dose_per_day": "6 mg",
      "age_based": {
        "age_range_6_12 years": "0.25 mg once daily",
        "age_range_13_17 years": "0.5 mg once daily"
      }
    }
  },
  {
    "name": "Keflex",
    "generic_name": "Cephalexin",
    "dosage": {
      "weight_based": "25-50 mg/kg/day divided into 2-4 doses",
      "max_dose_per_day": "4000 mg",
      "age_based": {
        "age_range_1_3 years": "125 mg every 6 hours",
        "age_range_4_5 years": "250 mg every 6 hours"
      }
    }
  },
  {
    "name": "Cefzil",
    "generic_name": "Cefprozil",
    "dosage": {
      "weight_based": "15-30 mg/kg/day in divided doses",
      "max_dose_per_day": "1000 mg",
      "age_based": {
        "age_range_1_2 years": "125 mg twice daily",
        "age_range_3_5 years": "250 mg twice daily"
      }
    }
  },
  {
    "name": "Bactrim",
    "generic_name": "Sulfamethoxazole/Trimethoprim",
    "dosage": {
      "weight_based": "8-12 mg/kg/day divided into 2 doses",
      "max_dose_per_day": "960 mg",
      "age_based": {
        "age_range_2_5 years": "240 mg every 12 hours",
        "age_range_6_12 years": "480 mg every 12 hours"
      }
    }
  },
  {
    "name": "Diflucan",
    "generic_name": "Fluconazole",
    "dosage": {
      "weight_based": "3-12 mg/kg/day",
      "max_dose_per_day": "400 mg",
      "age_based": {
        "age_range_1_2 years": "50 mg daily",
        "age_range_3_5 years": "100 mg daily"
      }
    }
  },
  {
    "name": "Singulair",
    "generic_name": "Montelukast",
    "dosage": {
      "age_based": {
        "age_range_2_5 years": "4 mg once daily",
        "age_range_6_14 years": "5 mg once daily"
      }
    }
  },
  {
    "name": "Claritin",
    "generic_name": "Loratadine",
    "dosage": {
      "age_based": {
        "age_range_2_5 years": "5 mg once daily",
        "age_range_6_12 years": "10 mg once daily"
      }
    }
  },
  {
    "name": "Xyzal",
    "generic_name": "Levocetirizine",
    "dosage": {
      "age_based": {
        "age_range_2_5 years": "1.25 mg once daily",
        "age_range_6_11 years": "2.5 mg once daily"
      }
    }
  },
  {
    "name": "Zyrtec",
    "generic_name": "Cetirizine",
    "dosage": {
      "age_based": {
        "age_range_2_5 years": "2.5-5 mg once daily",
        "age_range_6_11 years": "5-10 mg once daily"
      }
    }
  },
  {
    "name": "Mucinex",
    "generic_name": "Guaifenesin",
    "dosage": {
      "weight_based": "12 mg/kg every 4 hours",
      "max_dose_per_day": "2400 mg",
      "age_based": {
        "age_range_2_3 years": "50-100 mg every 4 hours",
        "age_range_4_5 years": "100-200 mg every 4 hours"
      }
    }
  },
  {
    "name": "Robitussin",
    "generic_name": "Dextromethorphan",
    "dosage": {
      "age_based": {
        "age_range_2_3 years": "2.5 mg every 6-8 hours",
        "age_range_4_5 years": "5 mg every 6-8 hours"
      }
    }
  },
  {
    "name": "Tamiflu",
    "generic_name": "Oseltamivir",
    "dosage": {
      "weight_based": "3 mg/kg/dose twice daily",
      "max_dose_per_day": "150 mg/day",
      "age_based": {
        "age_range_1-12 years": "30-60 mg twice daily"
      }
    }
  },
  {
    "name": "Flonase",
    "generic_name": "Fluticasone",
    "dosage": {
      "age_based": {
        "age_range_2-11 years": "1 spray per nostril once daily",
        "age_range_12+ years": "2 sprays per nostril once daily"
      }
    }
  },
  {
    "name": "Pulmicort",
    "generic_name": "Budesonide",
    "dosage": {
      "age_based": {
        "age_range_1-8 years": "0.25-0.5 mg via nebulizer once daily",
        "age_range_9+ years": "0.5-1 mg via nebulizer once daily"
      }
    }
  },
  {
    "name": "Nasonex",
    "generic_name": "Mometasone",
    "dosage": {
      "age_based": {
        "age_range_2-11 years": "1 spray per nostril once daily",
        "age_range_12+ years": "2 sprays per nostril once daily"
      }
    }
  },
  {
    "name": "Ventolin",
    "generic_name": "Albuterol",
    "dosage": {
      "age_based": {
        "age_range_2-12 years": "1-2 inhalations every 4-6 hours",
        "age_range_13+ years": "2 inhalations every 4-6 hours"
      }
    }
  },
  {
    "name": "Symbicort",
    "generic_name": "Budesonide/Formoterol",
    "dosage": {
      "age_based": {
        "age_range_6-11 years": "2 inhalations twice daily",
        "age_range_12+ years": "2 inhalations twice daily"
      }
    }
  },
  {
    "name": "Advair",
    "generic_name": "Fluticasone/Salmeterol",
    "dosage": {
      "age_based": {
        "age_range_4-11 years": "1 inhalation twice daily",
        "age_range_12+ years": "1 inhalation twice daily"
      }
    }
  },
  {
    "name": "Lantus",
    "generic_name": "Insulin Glargine",
    "dosage": {
      "weight_based": "0.2-0.4 units/kg once daily",
      "age_based": {
        "age_range_6+ years": "10-20 units once daily"
      }
    }
  },
  {
    "name": "Humalog",
    "generic_name": "Insulin Lispro",
    "dosage": {
      "weight_based": "0.1-0.2 units/kg before meals",
      "age_based": {
        "age_range_6+ years": "4-6 units before meals"
      }
    }
  },
  {
    "name": "EpiPen",
    "generic_name": "Epinephrine",
    "dosage": {
      "age_based": {
        "age_range_0-4 years": "0.15 mg intramuscularly",
        "age_range_5+ years": "0.3 mg intramuscularly"
      }
    }
  },
  {
    "name": "Ritalin",
    "generic_name": "Methylphenidate",
    "dosage": {
      "weight_based": "0.3-0.6 mg/kg/day",
      "age_based": {
        "age_range_6-12 years": "5-10 mg twice daily",
        "age_range_13+ years": "10-20 mg twice daily"
      }
    }
  },
  {
    "name": "Adderall",
    "generic_name": "Amphetamine/Dextroamphetamine",
    "dosage": {
      "weight_based": "0.1-0.3 mg/kg/day",
      "age_based": {
        "age_range_6-12 years": "5-10 mg once daily",
        "age_range_13+ years": "10-20 mg once daily"
      }
    }
  },
  {
    "name": "Vyvanse",
    "generic_name": "Lisdexamfetamine",
    "dosage": {
      "age_based": {
        "age_range_6-12 years": "20-30 mg once daily",
        "age_range_13+ years": "30-70 mg once daily"
      }
    }
  },
  {
    "name": "Concerta",
    "generic_name": "Methylphenidate ER",
    "dosage": {
      "age_based": {
        "age_range_6-12 years": "18-54 mg once daily",
        "age_range_13+ years": "18-72 mg once daily"
      }
    }
  },
  {
    "name": "Focalin",
    "generic_name": "Dexmethylphenidate",
    "dosage": {
      "age_based": {
        "age_range_6-12 years": "5-10 mg twice daily",
        "age_range_13+ years": "10-20 mg twice daily"
      }
    }
  },
  {
    "name": "Tenex",
    "generic_name": "Guanfacine",
    "dosage": {
      "age_based": {
        "age_range_6-12 years": "0.5-1 mg daily",
        "age_range_13+ years": "1-2 mg daily"
      }
    }
  },
  {
    "name": "Strattera",
    "generic_name": "Atomoxetine",
    "dosage": {
      "weight_based": "0.5-1.4 mg/kg/day",
      "age_based": {
        "age_range_6+ years": "10-40 mg once daily"
      }
    }
  },
  {
    "name": "Prozac",
    "generic_name": "Fluoxetine",
    "dosage": {
      "age_based": {
        "age_range_8-12 years": "10 mg once daily",
        "age_range_13+ years": "20-40 mg once daily"
      }
    }
  },
  {
    "name": "Zoloft",
    "generic_name": "Sertraline",
    "dosage": {
      "age_based": {
        "age_range_6-12 years": "25 mg once daily",
        "age_range_13+ years": "50-100 mg once daily"
      }
    }
  },
  {
    "name": "Lexapro",
    "generic_name": "Escitalopram",
    "dosage": {
      "age_based": {
        "age_range_12+ years": "10 mg once daily"
      }
    }
  },
  {
    "name": "Celexa",
    "generic_name": "Citalopram",
    "dosage": {
      "age_based": {
        "age_range_6-12 years": "10-20 mg once daily",
        "age_range_13+ years": "20-40 mg once daily"
      }
    }
  },
  {
    "name": "Ativan",
    "generic_name": "Lorazepam",
    "dosage": {
      "weight_based": "0.05-0.1 mg/kg per dose",
      "max_dose_per_day": "4 mg",
      "age_based": {
        "age_range_2-5 years": "0.5-1 mg per dose",
        "age_range_6+ years": "1-2 mg per dose"
      }
    }
  },
  {
    "name": "Valium",
    "generic_name": "Diazepam",
    "dosage": {
      "weight_based": "0.2-0.5 mg/kg every 4-6 hours",
      "max_dose_per_day": "40 mg",
      "age_based": {
        "age_range_2-5 years": "1-2 mg per dose",
        "age_range_6+ years": "5-10 mg per dose"
      }
    }
  },
  {
    "name": "Xanax",
    "generic_name": "Alprazolam",
    "dosage": {
      "age_based": {
        "age_range_6+ years": "0.25-0.5 mg every 6-8 hours"
      }
    }
  },
  {
    "name": "Ritalin LA",
    "generic_name": "Methylphenidate ER",
    "dosage": {
      "age_based": {
        "age_range_6-12 years": "20-60 mg once daily",
        "age_range_13+ years": "40-80 mg once daily"
      }
    }
  },
  {
    "name": "Clonidine",
    "generic_name": "Clonidine",
    "dosage": {
      "age_based": {
        "age_range_6-12 years": "0.05 mg twice daily",
        "age_range_13+ years": "0.1-0.2 mg twice daily"
      }
    }
  },
  {
    "name": "Bactroban",
    "generic_name": "Mupirocin",
    "dosage": {
      "age_based": {
        "age_range_1+ years": "Apply 2-3 times daily to affected area"
      }
    }
  },
  {
    "name": "Protopic",
    "generic_name": "Tacrolimus",
    "dosage": {
      "age_based": {
        "age_range_2+ years": "Apply a thin layer to affected area twice daily"
      }
    }
  },
  {
    "name": "Elidel",
    "generic_name": "Pimecrolimus",
    "dosage": {
      "age_based": {
        "age_range_2+ years": "Apply to affected area twice daily"
      }
    }
  },
  {
    "name": "Clobex",
    "generic_name": "Clobetasol",
    "dosage": {
      "age_based": {
        "age_range_12+ years": "Apply to affected area twice daily"
      }
    }
  },
  {
    "name": "Lidex",
    "generic_name": "Fluocinonide",
    "dosage": {
      "age_based": {
        "age_range_12+ years": "Apply to affected area twice daily"
      }
    }
  },
  {
    "name": "Desonate",
    "generic_name": "Desonide",
    "dosage": {
      "age_based": {
        "age_range_2+ years": "Apply to affected area 2-4 times daily"
      }
    }
  },
  {
    "name": "Hydrocortisone Cream",
    "generic_name": "Hydrocortisone",
    "dosage": {
      "age_based": {
        "age_range_2+ years": "Apply 2-4 times daily to affected area"
      }
    }
  },
  {
    "name": "Nystatin",
    "generic_name": "Nystatin",
    "dosage": {
      "age_based": {
        "age_range_infants": "2 mL four times daily",
        "age_range_2+ years": "5 mL four times daily"
      }
    }
  },
  {
    "name": "Lotrimin",
    "generic_name": "Clotrimazole",
    "dosage": {
      "age_based": {
        "age_range_2+ years": "Apply 2-3 times daily to affected area"
      }
    }
  },
  {
    "name": "Monistat",
    "generic_name": "Miconazole",
    "dosage": {
      "age_based": {
        "age_range_2+ years": "Apply twice daily to affected area"
      }
    }
  },
  {
    "name": "Aldara",
    "generic_name": "Imiquimod",
    "dosage": {
      "age_based": {
        "age_range_12+ years": "Apply 2-3 times per week"
      }
    }
  },
  {
    "name": "Zovirax",
    "generic_name": "Acyclovir",
    "dosage": {
      "weight_based": "20 mg/kg per dose every 8 hours",
      "max_dose_per_day": "800 mg",
      "age_based": {
        "age_range_2-12 years": "400 mg every 8 hours"
      }
    }
  },
  {
    "name": "Valtrex",
    "generic_name": "Valacyclovir",
    "dosage": {
      "weight_based": "10-20 mg/kg twice daily",
      "age_based": {
        "age_range_6-12 years": "500 mg twice daily",
        "age_range_13+ years": "1 g twice daily"
      }
    }
  },
  {
    "name": "Singulair",
    "generic_name": "Montelukast",
    "dosage": {
      "age_based": {
        "age_range_2-5 years": "4 mg once daily",
        "age_range_6-14 years": "5 mg once daily"
      }
    }
  },
  {
    "name": "Advair Diskus",
    "generic_name": "Fluticasone/Salmeterol",
    "dosage": {
      "age_based": {
        "age_range_4-11 years": "1 inhalation twice daily",
        "age_range_12+ years": "2 inhalations twice daily"
      }
    }
  },
  {
    "name": "Xopenex",
    "generic_name": "Levalbuterol",
    "dosage": {
      "age_based": {
        "age_range_6-12 years": "0.31-0.63 mg via nebulizer every 6-8 hours",
        "age_range_13+ years": "0.63-1.25 mg via nebulizer every 6-8 hours"
      }
    }
  },
  {
    "name": "Qvar",
    "generic_name": "Beclomethasone",
    "dosage": {
      "age_based": {
        "age_range_5-11 years": "40-80 mcg twice daily",
        "age_range_12+ years": "80-160 mcg twice daily"
      }
    }
  },
  {
    "name": "Asmanex",
    "generic_name": "Mometasone",
    "dosage": {
      "age_based": {
        "age_range_4-11 years": "110 mcg once daily",
        "age_range_12+ years": "220 mcg once daily"
      }
    }
  },
  {
    "name": "Zyrtec",
    "generic_name": "Cetirizine",
    "dosage": {
      "age_based": {
        "age_range_2-5 years": "2.5-5 mg once daily",
        "age_range_6-12 years": "5-10 mg once daily"
      }
    }
  },
  {
    "name": "Claritin",
    "generic_name": "Loratadine",
    "dosage": {
      "age_based": {
        "age_range_2-5 years": "2.5 mg once daily",
        "age_range_6-12 years": "5 mg once daily"
      }
    }
  },
  {
    "name": "Benadryl",
    "generic_name": "Diphenhydramine",
    "dosage": {
      "weight_based": "1-1.5 mg/kg every 6-8 hours",
      "max_dose_per_day": "150 mg",
      "age_based": {
        "age_range_2-5 years": "6.25 mg every 6 hours",
        "age_range_6-12 years": "12.5-25 mg every 6 hours"
      }
    }
  },
  {
    "name": "Zantac",
    "generic_name": "Ranitidine",
    "dosage": {
      "age_based": {
        "age_range_2-12 years": "2-4 mg/kg twice daily",
        "age_range_13+ years": "150 mg twice daily"
      }
    }
  },
  {
    "name": "Prilosec",
    "generic_name": "Omeprazole",
    "dosage": {
      "age_based": {
        "age_range_2-5 years": "10 mg once daily",
        "age_range_6-12 years": "20 mg once daily"
      }
    }
  }
];

function App() {
  const [formFields, setFormFields] = useState({
    drugName: '',
    adultDose: '',
    drugStrength: '',
    weight: '',
    amount: '',
    volume: '',
    timesPerDay: '',
  });

  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [unit, setUnit] = useState('mg'); // Unit for dosage
  const [weightUnit, setWeightUnit] = useState('kg'); // Unit for weight
  const [showCalculations, setShowCalculations] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [frequency, setFrequency] = useState('q24hr (qDay)');
  const [amount, setAmount] = useState('mg'); // Unit for amount
  const [volume, setVolume] = useState('mL'); // Unit for volume

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Hide toast after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleDrugNameSelect = (selectedName) => {
    const drugInfo = drugData.find(drug => drug.name === selectedName);
  
    if (!drugInfo) {
      setShowToast(true);
      setToastMessage("Please select a valid drug.");
      return;
    }
  
    setFormFields((prev) => ({ ...prev, drugName: selectedName }));
  
    // Do not calculate dosage here. We'll calculate after the user clicks the button.
  };

  const updateProgress = () => {
    const filledFields = Object.values(formFields).filter(Boolean).length;
    setProgress((filledFields / Object.keys(formFields).length) * 100);
  };

  const handleInputBlur = () => {
    updateProgress();
  };

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleAnotherCalculation = () => {
    setFormFields({
      drugName: '',
      adultDose: '',
      drugStrength: '',
      weight: '',
      amount: '',
      volume: '',
      timesPerDay: '',
    });
    setResult(null);
    setProgress(0);
    setShowCalculations(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const calculateDosage = (drugName, weight) => {
    const drugInfo = drugData.find(drug => drug.name === drugName);
    
    if (!drugInfo || !weight) {
      setShowToast(true);
      setToastMessage("Please enter valid drug and weight.");
      return;
    }
  
    // Parse weight to a float and check validity
    const weightInKg = weightUnit === 'lb' ? parseFloat(weight) * 0.453592 : parseFloat(weight);
    if (isNaN(weightInKg) || weightInKg <= 0) {
      setShowToast(true);
      setToastMessage("Invalid weight entered.");
      return;
    }
  
    // Extract weight-based dosage info from drugInfo
    const weightBasedDosage = drugInfo.dosage?.weight_based;
    if (!weightBasedDosage) {
      setShowToast(true);
      setToastMessage("No dosage information available for this drug.");
      return;
    }
  
    // Split and parse the dosage range (e.g., "10-15 mg/kg per dose")
    const dosageRangeMatch = weightBasedDosage.match(/(\d+)-(\d+)/);
    if (!dosageRangeMatch) {
      setShowToast(true);
      setToastMessage("Unable to calculate dosage based on the provided data.");
      return;
    }
  
    const minDosage = parseFloat(dosageRangeMatch[1]);
    const maxDosage = parseFloat(dosageRangeMatch[2]);
  
    // Calculate the dosage (average of min and max for simplicity)
    const dosagePerKg = (minDosage + maxDosage) / 2;
    const totalDosage = dosagePerKg * weightInKg;
  
    // Check if valid total dosage is calculated
    if (isNaN(totalDosage) || totalDosage <= 0) {
      setShowToast(true);
      setToastMessage("Failed to calculate a valid dosage.");
      return;
    }
  
    // Set the results and update form fields
    setFormFields((prev) => ({
      ...prev,
      adultDose: totalDosage.toFixed(2),
      drugStrength: `${dosagePerKg.toFixed(2)} mg/kg`,
    }));
  
    setResult({
      dosage: totalDosage.toFixed(2),
      dispenseMethod: 'Oral suspension',
      strength: `${dosagePerKg.toFixed(2)} ${unit}/kg`,
      instructions: `${totalDosage.toFixed(2)} ${unit} per day`,
    });
    setShowCalculations(true);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  const handleWeightUnitChange = (newWeightUnit) => {
    setWeightUnit(newWeightUnit);
  };


  return (
    <div
      className="bg-base-100 absolute inset-0 bg-no-repeat bg-cover bg-center"
      style={{
        //backgroundImage: `url('/doctor_gradient.png')`,
      }}
    >
      {/* Navbar */}
      <div className="navbar bg-neutral shadow-md py-4">
  
        {showToast && (
          <div className="toast toast-end">
            <div className="alert alert-error">
              <span> Please Enter Valid Inputs.</span>
            </div>
          </div>
        )}
  
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
              className="menu menu-sm dropdown-content bg-neutral rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
  
        <div className="navbar bg-white  py-4 px-8">
          <div className="navbar-start"></div>
          <div className="navbar-end space-x-8 text-lg font-medium">
            <a href="/about" className="text-black hover:text-gray-600">About</a>
            <a href="/database" className="text-black hover:text-gray-600">Database</a>
            <a href="/calculator" className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700">
              Calculator
            </a>
          </div>
        </div>
      </div>
  
      <section className="flex flex-row items-start justify-center gap-8 p-8 mt-8">
        {/* Left box: Form Section */}
        <div className="w-3/4 bg-neutral shadow-xl rounded-xl p-8 space-y-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 w-full">Pediatric Dosage Calculator</h2>
          {!result ? (
            <>
              <div className="input-group flex flex-col gap-2 w-full">
                <AutocompleteInput
                  value={formFields.drugName}
                  onChange={(value) => setFormFields((prev) => ({ ...prev, drugName: value }))}
                  onSelect={handleDrugNameSelect}
                  className="input input-bordered"
                />
              </div>
  
              <div className="flex items-center space-x-2 flex-wrap">
                <label className="input input-bordered flex items-center gap-2 flex-grow min-w-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-50">
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    name="weight"
                    placeholder="Patient Weight"
                    value={formFields.weight}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="flex-grow min-w-0"
                    autoComplete="off"
                  />
                </label>
  
                <div className="inline-flex space-x-1 overflow-visible">
                  <button
                    className={`relative px-6 py-2 border ${weightUnit === 'kg' ? 'border-blue-600 text-gray-600' : 'border-gray-300 text-gray-400'} bg-white hover:border-blue-600 rounded-md`}
                    style={{ overflow: 'visible', zIndex: weightUnit === 'kg' ? 2 : 0 }}
                    onClick={() => handleWeightUnitChange('kg')}
                  >
                    kg
                    {weightUnit === 'kg' && (
                      <span
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full h-4 w-4 flex items-center justify-center"
                        style={{ zIndex: 3 }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
  
                  <button
                    className={`relative px-6 py-2 border ${weightUnit === 'lb' ? 'border-blue-600 text-gray-600' : 'border-gray-300 text-gray-400'} bg-white hover:border-blue-600 rounded-md`}
                    style={{ overflow: 'visible', zIndex: weightUnit === 'lb' ? 2 : 0 }}
                    onClick={() => handleWeightUnitChange('lb')}
                  >
                    lb
                    {weightUnit === 'lb' && (
                      <span
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full h-4 w-4 flex items-center justify-center"
                        style={{ zIndex: 3 }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                </div>
              </div>
  
              <div className="flex items-center space-x-2 flex-wrap">
                <label className="input input-bordered flex items-center gap-2 flex-grow min-w-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-50">
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    name="adultDose"
                    placeholder="Dosage"
                    value={formFields.adultDose}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="flex-grow min-w-0"
                    autoComplete="off"
                  />
                </label>
  
                <div className="inline-flex space-x-1 overflow-visible">
                  <button
                    className={`relative px-6 py-2 border ${unit === 'mg' ? 'border-blue-600 text-gray-600' : 'border-gray-300 text-gray-400'} bg-white hover:border-blue-600 rounded-md`}
                    style={{ overflow: 'visible', zIndex: unit === 'mg' ? 2 : 0 }}
                    onClick={() => handleUnitChange('mg')}
                  >
                    mg/kg
                    {unit === 'mg' && (
                      <span
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full h-4 w-4 flex items-center justify-center"
                        style={{ zIndex: 3 }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
  
                  <button
                    className={`relative px-6 py-2 border ${unit === 'g' ? 'border-blue-600 text-gray-600' : 'border-gray-300 text-gray-400'} bg-white hover:border-blue-600 rounded-md`}
                    style={{ overflow: 'visible', zIndex: unit === 'g' ? 2 : 0 }}
                    onClick={() => handleUnitChange('g')}
                  >
                    g/kg
                    {unit === 'g' && (
                      <span
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full h-4 w-4 flex items-center justify-center"
                        style={{ zIndex: 3 }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
  
                  <button
                    className={`relative px-6 py-2 border ${unit === 'mcg' ? 'border-blue-600 text-gray-600' : 'border-gray-300 text-gray-400'} bg-white hover:border-blue-600 rounded-md`}
                    style={{ overflow: 'visible', zIndex: unit === 'mcg' ? 2 : 0 }}
                    onClick={() => handleUnitChange('mcg')}
                  >
                    mcg/kg
                    {unit === 'mcg' && (
                      <span
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full h-4 w-4 flex items-center justify-center"
                        style={{ zIndex: 3 }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                </div>
              </div>
  
              <div className="relative flex items-center w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 opacity-50">
                  <path
                    d="M7.293 9.293a1 1 0 0 1 1.414 0L12 11.586l-1.293 1.293a1 1 0 0 1-1.414-1.414L10.586 12H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6.586l-1.293-1.293A1 1 0 0 1 7.293 2.707l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z" />
                </svg>
  
                <select className="input input-bordered pl-10 w-full" style={{ color: '#9BA3AF' }}>
                  <option disabled selected>Frequency of Dose</option>
                  <option>q24hr (qDay)</option>
                  <option>q12hr (BID)</option>
                  <option>q8hr (TID)</option>
                  <option>q6hr (QID)</option>
                  <option>q4hr</option>
                  <option>q2hr</option>
                  <option>q1hr</option>
                </select>
              </div>
  
              <div className="flex items-center space-x-2 flex-wrap">
                <label className="input input-bordered flex items-center gap-2 flex-grow min-w-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-50">
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    name="amount"
                    placeholder="Medication Amount (Liquid Formulation Only)"
                    value={formFields.amount}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="flex-grow min-w-0"
                    autoComplete="off"
                  />
                  <span className="badge badge-primary text-white bg-primary">Optional</span>
                </label>
  
                <div className="inline-flex space-x-1 overflow-visible">
                  <button
                    className={`relative px-6 py-2 border ${amount === 'mg' ? 'border-blue-600 text-gray-600' : 'border-gray-300 text-gray-400'} bg-white hover:border-blue-600 rounded-md`}
                    style={{ overflow: 'visible', zIndex: amount === 'mg' ? 2 : 0 }}
                    onClick={() => handleAmountChange('mg')}
                  >
                    mg
                    {amount === 'mg' && (
                      <span
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full h-4 w-4 flex items-center justify-center"
                        style={{ zIndex: 3 }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
  
                  <button
                    className={`relative px-6 py-2 border ${amount === 'grams' ? 'border-blue-600 text-gray-600' : 'border-gray-300 text-gray-400'} bg-white hover:border-blue-600 rounded-md`}
                    style={{ overflow: 'visible', zIndex: amount === 'grams' ? 2 : 0 }}
                    onClick={() => handleAmountChange('grams')}
                  >
                    grams
                    {amount === 'grams' && (
                      <span
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full h-4 w-4 flex items-center justify-center"
                        style={{ zIndex: 3 }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
  
                  <button
                    className={`relative px-6 py-2 border ${amount === 'mcg' ? 'border-blue-600 text-gray-600' : 'border-gray-300 text-gray-400'} bg-white hover:border-blue-600 rounded-md`}
                    style={{ overflow: 'visible', zIndex: amount === 'mcg' ? 2 : 0 }}
                    onClick={() => handleAmountChange('mcg')}
                  >
                    mcg
                    {amount === 'mcg' && (
                      <span
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full h-4 w-4 flex items-center justify-center"
                        style={{ zIndex: 3 }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                </div>
              </div>
  
              <div className="flex items-center space-x-2 flex-wrap">
                <label className="input input-bordered flex items-center gap-2 flex-grow min-w-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-50">
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    name="volume"
                    placeholder="Per Volume (Liquid Formulation Only)"
                    value={formFields.volume}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="flex-grow min-w-0"
                    autoComplete="off" 
                  />
                  <span className="badge badge-primary text-white">Optional</span>
                </label>
  
                <div className="inline-flex space-x-1 overflow-visible">
                  <button
                    className={`relative px-6 py-2 border ${volume === 'mL' ? 'border-blue-600 text-gray-600' : 'border-gray-300 text-gray-400'} bg-white hover:border-blue-600 rounded-md`}
                    style={{ overflow: 'visible', zIndex: volume === 'mL' ? 2 : 0 }}
                    onClick={() => handleVolumeChange('mL')}
                  >
                    mL
                    {volume === 'mL' && (
                      <span
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full h-4 w-4 flex items-center justify-center"
                        style={{ zIndex: 3 }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
  
                  <button
                    className={`relative px-6 py-2 border ${volume === 'L' ? 'border-blue-600 text-gray-600' : 'border-gray-300 text-gray-400'} bg-white hover:border-blue-600 rounded-md`}
                    style={{ overflow: 'visible', zIndex: volume === 'L' ? 2 : 0 }}
                    onClick={() => handleVolumeChange('L')}
                  >
                    L
                    {volume === 'L' && (
                      <span
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full h-4 w-4 flex items-center justify-center"
                        style={{ zIndex: 3 }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                </div>
              </div>
  
              <button className="btn bg-primary hover:bg-primary w-full text-white" 
        onClick={() => calculateDosage(formFields.drugName, formFields.weight)}>
  Calculate
</button>
  
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
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
  
              <button
                className="btn bg-primary hover:bg-primary text-white w-full py-2 rounded-lg mt-4 text-center text-lg"
                onClick={handleAnotherCalculation}
              >
                Calculate Another
              </button>
  
              <div
                className="btn text-gray-700 hover:text-gray-900 w-full py-2 rounded-lg mt-4 text-center text-lg"
                onClick={() => setShowCalculations(!showCalculations)}
              >
                {showCalculations ? 'Show Calculations' : 'Hide Calculations'}
              </div>
  
              {!showCalculations && (
                <div className="bg-gray-200 p-4 rounded-lg mt-4">
                  <h3 className="text-xl font-semibold mb-2">Calculations:</h3>
                  <p><strong>Adult Dose:</strong> {formFields.adultDose} mg/day</p>
                  <p><strong>Weight:</strong> {formFields.weight} {weightUnit}</p>
                  <p><strong>Calculated Dosage:</strong> {result.dosage} {unit} per day</p>
                  <p><strong>Total Dosage:</strong> {formFields.adultDose * result.dosage} mg/day</p>
                </div>
              )}
            </div>
          )}
        </div>
  
        {/* Right box: Results Section */}
        <div className="w-1/2 bg-white shadow-xl rounded-xl p-8 space-y-6 text-gray-700">
          <h2 className="text-2xl font-bold text-blue-600">Helpful Information & Guidelines</h2>
  
          {/* Dosage Formula */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Pediatric Dosage Formula</h3>
            <p className="text-sm">
              Dosage (mg) = Adult Dose (mg) x Weight (kg)
            </p>
            <p className="text-sm mt-2">
              Use this formula to calculate the pediatric dose based on the adult dose and the patient’s weight in kilograms. Ensure accuracy by measuring the weight correctly, as even small deviations can affect the result.
            </p>
          </div>
  
          {/* Age-Specific Guidelines */}
          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">Age-Specific Guidelines</h3>
            <ul className="list-disc pl-4 text-sm">
              <li><strong>Infants (0-1 year):</strong> Lower dosages and frequent monitoring are required. Double-check with a healthcare provider.</li>
              <li><strong>Children (1-12 years):</strong> Adjust based on weight and specific drug guidelines. Pediatric dosages can vary widely.</li>
              <li><strong>Adolescents (12+ years):</strong> May use adult doses for certain medications but always confirm with a provider.</li>
            </ul>
            <p className="text-sm mt-2">
              Always follow age-appropriate guidelines when calculating dosages to avoid under or overdosing. The weight-based formula is a standard, but individual cases may require adjustments.
            </p>
          </div>
  
          {/* Common Conversion Factors */}
          <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-teal-600">Common Conversion Factors</h3>
            <ul className="list-disc pl-4 text-sm">
              <li>1 kg = 2.20462 lbs</li>
              <li>1 g = 1000 mg</li>
              <li>1 mg = 1000 mcg</li>
              <li>1 mL = 1 cc</li>
            </ul>
            <p className="text-sm mt-2">
              Use these conversion factors to switch between units when needed. For example, convert the patient’s weight from pounds to kilograms by dividing by 2.20462.
            </p>
          </div>
  
          {/* Disclaimers */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-yellow-600">Important Disclaimer</h3>
            <p className="text-sm">
              This dosage calculator is intended for informational purposes only. It should not replace professional medical advice, diagnosis, or treatment. Always consult a licensed healthcare provider before administering any medication.
            </p>
            <p className="text-sm mt-2">
              Dosage calculations can vary based on a patient’s specific condition, response to treatment, and other factors such as organ function. This tool does not account for all clinical variables.
            </p>
          </div>
  
          {/* Safety Tips */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-green-600">Safety & Best Practices</h3>
            <ul className="list-disc pl-4 text-sm">
              <li>Always use precise instruments like a calibrated scale to measure weight.</li>
              <li>Review drug interactions and contraindications before administering any medication.</li>
              <li>Monitor the patient closely after administering the medication, especially for the first dose.</li>
              <li>Double-check calculations with a second source or colleague for high-risk medications.</li>
            </ul>
            <p className="text-sm mt-2">
              Following these safety tips can help prevent medication errors and ensure that the patient receives the correct dosage.
            </p>
          </div>
  
          {/* Additional Resources */}
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-gray-600">Additional Resources</h3>
            <ul className="list-disc pl-4 text-sm">
              <li><a href="https://www.cdc.gov" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">CDC Guidelines for Pediatric Dosages</a></li>
              <li><a href="https://www.who.int" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">WHO Recommendations for Safe Medication Practices</a></li>
              <li><a href="https://www.mayoclinic.org" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Mayo Clinic - Pediatric Dosage Advice</a></li>
            </ul>
            <p className="text-sm mt-2">
              These resources provide additional information and guidelines for safely calculating and administering pediatric medications.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
              }
export default App;  