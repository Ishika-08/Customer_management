import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Topic from "./Topics"
import Search from "./Search"
import SearchTable from "./SearchTable";

function Home() {
    const [content, setContent] = useState([]);
    const [selectedRowStatus, setSelectedRowStatus] = useState();
    const [selectedIds, setSelectedIds] = useState([]);
    const [site, setSite] = useState()
    const [showTopics, setShowTopics] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const navigate= useNavigate()
    console.log(showTopics)
    console.log(selectedIds.length)
    console.log(selectedIds)



    const handleCheckboxChange = (event, contentId, status, site) => {
      
        if (event.target.checked) {
            setSite(site);
          setSelectedIds((prev) => [...prev, contentId]);
          setSelectedRowStatus(status);
        } else {
          const updatedSelectedIds = selectedIds.filter(id => id !== contentId);
          setSelectedIds(updatedSelectedIds);
          setShowTopics(false);

      
          if (updatedSelectedIds.length === 0) {
            setSelectedRowStatus("");
          }
        }
      };
      
      

      const handleDelete = () => {
        const table = "Contents"
        if (selectedIds.length === 0) {
          alert('Select at least one item to delete.');
          return;
        }
      
        axios
          .delete('http://localhost:3000/delete/' + table, { data: { ids: selectedIds } })
          .then((response) => {
            console.log(response.data); 
            setContent((prevContent) =>
              prevContent.filter((item) => !selectedIds.includes(item._id))
            );
          })
          .catch((error) => {
            console.error('Delete request error:', error);
          });
      };
      

      const handleUpdate = (e)=>{
        e.preventDefault()
        if(selectedIds.length === 1){
            navigate(`Update/${selectedIds[0]}`)
        }
        else{
                <h4>You can only update one entry at a time</h4>
        }
      }


      useEffect(() => {
       
      }, [selectedIds, selectedRowStatus]);
    
    const handleTopics = () => {
        if(selectedIds.length === 1)
        setShowTopics(true);
    }
    
    useEffect(() => {
        // When searchResults change, update the content state
        setContent(searchResults);
      }, [searchResults]);

    return (
        <>
         <Search setSearchResults={setSearchResults} />
                

        {/* three buttons */}
                <div className="d-flex justify-content-center align-items-center">
                    <div className="m-2">
                    <Link to="/AddData" className="btn btn-primary btn-lg mt-5">+Add</Link>
                    </div>

                    <div className="m-2">
                    <button className="btn btn-success btn-lg mt-5" onClick={handleUpdate}>Update</button>
                    </div>

                    <div className="m-2">
                    <button className="btn btn-danger btn-lg mt-5" onClick={handleDelete}>Delete</button>
                    </div>

                    <div className="m-2">
                        <button className="btn btn-primary btn-lg mt-5" onClick={()=>navigate("/AddWebsite")}>Add Website</button>
                    </div>

                    <div className="m-2">
                    <button
                        className="btn btn-info btn-lg mt-5"
                        onClick={handleTopics}
                        disabled={(selectedIds.length) !== 1  || selectedRowStatus !== "pending"}
                    >
                        Topics
                    </button>
                    </div>
                </div>


              <SearchTable
                          content={content}
                          handleCheckboxChange={handleCheckboxChange}
                          selectedIds={selectedIds}
                          selectedRowStatus={selectedRowStatus}
                      />

                  {showTopics && (selectedIds.length) === 1 && (
                      <div className="container">
                          <Topic site={site}/>
                      </div>
                  )}  
        </>
    );
}
export default Home;

