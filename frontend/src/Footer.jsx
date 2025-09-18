import React from "react";
import "./Footer.css";
import {FaGithub, FaLinkedin} from "react-icons/fa";

function Footer({ github = "#", linkedin = "#" }) {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="contact">
          <h4>Contact</h4>
          <a href="mailto:chetankiranstd@gmail.com" className="email">
            chetankiranstd@gmail.com
          </a>
        </div>

        <div className="profiles">
          <ul>
            <li>
              <a
                href={"https://github.com/Chetan-Kiran"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FaGithub />
                GitHub
              </a>
            </li>
            <li>
              <a
                href={"https://www.linkedin.com/in/chetan-kiran-b7263731b/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin/>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-note">
        © {new Date().getFullYear()} Chetan Kiran. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
