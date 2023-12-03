// src/GitHubProfile.js
import React, { useState } from 'react';
import axios from 'axios';
import './GitHubProfile.css';

const GitHubProfile = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos`);

      setUserData(userResponse.data);
      setRepos(repoResponse.data);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openRepoModal = (repo) => {
    setSelectedRepo(repo);
  };

  const closeRepoModal = () => {
    setSelectedRepo(null);
  };

  return (
    <div className={`github-profile ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="mode-toggle">
        <label>
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          Dark Mode
        </label>
      </div>
      <h1>GitHub Portfolio Generator</h1>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontSize: '18px' }}>
          GitHub Username:
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        />
        <button
          onClick={fetchUserData}
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Generate Portfolio
        </button>
      </div>

      {userData && (
        <div className="user-profile">
          <img src={userData.avatar_url} alt="GitHub Avatar" />
          <div>
            <h2>{userData.name}</h2>
            <p>{userData.bio}</p>
            <p>Followers: {userData.followers}</p>
            <p>Following: {userData.following}</p>
            <p>Public Repositories: {userData.public_repos}</p>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="repo-list">
          <h2>Repositories</h2>
          <div className="repo-cards">
            {repos.map((repo) => (
              <div key={repo.id} className="repo-card" onClick={() => openRepoModal(repo)}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
              </div>
            ))}
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
  );
};

export default GitHubProfile;
