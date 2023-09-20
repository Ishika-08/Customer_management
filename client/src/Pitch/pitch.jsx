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
            <label className="mb-3">Select Mailbox</label> 
            <select 
            className="form-control select2 select2-hidden-accessible"  
            tabIndex="-1" 
            aria-hidden="true"
            onChange={(e) => setTable(e.target.value)}>
                <option>---------</option>
                <option>ellieben11@gmail.com</option>
                <option>breannethorne11@gmail.com</option>
                <option>johnocampos121@gmail.com</option>
                <option>walterrichards21@gmail.com</option>
                <option>quinnwilde761@gmail.com</option>
                <option>eziomontoya1@gmail.com</option>
                <option>siasmith21@gmail.com</option>
                <option>avasmith2112@gmail.com</option>
                <option>rebeccarogers1101@gmail.com</option>
                <option>katiespring83@gmail.com</option>
                <option>chrisholland481@gmail.com</option>
                <option>ashtonmarlo21@gmail.com</option>
                <option>brandonallen1101@gmail.com</option>
                <option>daisyjohnson622@gmail.com</option>
            </select> 
            <button className="btn btn-lg btn-success mt-4">Search</button>
            </form>
    </div> 
</div>


        </div>
    )
}

export default AddData