import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import axios from "axios"

function SearchTable({ content, handleCheckboxChange, selectedIds, selectedRowStatus }) {
  const [domain, setDomain] = useState()
  const [websitesFound, setWebsitesFound] = useState([])
  const [website, setWebsite] = useState([])
  const [showWebsiteTable, setShowWebsiteTable] = useState(false);
  const [updateSiteId, setUpdateSiteId] = useState()
  const [searchContent, setSearchContent] = useState(content); 

  
  useEffect(() => {
    setSearchContent(content);
  }, [content]);
  


  useEffect(() => {
    if (domain) {
      axios.get("http://localhost:3000/website/" + domain)
        .then(result => {
          setWebsitesFound(result.data.websitesFound)})
        .catch(err => console.log(err));
    }
  }, [domain]); 

  useEffect(() => {
    axios.get("http://localhost:3000/websites/")
    .then(result => setWebsite(result.data.websiteNames))
    .catch(err => console.log(err));
  }, []); 


//used for suggest site button get domain
  const handleSite = (Email, id) => {
    setUpdateSiteId(id);
    axios.get("http://localhost:3000/database/" + Email)
      .then(result => {
        const websiteUrl = result.data[0].Website;
        const url = new URL(websiteUrl);
        const domain = url.hostname; // Extract the domain from the URL
        setDomain(domain);
        setShowWebsiteTable(true);
      })
      .catch(err => console.log(err));
  }
  
//used for updating site name in contents table and rerendering table
    const handleSelect = (websiteName) =>{
      axios.put('http://localhost:3000/content/update/' + updateSiteId, {...content, Site: websiteName})
   .then(result =>{
    console.log(result)
    const updatedObjectIndex = content.findIndex(obj => obj._id === result.data._id);
        if (updatedObjectIndex !== -1) {
          const updatedContent = [...content];
          updatedContent[updatedObjectIndex] = result.data;
          setSearchContent(updatedContent);
          setShowWebsiteTable(false)
  }})
   .catch(err => console.log(err))
    }



  return (
    <>
{/* Search result table */}
    <section className="intro m-2">
      <div className="gradient-custom-2 h-100">
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-light table-bordered mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Select</th>
                        <th scope="col">Mailbox</th>
                        <th scope="col">Docs URL</th>
                        <th scope="col">Title</th>
                        <th scope="col">Email Id</th>
                        <th scope="col">Status</th>
                        <th scope="col">Site</th>
                        <th scope="col">Requirements</th>
                        <th scope="col">DF</th>
                        <th scope="col">Action</th> {/* New column */}
                      </tr>
                    </thead>
                    <tbody>
                      {searchContent.map((content, index) => {
                        const rowNumber = index + 1;
                        return (
                          <tr key={content._id} scope="row">
                            <td>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  onChange={(event) => {
                                    handleCheckboxChange(event, content._id, content.Status, content.Site);
                                  }}
                                />
                                <label className="custom-control-label" htmlFor="customCheck1">
                                  {" "}
                                  {rowNumber}
                                </label>
                              </div>
                            </td>
                            <td>{content.Mailboxes}</td>
                            <td>{content.DocsURL}</td>
                            <td>{content.Title}</td>
                            <td>{content.Email}</td>
                            <td>{content.Status}</td>
                            <td>{content.Site}</td>
                            <td>{content.Requirements}</td>
                            <td>{content.DF}</td>
                            <td>
                              {content.Status === ("sent" || "Sent") && (
                                <Link
                                  to={`/GP/publish/${content.Site}/${content._id}/`}
                                  className="btn btn-success"
                                  onClick={() => {
                                    // Handle publish action here
                                  }}
                                >
                                  Publish
                                </Link>
                              )}
                              {(content.Site === undefined || content.Site === "") && (
                                <Link
                                  className="btn btn-success"
                                  onClick={()=> handleSite(content.Email, content._id)}
                                >
                                  Suggest Site
                                </Link>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


{/* website table list */}
{showWebsiteTable && (
        <section className="additional-table m-2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <h2>Website Information</h2>
                <table className="table table-light table-bordered mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Website Name</th>
                      <th scope="col">Presence</th>
                      <th scope="col">Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {website.map((websiteName, index) => {
                      const isPresent = websitesFound.includes(websiteName);
                      const textColorClass = isPresent ? "text-success" : "text-danger"; 

                      return (
                        <tr key={index}>
                          <td>{websiteName}</td>
                          <td className={textColorClass}>{isPresent ? "Present" : "Not Present"}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                handleSelect(websiteName)
                              }}
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
</>
    
  );
}

export default SearchTable;
