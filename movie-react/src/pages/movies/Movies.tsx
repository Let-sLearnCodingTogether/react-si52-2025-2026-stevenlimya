import { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"
import { Button, Table } from "react-bootstrap"

interface Movie {
    _id : string,
    judul : string,
    tahunRilis : string,
    sutradara : string,
    createdAt : string,
    updatedAt : string
}

function Movies() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchMovies = useCallback(async () => {
        const response = await ApiClient.get("/movies")

        if(response.status == 200) {
            setMovies(response.data.data)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchMovies()
    }, [fetchMovies])

    const handleDelete = async (movieId: String) => {
        const response = await ApiClient.delete(`/movies/${movieId}`)

        if (response.status == 200) {
            fetchMovies()
        }
    }

    return <div className="container mx-auto">
        <div className ="d-flex justify-content-between mb-3">
            <h2> Movie Page </h2>
            <NavLink to="/movies/add-movie" className="btn btn-primary"> Add Movies </NavLink>
        </div>
        <div>
            <Table className="table table-striped">
                <thead>
                    <th> No </th>
                    <th> Judul </th>
                    <th> Tahun Rilis </th>
                    <th> Sutradara </th>
                    <th> Aksi </th>
                </thead>
                <tbody>
                    {
                        loading && <tr>
                            <td colSpan={5}>Loading......</td>
                        </tr>
                    }
                    
                    {
                        movies.length > 0 && movies.map((movie, index) =>{
                            return <tr key={movie._id}>
                                <td>{index +1}</td>
                                <td>{movie.judul}</td>
                                <td>{movie.tahunRilis}</td>
                                <td>{movie.sutradara}</td>
                                <td>
                                    <NavLink to={`/movies/edit-movies/${movie._id}`} className="btn btn-primary"> Edit </NavLink>
                                    <Button variant="btn"className="btn btn-danger" onClick={() => handleDelete(movie._id)}> Delete </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    </div>
}

export default Movies