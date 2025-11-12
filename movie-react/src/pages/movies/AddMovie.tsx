import { NavLink } from "react-router"

function AddMovie(){
    return <div>
        <h2>AddMovie page</h2>
        <NavLink to="/" className="btn btn-primary">List Movies</NavLink>
    </div>
}
export default AddMovie