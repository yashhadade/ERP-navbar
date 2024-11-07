import { useState } from "react";
import axios from "axios";
import ServerApi from "../ServerApi";
const UseputData = (url) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const apiEndPoint = ServerApi();
  const putData = async (data) => {
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.put(`${apiEndPoint}/${url}`, data);
      setResponseData(response.data);
      setLoading(false);
      setError(null);
      setMessage("Data Saved SucussFully");

      setTimeout(() => {
        setMessage("");
      }, 1000);
      return response.data;
    } catch (error) {
      // setError(error);
      setLoading(false);
      setMessage("");
      // console.error("There was an error with the POST request:", error);
      if (error.response) {
        setError(error.response.data.message || "An Error Occured");
      }
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return { putData, responseData, error, loading, message };
};

export default UseputData;
