import React, { useEffect, useState } from "react";
import usePostData from "../../pages/postData";
import useCustomReactQuery from "../../pages/getForAllApi";

const AddSite = () => {
    const [inputData, setInputData] = useState({
        clientName: "",
        emailid: "",
        phoneno: "",
        zoneId: "",
        stateId: "",
        cityId: "",
      });
    
      const [clients, setClients] = useState([]);
      const [zones, setZones] = useState([]);
      const [states, setStates] = useState([]);
      const [cities, setCities] = useState([]);
    
      const { postData, responseData, error, loading, message } = usePostData("temp-client/new");
    
      
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputData);
        // Uncomment below lines for submitting the form data
        // const newClient = await postData(inputData);
        // if (newClient) {
        //   setClients((prev) => [...prev, newClient]);
        //   setInputData({ clientName: "", emailid: "", phoneno: "", zoneId: "", stateId: "", cityId: "" });
        // }
      };

      const handleData = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
      };
    
    
    
      const handleZoneChange = async (zoneId) => {
        setInputData((prev) => ({ ...prev, zoneId }));
        // if (zoneId) {
        //   try {
        //     const response = await axios.get(`/api/state/zone/${zoneId}`);
        //     setStates(response.data);  // Update states based on selected zone
        //     setCities([]); // Clear cities when zone changes
        //   } catch (error) {
        //     console.error("Error fetching states:", error);
        //   }
        // } else {
        //   setStates([]);
        // }
      };
    
    
    
      const fetchZones = async () => {
        // try {
        //   const response = await axios.get("/api/zone/");
        //   setZones(response.data);
        // } catch (error) {
        //   console.error("Error fetching zones:", error);
        // }
      };
    
      const fetchClients = async () => {
        // try {
        //   const response = await axios.get("/api/client/");
        //   setClients(response.data);
        // } catch (error) {
        //   console.error("Error fetching clients:", error);
        // }
      };
    
      useEffect(() => {
        fetchClients();
        fetchZones();
      }, []);


  useEffect(() => {
    if (responseData) {
      console.log("New client added:", responseData);
    }
  }, [responseData]);

  const handleStateChange = async (stateId) => {
    console.log(stateId);
    
    // if (stateId) {
    //   try {
    //     const response = await axios.get(`${api}/city/state/${stateId}`, {
    //       headers: { Authorization: token },
    //     });
    //     setCities(response.data);
    //   } catch (error) {
    //     console.error("Error fetching city data:", error);
    //   }
    // } else {
    //   setCities([]);
    // }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };



  return (
    <>
      <div className="TemporaryClient">
        <h2>Add Client</h2>
        <div className="field-container">
          <div className="client-container">
            <label>
                Site Name</label>
            <input
              type="text"
              name="clientName"
              placeholder="Client Name"
              value={inputData.clientName}
              onChange={handleData}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
          </div>
          <div className="client-container">
            <label>Buisness Category</label>
            <input
              type="text"
              name="clientName"
              placeholder="Buisness Category"
              value={inputData.clientName}
              onChange={handleData}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
          </div>
        </div>
        <div className="field-container">
        <div className="client-container">
        <label htmlFor="zoneName">Select Zone</label>
        <select
          name="zoneId"
          id="zoneName"
          value={inputData.zoneId}
          onChange={(e) => handleZoneChange(e.target.value)}
        >
          <option disabled value="">
            Select zone
          </option>
          {zones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.zoneName}
            </option>
          ))}
        </select>
      </div>

      {/* State Select */}
      <div className="client-container">
        <label htmlFor="stateName">Select State</label>
        <select
          name="stateId"
          id="stateName"
          value={inputData.stateId}
          onChange={(e) => handleStateChange(e.target.value)}
        >
          <option disabled value="">
            Select state
          </option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.stateName}
            </option>
          ))}
        </select>
      </div>

      {/* City Select */}
      <div className="client-container">
        <label htmlFor="cityName">Select City</label>
        <select
          name="cityId"
          id="cityName"
          value={inputData.cityId}
          onChange={handleInputChange}
        >
          <option disabled value="">
            Select city
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.cityName}
            </option>
          ))}
        </select>
      </div>

        </div>
    <div className="field-container">
    <div className="client-container">
            <label>Email Id</label>
            <input
              type="text"
              name="emailid"
              placeholder="Email Id"
              value={inputData.emailid}
              onChange={handleData}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
          </div>
          <div className="client-container">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneno"
              placeholder="Phone Number"
              value={inputData.phoneno}
              onChange={handleData}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
          </div>
    </div>

        <button className="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </>
  );
};

export default AddSite;
