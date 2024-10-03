import React, { useState } from 'react';

const api = 'http://localhost:8083'; // Replace with your API URL
const token = 'your-token-here'; // Replace with your actual token

const ClientForm = () => {
    const [clientName, setClientName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const styles = {
        // container: {
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     height: '100vh',
        //     backgroundColor: '#f8f9fa',
        // },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '300px', // Adjust as needed
        },
        inputField: {
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            transition: 'border-color 0.3s',
        },
        inputFieldFocus: {
            borderColor: '#007bff',
        },
        submitButton: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 15px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        submitButtonHover: {
            backgroundColor: '#0056b3',
        },
        errorMessage: {
            color: 'red',
            marginTop: '10px',
        },
        successMessage: {
            color: 'green',
            marginTop: '10px',
        },
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const storeData = { clientName };

        try {
            const response = await fetch(`${api}/client/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify(storeData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Unknown error');
            }

            const result = await response.json();
            console.log('Success:', result);
            setSuccess('Data saved successfully!');
            setClientName(''); // Reset input field
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(error.message || 'Error saving data. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} id="storeForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="clientName"
                    style={styles.inputField}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter client name"
                    required
                    onFocus={(e) => e.target.style.borderColor = styles.inputFieldFocus.borderColor}
                    onBlur={(e) => e.target.style.borderColor = '#ccc'}
                />
                <button
                    type="submit"
                    style={styles.submitButton}
                    onMouseOver={(e) => e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.submitButton.backgroundColor}
                >
                    Submit
                </button>
            </form>
            {error && <div style={styles.errorMessage}>{error}</div>}
            {success && <div style={styles.successMessage}>{success}</div>}
        </div>
    );
};

export default ClientForm;
