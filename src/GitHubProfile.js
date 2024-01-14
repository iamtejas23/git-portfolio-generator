// src/GitHubProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GitHubProfile.css';
import { FaGithub, FaSearch, FaMoon, FaSun, FaCalendar, FaUser, FaUsers, FaCode } from 'react-icons/fa';

const GitHubProfile = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        setUserData(userResponse.data);
        setSelectedRepo(null); // Reset selected repo when fetching new user data
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };



  const closeRepoModal = () => {
    setSelectedRepo(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='grep'>
      <div className={`github-profile ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="mode-toggle">
          <label>
            {darkMode ? <FaSun /> : <FaMoon />}
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          </label>
        </div>
        <h1>
          <FaGithub /> GitHub Profile Generator
        </h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUsername(username)}>
            <FaSearch /> Search
          </button>
        </div>

        {userData && (
          <div className="user-profile">
            <div className='pro-avt'>
            <img src={userData.avatar_url} alt="GitHub Avatar" />
            <h2>{userData.name}</h2>
            </div>
            <div>
              
              <p>{userData.bio}</p>
              <div className="info-icons">
                <p>
                  <FaCalendar /> Joined {formatDate(userData.created_at)}
                </p>
                <p>
                  <FaUser /> Followers: {userData.followers}
                </p>
                <p>
                  <FaUsers /> Following: {userData.following}
                </p>
                <p>
                  <FaCode /> Public Repositories: {userData.public_repos}
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedRepo && (
          <div className="repo-modal" onClick={closeRepoModal}>
            <div className="modal-content">
              <h2>{selectedRepo.name}</h2>
              <p>{selectedRepo.description}</p>
              <p>Language: {selectedRepo.language}</p>
              <p>Stars: {selectedRepo.stargazers_count}</p>
              <p>Forks: {selectedRepo.forks}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubProfile;
