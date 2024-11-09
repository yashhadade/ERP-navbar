import useCustomReactQuery from "../../pages/getForAllApi";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostData from "../../pages/postData";  // Assuming this is a custom hook to post data
import { deleteProduct } from "../../pages/DeleteAPI";

const AddClient = () => {
  const [product, setProduct] = useCustomReactQuery('temp-client');
  const [inputData, setInputData] = useState({ clientName: '' });
  const { postData, responseData, error, loading, message } = usePostData("temp-client/new");

  const navigate = useNavigate();

  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Save the client name to localStorage
    const clientName = inputData.clientName;
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.push(clientName);
    localStorage.setItem('clients', JSON.stringify(clients));  // Update localStorage with new client

    navigate("/addSite");  // Navigate to the next step (for example, adding a site)
  };

  useEffect(() => {
    if (responseData) {
      console.log("New client added:", responseData);
    }
  }, [responseData]);

  return (
    <div className="container">
      <div className="TemporaryClient">
        <h2>Add Client</h2>

        <div className="client-container">
          <label>Client Name</label>
          <input 
            type="text" 
            name="clientName" 
            placeholder="Client Name" 
            value={inputData.clientName} 
            onChange={handleData}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
        
        <button className="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      <div className="TemporaryClient">
        <h4>CLIENT LIST</h4>
        <button id="exportButton">Export to Excel</button>
        <h4>The Number of Clients: {product.length}</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Client Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((client, index) => (
              <tr key={client.id}>
                <td>{index + 1}</td>
                <td>{client.clientName}</td>
                <td>
                  <button 
                    className="delete" 
                    onClick={() => deleteProduct("temp-client/delete", client.id, setProduct)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddClient;