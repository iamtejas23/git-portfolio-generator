// Footer.js
import React from 'react';
import './footer.css';
import { FaGithub } from 'react-icons/fa';


const Footer = () => {

  const githubProfileUrl = 'https://github.com/iamtejas23'; 

  return (
    <footer className="footer-container">
     <div className='ft-icon'>
     <FaGithub /> <span>Follow me on GitHub</span>
     </div>
      
      <p>Made By <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer">
      Tejas Mane
      </a>
        </p>
    </footer>
  );
};

export default Footer;
