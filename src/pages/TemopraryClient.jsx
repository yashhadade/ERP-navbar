import useCustomReactQuery from "./getForAllApi";
import { useState,useEffect} from "react"; 
import usePostData from "./postData";
function TemopraryClient() {

    const [product,setProduct] = useCustomReactQuery('temp-client')
    const [inputData, setInputData] = useState({ clientName: '' });
    const { postData, responseData, error, loading,message } = usePostData("temp-client/new");
    const [hidden,setHidden]=useState(false);
    function handleEdit(){
        setHidden(true)
    }
    function handleCancle(){
        setHidden(false)
    }
    const handleData = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };
    const handleSubmit=async(event)=> {
        event.preventDefault();
        const newClient = await postData(inputData);
        if (newClient) {
            setProduct((prevData) => [...prevData, newClient]);
            setInputData({ clientName: "" });
        }
    };
    useEffect(() => {
        if (responseData) {
            console.log("New client added:", responseData);
        }
    }, [responseData]);

    return (
        <div className="container">
            <div className="TemporaryClient" style={{ display: hidden ? 'none' : '' }}>
                <h3>Temporary Client</h3>
                <label>Client Name</label>
                <input type="text" name="clientName" placeholder="Clinet Name" value={inputData.clientName} onChange={handleData}></input>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <button className="submit" onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
               
            </div>
            <div className="TemporaryClient" style={{ display: hidden ? 'none' : '' }}>
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

                                    <button className="edit" onClick={handleEdit}>Edit</button>
                                    <button className="delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="TemporaryClient" style={{ display: hidden ? '' : 'none' }}>
                        <h2>Edit Client</h2>
                        <h3>Temporary Client</h3>
                <label>Client Name</label>
                <input type="text" name="clientName" placeholder="Clinet Name" value={inputData.clientName} onChange={handleData}></input>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <button className="cancle"onClick={handleCancle} >Cancle</button>
                <button className="save" onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
            </div>
        </div>
    );
}


export default TemopraryClient


// custome React Query


