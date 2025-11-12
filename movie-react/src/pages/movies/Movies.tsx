import { NavLink } from "react-router"

function Movies(){
    return <div>
        <h2>Movie page</h2>
        <NavLink to="/add-movie">Add Movie</NavLink>
    </div>
}
export default Movies