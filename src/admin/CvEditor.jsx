import React, { useState } from 'react';

export default function CvEditor() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 2000);
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '12px' }}>
      <h3 style={{ marginBottom: '15px', fontWeight: 'bold' }}>CV Editor Panel</h3>
      
      {successMessage && (
        <div style={{ padding: '10px', marginBottom: '15px', background: '#d1e7dd', color: '#0f5132', borderRadius: '6px' }}>
          CV saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Title / Position</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Frontend Developer"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: '10px 20px', background: '#db2777', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}