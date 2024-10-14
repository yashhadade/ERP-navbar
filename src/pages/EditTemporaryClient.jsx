import React, { useState,useEffect } from 'react'
import useCustomReactQuery from "./getForAllApi";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import UseputData from './putData';

const EditTemporaryClient = () => {
    const params=useParams()
    const [product] = useCustomReactQuery(`temp-client/${params.clintId}`)
    const [inputData, setInputData] = useState({ clientName: '' });
    const { putData, responseData, error, loading,message } =UseputData(`temp-client/update/${params.clintId}`)
    const navigate = useNavigate(); 

    const handleData = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };
    const handleSubmit=async(event)=> {
        event.preventDefault(); const newClient = await putData(inputData);
        if (newClient) {
            setInputData({ clientName: "" });
            setTimeout(() => {
                navigate("/temporaryClient/");
            }, 1500);
        }
    };
    useEffect(() => {
        if (responseData) {
            console.log("Client Edit:", responseData);
        }
    }, [responseData]);
  return (
    <div className="container">
    <div className="TemporaryClient">
        <h3>Edit Temporary Client</h3>
        <label>Client Name</label>
        <input type="text" name="clientName" placeholder="Clinet Name" defaultValue={product.clientName} onChange={handleData} ></input>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <Link className="cancle" to={"/temporaryClient/"}>Cancle</Link>
        <button className="save" onClick={handleSubmit} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
    </div>
    </div>
  )
}

export default EditTemporaryClient
