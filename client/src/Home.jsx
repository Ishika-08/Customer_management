import {Link} from 'react-router-dom'

const Home = ()=>{
    return(
        <div class="container d-flex justify-content-center align-items-center vh-100">
            <div className="row justify-content-center">
                <tr>
                <button class="w-100 btn btn-primary btn-lg mb-4">Pitching</button>
                </tr>
                <tr>
                <button class="w-100 btn btn-secondary btn-lg mb-4">Check Old Links</button>
                </tr>
                <tr>
                <Link to="/GP" class="w-100 btn btn-success btn-lg">Work on GP</Link>
                </tr>
            </div>
        </div>
    )
}

export default Home