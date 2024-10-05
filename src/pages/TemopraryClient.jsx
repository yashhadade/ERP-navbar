import { useState, useEffect } from "react"; 
import ServerApi from "../ServerApi";
import axios from "axios";


function TemopraryClient(){
    const [product, setProduct] = useState([]);
    const apiUrl = ServerApi();
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/temp-client`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, [apiUrl]);   
    

    function handleSubmit(event) {
        event.preventDefault();
        // Handle form submission (e.g., add new client)
    }

    return (
        <div className="container">
            <div className="TemporaryClient">
                <h2>TEMPORARY CLIENT</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Client Name:</label>
                        <input type="text" placeholder="Client Name" required />
                    </div>
                    <button type="submit" className="submit">Submit</button>
                </form>
            </div>
            <div className="TemporaryClient">
                <h2>CLIENT LIST</h2>
                <button id="exportButton">Export to Excel</button>
                <h2>The Number of Clients: {product.length}</h2>
                <table id="clientTable" className="display">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Client Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {product.map((client, index) => (
                            <tr key={client.id}> 
                                <td>{index + 1}</td>
                                <td>{client.clientName}</td> 
                                <td>
                                    
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default TemopraryClient