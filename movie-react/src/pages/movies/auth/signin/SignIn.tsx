import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import ApiClient from "../../../../utils/ApiClient";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router";

interface SignInForm {
    email : string,
    password : string
}

function SignIn() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<SignInForm> ({
            email: "",
            password: ""
        })

    const onHandleChange = (event : ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target
        
            setForm({
                ...form,
                [name] : value
            })
        }
    
    const onSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await ApiClient.post('/signin', form)

            console.log(response.data);

            if (response.status === 200) {
                // redirect user ke halaman movie
                localStorage.setItem("AuthToken", response.data.data.token);
                navigate("/movies", {
                    replace : true
                })
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    
   return <div className="container mx-auto">
   <h1> Sign In </h1> <br></br> 
    <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        value={form.email}
                        onChange={onHandleChange}
                        name="email" 
                        type="text" 
                        placeholder="email"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="form">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={form.password}
                        onChange={onHandleChange}                     
                        name="password" 
                        type="password" 
                        placeholder="password"
                    />
                </Form.Group>
                <br></br>
                <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Sign In"}    
                </Button>        
                <NavLink to = "/signup"> Sign Up </NavLink>        
            </Form>
    </div>
}

export default SignIn