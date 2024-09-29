import React from 'react';
import './ContactPage.css'; // Ensure this path is correct

const ContactPage = () => {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-text">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you!</p>3
        </div>
      </section>
      <section className="contact-content">
        <h2>Get in Touch</h2>
        <div className="contact-details">
          <p><strong>Email:</strong> support@redstore.com</p>
          <p><strong>Phone:</strong> +1 (123) 456-7890</p>
          <p><strong>Address:</strong> 123 Fashion St, Trendy City, CA 90001</p>
        </div>
        <form className="contact-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Your Name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Your Email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>

          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
