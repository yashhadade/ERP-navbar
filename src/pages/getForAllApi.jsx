import ServerApi from "../ServerApi";
import axios from "axios";
import { useState, useEffect } from "react"; 
const useCustomReactQuery = (urlPath) => {
    const [product, setProduct] = useState([]);
    const apiUrl = ServerApi(); // Ensure ServerApi is defined and returns a base URL

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/${urlPath}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, [apiUrl, urlPath]); // Added urlPath to the dependency array

    return [product];
}
export default useCustomReactQuery