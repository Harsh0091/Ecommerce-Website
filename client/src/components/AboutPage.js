import React from 'react';
import './AboutPage.css'; // Ensure this path is correct

const AboutPage = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-text">
          <h1>About RED STORE</h1>
          <p>Your go-to destination for trendy and stylish clothing.</p>
        </div>
      </section>
      <section className="about-content">
        <h2>Our Story</h2>
        <p>At RED STORE, we believe in fashion that empowers and inspires. Founded in 2020, our mission is to offer a curated selection of high-quality clothing that fits every style and occasion. From everyday essentials to standout pieces, we aim to make every shopping experience memorable.</p>
        <p>Our team is passionate about providing exceptional customer service and ensuring that our customers find exactly what they’re looking for. We source our products from trusted brands and designers, and we are committed to offering sustainable and ethically made clothing.</p>
        <h2>Our Values</h2>
        <ul>
          <li><strong>Quality:</strong> We prioritize high-quality materials and craftsmanship.</li>
          <li><strong>Sustainability:</strong> We support eco-friendly and ethical practices.</li>
          <li><strong>Customer Satisfaction:</strong> We strive to exceed our customers' expectations.</li>
        </ul>
      </section>
      <section className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="team-member1.jpg" alt="Team Member 1" className="team-image" />
            <h3>Jane Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="team-member2.jpg" alt="Team Member 2" className="team-image" />
            <h3>John Smith</h3>
            <p>Head of Design</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
