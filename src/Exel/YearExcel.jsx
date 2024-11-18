import ServerApi from "../ServerApi";
import axios from "axios";
import { useState, useEffect } from "react"; 

const useCustomReactForAvg = (urlPath, year) => {
  const [avg, setavg] = useState(null);
  const apiUrl = ServerApi(); 
  
  useEffect(() => {
    
    if (year) {
      (async () => {
        try {
          const response = await axios.get(`${apiUrl}/${urlPath}`);
          setavg(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })();
    } //else {
    
    //   setavg(null);
    //   console.log("Year not provided, no data fetched.");
    // }
  }, [apiUrl, urlPath, year]); 

  return [avg, setavg];
}

export default useCustomReactForAvg;
