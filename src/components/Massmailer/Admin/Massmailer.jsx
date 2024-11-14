import React, { useState, useEffect } from "react";

import { Pagination, Table, InputGroup, FormControl } from "react-bootstrap";
import useCustomReactQuery from "../../../pages/getForAllApi";
import useCustomReactForExcel from "../../../Exel/ExcelApi";

function Massmailer() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [product, setProduct] = useCustomReactQuery("feedback/all-percenatage");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 10;
 const [clientDroupDown,setclientDroupDown]=useState("");
 const[siteId,setSiteId]=useState("");
  const [excelId, setExcelId] = useState(null);
  useCustomReactForExcel("feedback/excel", excelId);

  const handleExleSheet = (id) => {
    setExcelId(id);
  };

  const handleClientChange=(e)=>{
    const newValue = e.target.value;
    setclientDroupDown(newValue);
    debouncedSearch(newValue);
  }
  
function debouncedSearch(value){
    console.log("value " +value);
    
    handleSearch(value);
  } ;



 
const handleSiteChange=(e)=>{
  const selectedSiteId = parseInt(e.target.value,10); 
  const selectedSite = filteredSites.find(site => site.siteId === selectedSiteId); 
  console.log("site ID "+selectedSiteId);
  if (selectedSite) {
    setSiteId(selectedSiteId); 
    console.log("site ID"+selectedSite);
    debouncedSearch(selectedSite.siteName); 
    console.log(selectedSite.siteName);
  }
}

const handleSearch = (searchQuery) => {
  setSearch(searchQuery); 

  if (searchQuery === "") {
    setFilteredData(data); 
  } else {
    const query = searchQuery.toLowerCase(); 

    const filtered = data.filter((client) => {
      
      const clientName = client.clientName ? client.clientName.toLowerCase() : "";
      const siteName = client.siteName ? client.siteName.toLowerCase() : "";
      const inchargeName = client.inchargeName ? client.inchargeName.toLowerCase() : "";
      const percentage = client.percentage ? client.percentage.toString().toLowerCase() : "";

      return (
        clientName.includes(query) ||
        siteName.includes(query) ||
        inchargeName.includes(query) ||
        percentage.includes(query)
      );
    });

    setFilteredData(filtered); 

  setCurrentPage(1); 
  }
};

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  const getPaginationItems = () => {
    const pageNumbers = [];
    const pageRange = 5;
    const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  useEffect(() => {
    if (product) {
      setData(product);
      setFilteredData(product);
    }
  }, [product]);
console.log(currentData);
const filteredSites = currentData.filter(data => data.clientName === clientDroupDown);


  return (
    <div>
      <h1>FeedBack Form</h1>

      <div className="flex justify-end items-center space-x-4">
  <div className="col-6 col-md-4 col-lg-3">
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search"
        value={search}
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </InputGroup>
    <label htmlFor="clientName">Select Client </label>
            <select
              name="clientName"
              id="clientName"
              value={clientDroupDown}
              onChange={handleClientChange}
            >
              <option disabled value=" ">Select client </option>
              {product.map((client,index) => (
                <option key={index} value={client.clientName}>
                  {client.clientName}
                </option>
              ))}
            </select>
            <label htmlFor="siteName">Select Name</label>
            <select
              name="siteName"
              id="siteName"
              value={siteId}
              onChange={handleSiteChange}
            >
              <option disabled value="">
                Select site
              </option>
              {filteredSites.map((site,index) => (
                <option key={index} value={site.siteId}>
                  {site.siteName}
                </option>
              ))}
            </select>

  </div>
</div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Site Name</th>
            <th>Incharge Name</th>
            <th>Percentage (%)</th>
            <th>Excel</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            currentData.map((client, index) => (
              <tr key={index}>
                <td>{startIndex + index + 1}</td>
                <td>{client.clientName}</td>
                <td>{client.siteName}</td>
                <td>{client.inchargeName}</td>
                <td>{client.percentage.toFixed(2)}</td>
                <td>
                  <button
                    id="exportButton"
                    className="btn btn-primary"
                    onClick={() => handleExleSheet(client.siteId)}
                  >
                    Export to Excel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination>
        {getPaginationItems().map((num) => (
          <Pagination.Item
            key={num}
            active={num === currentPage}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default Massmailer;
