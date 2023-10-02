import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AddData = ()=>{ 
    const [table, setTable] = useState()
    const [models, setModels] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/models/")
        .then(result => {setModels(result.data.modelNames)
        console.log(result.data)})
        .catch(err => console.log(err));
      }
      , []); 

      models.map(element => {
        console.log(element)
      })

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
                {models.map(element => {
                    return <option>{element}</option>
                })}
            </select> 
            <button className="btn btn-lg btn-success mt-4">ADD</button>
            </form>
    </div> 
</div>


        </div>
    )
}

export default AddData