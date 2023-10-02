import React, { useState, useEffect } from 'react';
import axios from "axios"

const Table = () => {
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3000/check-links/get-links/")
  .then(result => setUpdatedData(result.data))
  .catch(err => console.log(err))
  },[])

  

  console.log(updatedData)

  const handleDelete = (rowId) => {
    
    const updatedRows = updatedData.filter((row) => row.websiteRow._id !== rowId);
    setUpdatedData(updatedRows);
  };

  const handleUpdate = (rowId) => {
   
  };

  return (
    <div>
    {Object.entries(updatedData).map(([key, value]) => (
      <div key={key} className='p-5'>
        <h2 className="text-center">{key}</h2>
        <div className="table-responsive"  > {/* Center the table */}
          <table className="table table-bordered"> {/* Limit the table's maximum width */}
            <thead>
              <tr>
                <th>Mailbox</th>
                <th>Email</th>
                <th>DF</th>
                <th>Topic</th>
                <th>LTE</th>
                <th>AnchorText</th>
                <th>PublishedLink</th>
                <th>Status</th>
                <th>New AnchorText</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {value.map((row) => (
                <tr key={row._id}>
                  <td>{row.websiteRow.Mailbox}</td>
                  <td>{row.websiteRow.Email}</td>
                  <td>{row.websiteRow.DF}</td>
                  <td>{row.websiteRow.Topic}</td>
                  <td>{row.websiteRow.LTE}</td>
                  <td>{row.websiteRow.AnchorText}</td>
                  <td>{row.websiteRow.PublishedLink}</td>
                  <td>{row.websiteRow.Status}</td>
                  <td>{row.newAnchor}</td>
                  <td>
                    {row.newAnchor ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleUpdate(row.websiteRow._id)}
                      >
                        Update
                      </button>
                    ) : (
                      <button className="btn btn-secondary" disabled>
                        Update
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(row.websiteRow._id)}
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
    ))}
  </div>
  
  );
};

export default Table;
