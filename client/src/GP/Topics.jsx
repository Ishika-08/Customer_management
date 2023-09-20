import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const Topics = ()=>{

    const {site} = useParams()
    const [content, setContent] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3000/GP/Topics/" + site)
        .then(result => {
            console.log(result)
            setContent(result.data)})
        .catch(err => console.log(err))
    },[])
    

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
                                    <th scope="col">DocsURL</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {content.map((content, index) => {
                                                const rowNumber = index + 1
                                                return(<tr key={content._id} scope="row">
                                                <td>{content.DocsURL}</td>
                                                <td>{content.Title}</td>
                                                <td>{content.Status}</td>
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
        </>
    )
}

export default Topics