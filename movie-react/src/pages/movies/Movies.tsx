import { useState } from "react"
import { NavLink } from "react-router"

interface Movies{
    _id : string,
    judul : string,
    tahunRilis : string,
    sutradara : string,
    createdAt : string,
    updateAt : string
}

function Movies(){
    const [movies, setMovies] = useState([])
    return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3">
        <h2>Movie page</h2>
        <NavLink to="/add-movie" className="btn btn-primary">Add Movie</NavLink>
     </div>
    </div>
}
export default Movies