// src/App.js
import React from 'react';
import GitHubProfile from './GitHubProfile';
import './App.css'; // You can create this file to add global styles if needed
import Footer from './components/FooterA/Footer';

function App() {
  return (
    <div className="App">
      <GitHubProfile />
      <Footer/>
    </div>
  );
}

export default App;
