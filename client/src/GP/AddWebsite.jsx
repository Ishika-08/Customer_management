import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import {useNavigate} from "react-router-dom"

const AddWebsite = () => {
  const [websiteUrl, setWebsiteUrl] = useState();
  console.log(websiteUrl)
  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a GET request to the server to add a new website
      await axios.get(`http://localhost:3000/add-website/${websiteUrl}/`);
      
      // Handle success or any other necessary actions
      console.log(`Successfully added website: ${websiteUrl}`);
      navigate("/GP")
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error adding website:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          <h3>Add a Website</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="websiteUrl" className="form-label">
                Website Name
              </label>
              <input
                type= "text"
                className="form-control"
                id="websiteUrl"
                placeholder="Enter the website URL"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWebsite;
