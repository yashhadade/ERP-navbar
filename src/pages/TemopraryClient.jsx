

function TemopraryClient(){
    function handleSubmit(event){
        event.preventDefault();
    }
    return(<div class="container">
        <div className="TemporaryClient">
            <h2>TEMPORARY CLIENT</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Client Name:</label>
                    <input type="text" placeholder="Client Name" required />
                </div>
                <button type="submit" className="submit">Submit</button>
            </form>
        </div>
        <div className="TemporaryClient">
            <h2>CLIENT LIST</h2>
            <button id="exportButton">Export to Excel</button>
            <table id="clientTable" class="display">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Client Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table> 
        </div>
    </div>)
}

export default TemopraryClient