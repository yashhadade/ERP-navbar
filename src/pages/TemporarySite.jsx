import { useState } from "react";
import useCustomReactQuery from "./getForAllApi";
import useCustomGetIdReactQuery from "./getByIdAllApi";

const TemporarySite = () => {
  const [product] = useCustomReactQuery('temp-site');

  const [container, setContainer] = useState(false);
  const [editSiteId, setEditSiteId] = useState(null);
  function handleContainer(id) {
    setContainer(prev => !prev);
    setEditSiteId(id); // Store the id of the site being edited

  }

  return (
    <div className="container">
      <div className="TemporaryClient" style={{ display: container ? 'none' : '' }}>
        <h3>SITE LIST</h3>
        <button id="exportButton">Export to Excel</button>
        <h2>The Number of sites: {product.length}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Sr no</th>
              <th>Client Name</th>
              <th>Site Name</th>
              <th>Branch Name</th>
              <th>Zone Name</th>
              <th>State Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((site, index) => (
              <tr key={site.id}>
                <td>{index + 1}</td>
                <td>{site.client.clientName}</td>
                <td>{site.siteName}</td>
                <td>{site.branch}</td>
                <td>{site.zone.zoneName}</td>
                <td>{site.state.stateName}</td>
                <td>{site.city.cityName}</td>
                <td>{site.address}</td>
                <td>
                  <button
                    id={`edit-${site.id}`}
                    onClick={() => handleContainer(site.id)}
                    className="edit"
                  >
                    Edit
                  </button>
                  <button
                    id={`delete-${site.id}`}
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="TemporaryClient" style={{ display: container ? '' : 'none' }}>
        <h1>EDIT SITE</h1>
        <p>Editing site ID: {editSiteId}</p>
        <div>
          <label>Client Name:</label>
          <input type="text" placeholder="Client Name" required />
        </div>
        <button type="submit" className="save">Save</button>  
        <button onClick={() => handleContainer(null)}>Cancel</button> {/* Toggle without an ID */}
      </div>
    </div>
  );
};

export default TemporarySite;
