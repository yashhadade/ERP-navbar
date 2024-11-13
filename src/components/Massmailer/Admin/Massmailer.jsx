import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
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

  const [excelId, setExcelId] = useState(null);
  useCustomReactForExcel("feedback/excel", excelId);

  const handleExleSheet = (id) => {
    setExcelId(id);
  };

  const debouncedSearch = debounce((value) => {
    handleSearch(value);
  }, 100);

  const handleSearch = (searchQuery) => {
    const trimmedQuery = searchQuery.trim();
    setSearch(trimmedQuery);

    if (trimmedQuery === "") {
      setFilteredData(data);
    } else {
      const query = trimmedQuery.toLowerCase();
      const filtered = data.filter((client) => {
        return (
          (client.clientName &&
            client.clientName.toLowerCase().includes(query)) ||
          (client.siteName && client.siteName.toLowerCase().includes(query)) ||
          (client.inchargeName &&
            client.inchargeName.toLowerCase().includes(query)) ||
          (client.percentage &&
            client.percentage.toString().toLowerCase().includes(query))
        );
      });

      setFilteredData(filtered);
    }

    setCurrentPage(1);
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

  return (
    <div>
      <h1>FeedBack Form</h1>

      <div className="flex justify-end items- space-x-4">
        <div className="ml-auto col-6 col-md-4 col-lg-3">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search"
              value={search}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </InputGroup>
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
                <td>{client.percentage}</td>
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
