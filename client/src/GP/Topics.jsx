import { useEffect, useState } from "react";
import axios from "axios";

const Topics = ({site}) => {
  const [content, setContent] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [copiedTitles, setCopiedTitles] = useState(""); 

  useEffect(() => {
    axios
      .get("http://localhost:3000/GP/Topics/" + site)
      .then((result) => {
        console.log(result);
        setContent(result.data);
      })
      .catch((err) => console.log(err));
  }, [site]);

  const handleCheckBox = (id) => {
    // Toggle the selection status of the row
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const handleCopy = () => {
    const selectedTitles = content
      .filter((row) => selectedRows.includes(row._id))
      .map((row) => row.Title)
      .join("\n");

    // Copy the selected titles to the clipboard
    navigator.clipboard.writeText(selectedTitles).then(() => {
      setCopiedTitles(selectedTitles);
    });
  };

  const handleSelect = (row)=>{
    const table = "ExtraContents"
    axios.post("http://localhost:3000/Add/" + "Contents", {DocsURL: row.DocsURL, Title: row.Title, Status:row.Status, Site: row.Site})
    .then(() => console.log("data added"))
    .catch(err => console.log(err))

    axios
    .delete('http://localhost:3000/delete/' + table, { data: { ids: row._id } })
    .then(() => {
      setContent((prevContent) =>
        prevContent.filter((item) => !(row._id).includes(item._id))
      );
    })
    .catch((error) => {
      console.error('Delete request error:', error);
    });
};


  

  return (
    <>
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
                          <th scope="col">#</th>
                          <th scope="col">DocsURL</th>
                          <th scope="col">Title</th>
                          <th scope="col">Status</th>
                          <th scope="col">Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {content.map((row, index) => {
                          const rowNumber = index + 1;
                          return (
                            <tr key={row._id}>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={selectedRows.includes(row._id)}
                                  onChange={() => handleCheckBox(row._id)}
                                />
                                {rowNumber}
                              </td>
                              <td>{row.DocsURL}</td>
                              <td>{row.Title}</td>
                              <td>{row.Status}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleSelect(row)}
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
            </div>
          </div>
        </div>
      </section>
      <button className="btn btn-primary mx-5" onClick={handleCopy}>
        Copy Selected Titles
      </button>
      {copiedTitles && (
        <div>
          <strong>Copied Titles:</strong>
          <pre>{copiedTitles}</pre>
        </div>
      )}
    </>
  );
      }

export default Topics
