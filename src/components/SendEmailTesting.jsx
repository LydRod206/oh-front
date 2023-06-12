import React, { useState } from 'react';
import axios from "axios";

import { Form, Button } from 'react-bootstrap';


export default function SendEmailTesting() {
    const [recipient_email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessages] = useState("");


    function sendMail() {
        console.log("I'm the sendMail function!");

        if (recipient_email && subject && message) {

            // axios.post("http://localhost:9000/send_email", {
            axios.post("https://cryptic-woodland-28293.herokuapp.com/send_email", {
                recipient_email: recipient_email,
                subject: subject,
                message: message,
                //need all other info here. Maybe no alert and it's just the box that changes color
            })
            .then((res) => {
                console.log(res)
                alert("Email Sent!")
            
            }) 
            .catch((err) => alert(err));
        return;
    }
    return alert("You gotta fill out all the fields")
    }

    return (
        <Form onSubmit={(event) => {
            console.log(event.target)
            event.preventDefault()
            sendMail()
        } }>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Wow! I send emails!</Form.Label><br></br>
            <Form.Control 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" />
            </Form.Group>
    
            <Form.Group controlId="formBasicSubject">
            {/* <Form.Label>Subject of Email</Form.Label><br></br> */}
            <Form.Control 
                type="text" 
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject" />
            </Form.Group>

            <Form.Group controlId="formBasicMessage">
            {/* <Form.Label>Type Message</Form.Label> */}
            <Form.Control 
                type="text" 
                onChange={(e) => setMessages(e.target.value)}
                placeholder="Enter message" />
            </Form.Group>
    
            <Button 
                // onClick={() => sendMail()} 
                variant="primary" type="submit"
            >
                Send
            </Button>
        </Form>
        );
};

