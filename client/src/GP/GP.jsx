import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const [content, setContent] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [selectedRowStatus, setSelectedRowStatus] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [site, setSite] = useState()

    const navigate= useNavigate()

    const handleSearch = () => {
        axios.get('http://localhost:3000/search/' + searchEmail)
            .then(result => {
                setContent(result.data);
            })
            .catch(err => console.log(err));
    };


    const handleCheckboxChange = (event, contentId, status, site) =>{
        setSite(site)
        if (event.target.checked) {
          setSelectedIds( prev => [
            ...prev,
            contentId
        ]);
          setSelectedRowStatus(status);
        } else {
            console.log(selectedIds)
          const index = selectedIds.indexOf(contentId);
          if (index !== -1) {
            selectedIds.splice(index, 1);
            setSelectedRowStatus("");
          }
        }
      }

      const handleDelete = () => {
        if (selectedIds.length === 0) {
          alert('Select at least one item to delete.');
          return;
        }
      
        axios
          .delete('http://localhost:3000/delete', { data: { ids: selectedIds } })
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


      const handleTopics = () => {
        navigate(`/GP/Topics/${site}`)
        console.log(selectedIds)
        console.log(selectedRowStatus)
    }
    

    return (
        <>
        {/* search bar */}
                <div className="container">
                 <br/>
	            <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8">
                            <form className="card card-sm">
                                <div className="card-body row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <i className="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div className="col">
                                        <input
                                        className="form-control form-control-lg form-control-borderless" 
                                        type="search" 
                                        placeholder="Search Email"
                                        onChange={(e) => setSearchEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-lg btn-success" type="button" onClick={handleSearch}>Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                

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
                        // disabled={ selectedIds.length !== 1 && selectedRowStatus !== "pending"} // Step 3
                    >
                        Topics
                    </button>
                    </div>
                </div>


        {/* the search table */}
                <section className="intro my-5">
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
                                </tr>
                                </thead>
                                <tbody>
                                {content.map((content, index) => {
                                                const rowNumber = index + 1
                                                return(<tr key={content._id} scope="row">
                                                <td>
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" 
                                                        onChange={(event) => {
                                                            handleCheckboxChange(event, content._id, content.Status, content.Site)}}
                                                    />
                                                    <label class="custom-control-label" for="customCheck1">  {rowNumber}</label>
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
                                                </tr>)
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

                <div className="container">
                </div>

        </>
    );
}
export default Home;

