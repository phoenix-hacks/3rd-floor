'use client';

import { useEffect, useState } from 'react';

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch('/api/shop/medicines');
      const data = await response.json();
      const initialMedicines = data.map((medicine) => ({
        name: medicine.name,
        available: false, // Default availability
      }));
      setMedicines(initialMedicines);
    };

    fetchMedicines();
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].available = !updatedMedicines[index].available;
    setMedicines(updatedMedicines);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/shop/medicines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inventory: medicines }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Inventory updated successfully!');
        setError('');
      } else {
        setError(data.message);
        setSuccess('');
      }
    } catch (err) {
      setError('Failed to update inventory');
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Manage Medicines</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <ul>
          {medicines.map((medicine, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={medicine.available}
                  onChange={() => handleCheckboxChange(index)}
                />
                {medicine.name}
              </label>
            </li>
          ))}
        </ul>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
