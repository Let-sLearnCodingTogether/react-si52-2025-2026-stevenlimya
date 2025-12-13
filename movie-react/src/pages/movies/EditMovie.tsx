
import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"
import { useParams, useNavigate } from "react-router"


interface FormMovie {
    judul : string,
    tahunRilis : string,
    sutradara : string
}

interface ResponseData {
    data : {
        _id : string,
        judul : string,
        sutradara : string,
        tahunRilis : string, 
        createBy : string,
        createAt : string,
        updateAt : string,
        __v : string,
    },
    message : string
}
function EditMovie() {
    const params = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState<FormMovie>({
        judul : "",
        tahunRilis : "",
        sutradara : ""
    })

    const fetchMovies = useCallback(async() => {
        const response = await ApiClient.get(`/movie/${params.id}`)
        
        if(response.status === 200) {
            const responseData : ResponseData = response.data
            setForm({
                judul : responseData.data.judul,
                tahunRilis : responseData.data.tahunRilis,
                sutradara : responseData.data.sutradara
            })
        }
    }, [params])

    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        try {
            const response = await ApiClient.put(`/movie/${params.id}`, form);
            navigate("/movie", {
                replace : true
            })
            
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [fetchMovies])

    return <div className = "container mx-auto">
        <div className="d-flex justify-content-betwenn mb-3">
        <h2> Edit Movie Page</h2>
        <NavLink to = "/movie" className= "btn btn-primary">List Movie</NavLink>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
               <Form.Group className="mb-3" controlId="fromJudul">
                     <Form.Label>Judul</Form.Label>
                     <Form.Control 
                        value={form.judul}
                        onChange={handleInputChange}
                        name="judul" 
                        type="text" 
                        placeholder="Judul Film"/>
               </Form.Group>
                <Form.Group className="mb-3" controlId="fromTahunRilis">
                     <Form.Label>Tahun Rilis</Form.Label>
                     <Form.Control 
                        value={form.tahunRilis}
                        onChange={handleInputChange}
                        name="tahunRilis" 
                        type="text" 
                        placeholder="Tahun Rilis"/>
               </Form.Group>
                <Form.Group className="mb-3" controlId="fromSutradara">
                     <Form.Label>Sutradara</Form.Label>
                     <Form.Control 
                        value={form.sutradara}
                        onChange={handleInputChange}
                        name="sutradara" 
                        type="text" 
                        placeholder="Sutradara"/>
               </Form.Group>
               <Button type="submit" variant="primary">
                    Update
               </Button>
            </Form>
        </div>
    </div>
}

export default EditMovie