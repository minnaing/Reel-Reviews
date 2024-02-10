
import React, { useState } from 'react';
import './pages.css'; // IMPORT STYLESHEET FOR STYLING THE PAGE COMPONENTS

const ContactUs = () => {
    // State for storing input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Here, you would typically send the data to a server
        // For demonstration, we'll just log it to the console
        console.log('Submitting contact form with the following details:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);

        // Optionally, clear the form fields after submission
        setName('');
        setEmail('');
        setMessage('');

        // Show a confirmation message or handle the submission result here
        alert('Thank you for contacting us! We will get back to you soon.');
    };

    return (
        <div className="contactUsWrapper">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ContactUs;



