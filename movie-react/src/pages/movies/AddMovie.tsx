import { NavLink } from "react-router"
import { Button, Form } from "react-bootstrap"
import { useState, type ChangeEvent, type FormEvent } from "react"
import ApiClient from "../../utils/ApiClient"

interface FormMovie{
    judul : string,
    tahunRilis : string,
    sutradara : string
}

function AddMovies(){
    
        const [form, setform] = useState<FormMovie>({
        judul : "",
        tahunRilis : "",
        sutradara : ""
    })
    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setform({
            ...form,
            [name] : value 
        })
    }
    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault ();
        try {
            const response = await ApiClient.post('/movie', form)
        }catch (error) {
            console.log(Response);
        }
    }
    return <div className="container mx-auto">
        <h2 style={{ color: "#662222" }}>Add Movie Page</h2>
        <NavLink to="/"style={{ backgroundColor: "#EE6983", borderColor: "#ff0a54" }}className="btn btn-primary">List Movie</NavLink>
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formJudul">
                <Form.Label>Judul</Form.Label>
                <Form.Control 
                    value = {form.judul}
                    onChange = {handleInputChange}
                    name="judul"
                    type="text" 
                    placeholder="Judul Film"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formtahunRilis">
                <Form.Label>Tahun Rilis</Form.Label>
                <Form.Control 
                    value = {form.tahunRilis}
                    onChange = {handleInputChange}
                    name="tahunRilis"
                    type="text" 
                    placeholder="Tahun Rilis"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSutradara">
                <Form.Label>Sutradara</Form.Label>
                <Form.Control
                    value = {form.sutradara} 
                    onChange = {handleInputChange}
                    name="sutradara"
                    type="text" 
                    placeholder="Sutradara"/>
            </Form.Group>
            <Button type="submit" variant="primary" style={{ backgroundColor: "#EE6983", borderColor: "#ff0a54" }}className="btn btn-primary">
                Simpan
            </Button>
        </Form>
    </div>
    </div>
    
}
export default AddMovies