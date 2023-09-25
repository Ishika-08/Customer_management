import { useState, useEffect } from "react";
import axios from "axios"; 
import { useParams, useNavigate} from "react-router-dom";

const Publish = () => {
  const [formData, setFormData] = useState({
    MailBox: "",
    LTE: "",
    AnchorText: "",
    PublishLink: "",
    DF: "",
    Email: "",
  });

  console.log(formData)
  const navigate = useNavigate()

  const table = useParams().table.toUpperCase();
  const id = useParams().id;

  useEffect(() => {
    axios.get(`http://localhost:3000/update/${id}`)
      .then(result => {
        setFormData(prev => ({
            ...prev,
            MailBox: result.data.Mailboxes || "",
            Email: result.data.Email || "",
          Title: result.data.Title || "",
          Site: result.data.Site || "",
        }))
      })
      .catch(err => console.log(err));

  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/Add/${table}`, formData)
      .then((result) => {
        navigate("/GP");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="d-flex p-5 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2>Add</h2>
            {Object.keys(formData).map((key) => (

              <div className="mb-2" key={key}>
              <label htmlFor={key}>{key}</label>
              {key === "DF" ? (
                <select
                  name={key}
                  className="form-control"
                  onChange={handleChange}
                  value={formData[key]}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <input
                  type="text"
                  name={key}
                  placeholder={`Enter ${key}`}
                  className="form-control"
                  onChange={handleChange}
                  value={formData[key]}
                />
              )}
            </div>

            ))}
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Publish;
