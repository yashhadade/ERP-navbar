import useCustomReactQuery from "./getForAllApi";



function TemopraryClient(){
    
    const [product]= useCustomReactQuery('temp-client')

    function handleSubmit(event) {
        event.preventDefault();
        // Handle form submission (e.g., add new client)
    }

    return (
        <div className="container">
            <div className="TemporaryClient">
                <h3>TEMPORARY CLIENT</h3>
                <form onSubmit={handleSubmit}>
                    <div>A
                        <label>Client Name:</label>
                        <input type="text" placeholder="Client Name" name="name" required />
                    </div>
                    <button type="submit" className="submit">Submit</button>
                </form>
            </div>
            <div className="TemporaryClient">
                <h3>CLIENT LIST</h3>
                <button id="exportButton">Export to Excel</button>
                <h2>The Number of Clients: {product.length}</h2>
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
                                    
                                    <button className="edit" >Edit</button>
                                    <button className="delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default TemopraryClient


// custome React Query


