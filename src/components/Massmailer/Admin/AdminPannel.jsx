import React, { useState } from 'react';

const AdminPannel = () => {

  const [clientName, setClientName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [date, setDate] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!clientName || !siteName || !date) {
      setFormError('All fields are required');
      return;
    }

    // Reset error message and proceed with form submission
    setFormError('');
    alert(`Client: ${clientName}\nSite: ${siteName}\nDate: ${date}`);

    // Clear the form after submit
    setClientName('');
    setSiteName('');
    setDate('');
    console.log('form cleared');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center">
              <h5>Admin Panel</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Client Name Field */}
                <div className="form-group">
                  <label htmlFor="formClientName">Client Name</label>
                  <input
                    type="text"
                    className={`form-control ${formError ? 'is-invalid' : ''}`}
                    id="formClientName"
                    placeholder="Enter client name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                  {formError && <div className="invalid-feedback">Client name is required.</div>}
                </div>

                {/* Site Name Field */}
                <div className="form-group">
                  <label htmlFor="formSiteName">Site Name</label>
                  <input
                    type="text"
                    className={`form-control ${formError ? 'is-invalid' : ''}`}
                    id="formSiteName"
                    placeholder="Enter site name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                  {formError && <div className="invalid-feedback">Site name is required.</div>}
                </div>

                {/* Date Field */}
                <div className="form-group">
                  <label htmlFor="formDate">Date</label>
                  <input
                    type="date"
                    className={`form-control ${formError ? 'is-invalid' : ''}`}
                    id="formDate"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  {formError && <div className="invalid-feedback">Date is required.</div>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPannel;
