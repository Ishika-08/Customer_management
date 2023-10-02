import {Link} from 'react-router-dom'

const Home = ()=>{
    return(
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row justify-content-center">
                <tr>
                <Link to="/pitch" className="w-100 btn btn-primary btn-lg mb-4">Pitching</Link>
                </tr>
                <tr>
                <Link to="/checkLinks" className="w-100 btn btn-secondary btn-lg mb-4">Check Old Links</Link>
                </tr>
                <tr>
                <Link to="/GP" className="w-100 btn btn-success btn-lg">Work on GP</Link>
                </tr>
            </div>
        </div>
    )
}

export default Home