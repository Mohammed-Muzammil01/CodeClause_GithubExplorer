import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import coolOctocat from './coolOctocat.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userSearch, setUserSearch] = useState(null);
  const [userName, setUserName] = useState('');
  const [userName2, setUserName2] = useState('');
  const [userFollowers, setUserFollowers] = useState('');
  const [userRepos, setUserRepos] = useState('');
  const [userPic, setUserPic] = useState(coolOctocat);
  const [userProf, setUserProf] = useState('/');

  // useEffect(() => {
  //   console.log(userSearch);
  // }, [userSearch]);

  const getUser = async (userSearch) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${userSearch}`);
      const userData = response.data;
      // console.log(userData);
      setUserName(userData.name);
      setUserName2(userData.login);
      setUserFollowers(userData.followers);
      setUserRepos(userData.public_repos);
      setUserPic(userData.avatar_url);
      setUserProf(userData.html_url);
    } catch (error) {
      // console.log(error);
      alert('User not found!');
    }
  };
  return (
    <>

      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={coolOctocat} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
            GitHub Explorer
          </a>
        </div>
      </nav>

      <div className="body-container">
        <div className="search-bar">
          <input type="text" className="form-control" placeholder="Search..." name="search" onChange={(e) => setUserSearch(e.target.value)} />
          <button className="btn btn-dark" type="submit" onClick={() => getUser(userSearch)}>Search</button>
        </div>
        <div className="user-card-container">
          <img src={userPic} alt='user-pfp' className='user-pfp' />
          <div className='user-info'>
            <h1><a href={userProf} target="_blank" rel="noopener noreferrer">{userName ? userName : (userName2 ? userName2 : 'User Name')}</a></h1>
            <h5>Followers: {userFollowers ? userFollowers : 0}</h5>
            <h5>Repositories: {userRepos ? userRepos : 0}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
