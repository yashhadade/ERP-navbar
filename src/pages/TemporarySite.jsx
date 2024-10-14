
import { deleteProduct } from "./DeleteAPI";
import useCustomReactQuery from "./getForAllApi";


const TemporarySite = () => {
  const [product,setProduct] = useCustomReactQuery('temp-site');

  
 
  

  return (
    <div className="container">
      <div className="TemporaryClient" >
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
                    className="edit"
                  >
                    Edit
                  </button>
                  <button
                   
                    className="delete" onClick={() => deleteProduct("temp-site/delete", site.id, setProduct)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default TemporarySite;
