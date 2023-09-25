import React, { useState } from "react";
import axios from "axios";

function Search({ setSearchResults }) {
  const [searchEmail, setSearchEmail] = useState("");

  const handleSearch = () => {
    axios
      .get('http://localhost:3000/search/' + searchEmail)
      .then((result) => {
        setSearchResults(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <br />
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
                <button
                  className="btn btn-lg btn-success"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
