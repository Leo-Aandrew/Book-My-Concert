import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-about">
          <h3>BookMyConcert</h3>
          <p>Your gateway to the best live concerts across the country.</p>
        </div>

        <div className="footer-policy">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@BookMyConcert.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BookMyConcert. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
