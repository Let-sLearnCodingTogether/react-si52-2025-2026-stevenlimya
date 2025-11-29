import { Button, Form } from "react-bootstrap"

function SignUp(){
    return <div>
        <Form>
            <Form.Group className ="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    name ="username" 
                    type="text"
                    placeholder="Username"/>
            </Form.Group>
            <Form.Group  className ="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    name ="email" 
                    type="text"
                    placeholder="Email"/>
            </Form.Group>
            <Form.Group className ="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    name ="password" 
                    type="text"
                    placeholder="Password"/>
            </Form.Group>

            <Button type="submit" variant="primary">
                Simpan
            </Button>
        </Form>
        </div>
    
}

export default SignUp