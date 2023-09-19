import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [content, setContent] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');


    const handleSearch = () => {
        axios.get('http://localhost:3000/search/' + searchEmail)
            .then(result => {
                console.log(result.data);
                setContent(result.data);
            })
            .catch(err => console.log(err));
    };


    return (
        <>
                <div class="container">
                 <br/>
	            <div class="row justify-content-center">
                        <div class="col-12 col-md-10 col-lg-8">
                            <form class="card card-sm">
                                <div class="card-body row no-gutters align-items-center">
                                    <div class="col-auto">
                                        <i class="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div class="col">
                                        <input
                                        class="form-control form-control-lg form-control-borderless" 
                                        type="search" 
                                        placeholder="Search Email"
                                        onChange={(e) => setSearchEmail(e.target.value)}
                                        />
                                    </div>
                                    <div class="col-auto">
                                        <button class="btn btn-lg btn-success" type="button" onClick={handleSearch}>Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                

                <div className="d-flex justify-content-center align-items-center">
                    <td className="m-2">
                    <Link to="/AddData" className="btn btn-primary btn-lg mt-5">+Add</Link>
                    </td>

                    <td className="m-2">
                    <Link to="/AddData" className="btn btn-success btn-lg mt-5">Edit</Link>
                    </td>

                    <td className="m-2">
                    <Link to="/AddData" className="btn btn-secondary btn-lg mt-5">Suggest topics</Link>
                    </td>
                </div>

                <section class="intro mt-5">
                <div class="gradient-custom-2 h-100">
                    <div class="mask d-flex align-items-center h-100">
                    <div class="container">
                        <div class="row justify-content-center">
                        <div class="col-12">
                            <div class="table-responsive">
                            <table class="table table-light table-bordered mb-0">
                                <thead>
                                <tr>
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
                                {content.map(content => {
                                                return(<tr key={content._id} scope="row">
                                                <td>{content.Mailboxes}</td>
                                                <td>{content.DocsURL}</td>
                                                <td>{content.Title}</td>
                                                <td>{content.EmailID}</td>
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

