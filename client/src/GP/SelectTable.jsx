import {useState} from "react"
import { useNavigate } from "react-router-dom"

const AddData = ()=>{ 
    const [table, setTable] = useState()


    const navigate= useNavigate()

    const handleChange =()=>{
        navigate(`/AddData/${table}`)
    }

    return(
        <div className="container vh-100 mt-5">
            <div className="row justify-content-center">
            <div className="col-md-6 card p-5">
            <form className="form-group " onSubmit={handleChange}> 
            <label>Select Table</label> 
            <select 
            className="form-control select2 select2-hidden-accessible"  
            tabIndex="-1" 
            aria-hidden="true"
            onChange={(e) => setTable(e.target.value)}>
                <option>---------</option>
                <option value="H4">4H</option>
                <option>Accounts</option>
                <option>Can</option>
                <option>Contents</option>
                <option>CT</option>
                <option>Database</option>
                <option>FAO</option>
                <option>FP</option>
                <option>SC</option>
                <option>TPlus</option>
                <option>TH</option>
                <option>Topics2</option>
                <option>TW</option>
                <option>VE</option>
                <option>ExtraContents</option>
            </select> 
            <button className="btn btn-lg btn-success mt-4">ADD</button>
            </form>
    </div> 
</div>


        </div>
    )
}

export default AddData