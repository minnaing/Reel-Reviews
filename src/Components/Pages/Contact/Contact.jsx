import { useState } from "react";
import { Container, Form, Button, Row, Col, Stack } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./contact.css"; // IMPORT STYLESHEET FOR STYLING THE PAGE COMPONENTS

const ContactUs = () => {
  // State for storing input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Here, you would typically send the data to a server
    // For demonstration, we'll just log it to the console
    console.log("Submitting contact form with the following details:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // Optionally, clear the form fields after submission
    setName("");
    setEmail("");
    setMessage("");

    // Show a confirmation message or handle the submission result here
    alert("Thank you for contacting us! We will get back to you soon.");
  };

  return (
    <div id="contact-wrapper">
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>Get in Touch</h2>

            <Stack gap={2}>
              <div className="p-2">
                Your journey through cinema is unique, and at the Age Group Review App, we're dedicated to making movie
                discovery personalized for every age. Your insights and feedback are crucial to us—helping bridge the
                gap between generations and enhance your viewing experience.
              </div>
              <div className="p-2">
                Questions or suggestions? We want to hear from all corners of our diverse audience. Your input drives
                our mission forward, enabling us to refine and improve continuously.
              </div>
              <div className="p-2">
                Use the form below to share your thoughts, ideas, or any inquiries. Let's shape the future of movie
                discovery together, making it more inclusive and tailored to every viewer.
              </div>
            </Stack>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </Form.Group>
              <Button id="contact-submit" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
