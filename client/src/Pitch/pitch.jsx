import { useState } from "react";
import axios from "axios";

const AddData = () => {
  const [site, setSite] = useState("");
  const [emails, setEmails] = useState([]);
  const [showEmails, setShowEmails] = useState(false); // Control visibility of email div
  console.log(site);

  const handleChange = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    console.log("Selected site:", site);
    axios
      .get("http://localhost:3000/copyEmails/" + site)
      .then((result) => {
        setEmails(result.data.eArray);
        setShowEmails(true); // Show the email div when emails are available
      })
      .catch((err) => console.log(err));
  };

  const handleCopy = () => {
    const allEmails = emails.join("\n");
    navigator.clipboard.writeText(allEmails).then(
      () => {
        console.log("copied");
      },
      (err) => {
        console.error("Copy failed: ", err);
      }
    );
  };

  const mailboxOptions = [
    { value: "", name: "---------" },
    { value: "Mobi", name: "ellieben11@gmail.com" },
    { value: "One", name: "breannethorne11@gmail.com" },
    { value: "PH", name: "johnocampos121@gmail.com" },
    { value: "TW", name: "walterrichards21@gmail.com" },
    { value: "TH", name: "quinnwilde761@gmail.com" },
    { value: "FAO", name: "eziomontoya1@gmail.com" },
    { value: "T+", name: "siasmith21@gmail.com" },
    { value: "CT", name: "avasmith2112@gmail.com" },
    { value: "VE", name: "rebeccarogers1101@gmail.com" },
    { value: "WT", name: "katiespring83@gmail.com" },
    { value: "4H", name: "katiespring83@gmail.com" },
  ];

  return (
    <div className="vh-100">
      <div className="container m-5">
        <div className="row justify-content-center">
          <div className="col-md-6 card p-5">
            <form className="form-group" onSubmit={handleChange}>
              <label className="mb-3">Select Mailbox</label>
              <select
                className="form-control select2 select2-hidden-accessible"
                tabIndex="-1"
                aria-hidden="true"
                onChange={(e) => setSite(e.target.value)}
              >
                {mailboxOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.value} : {option.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn btn-lg btn-success mt-4">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Email */}
      {showEmails && (
        <div className="container mt-5">
          <div className="text-center mb-4">
            <h3>Emails:</h3>
            <button className="btn btn-primary mx-2" onClick={handleCopy}>
              Copy Selected Titles
            </button>
          </div>
          <div className="row">
            {emails.map((email, index) => (
              <div className="col-md-3 mb-3" key={index}>
                <div className="card">
                  <div className="card-body">
                    <p className="card-text text-center">
                      {index + 1}. {email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddData;
