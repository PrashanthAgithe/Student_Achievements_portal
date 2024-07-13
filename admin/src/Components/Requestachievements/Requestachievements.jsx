import React, { useEffect, useState } from 'react';
import './Requestachievements.css';
import Achievement from '../Achievement/Achievement';
import { AiOutlineSearch } from "react-icons/ai";

const Requestachievements = () => {
  const [allAchievements, setAllAchievements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAchievements, setFilteredAchievements] = useState([]);

  async function fetchAchievements() {
    await fetch('http://localhost:4000/requestachievements')
      .then(res => res.json())
      .then(data => {
        setAllAchievements(data);
        setFilteredAchievements(data); 
      });
  }
  async function removeAchievement(i) {
    let achievement = { ...allAchievements[i] };
    let response;
    await fetch('http://localhost:4000/removeachievement', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(achievement),
    })
      .then(res => res.json())
      .then(data => (response = data));
    console.log(response);
    if (response.success) {
      let tempAchievements = [...allAchievements];
      tempAchievements.splice(i, 1);
      setAllAchievements(tempAchievements);
      setFilteredAchievements(tempAchievements); 
    } else {
      alert('Not Rejected');
    }
  }
  async function acceptAchievement(i){
    let achievement = { ...allAchievements[i] };
    let response;
    await fetch('http://localhost:4000/acceptachievement', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(achievement),
    })
      .then(res => res.json())
      .then(data => (response = data));
    console.log(response);
    if (response.success) {
      let tempAchievements = [...allAchievements];
      tempAchievements.splice(i, 1);
      setAllAchievements(tempAchievements);
      setFilteredAchievements(tempAchievements); 
    } else {
      alert('Not Accepted');
    }
  }
  useEffect(() => {
    fetchAchievements();
  }, []);

  useEffect(() => {
    const filtered = allAchievements.filter((achievement) =>
      achievement.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    setFilteredAchievements([]);
    setTimeout(() => setFilteredAchievements(filtered), 160);
  }, [searchTerm, allAchievements]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='allachievements'>
      <div className='header'>
        <h1>Achievement Requests</h1>
        <div className='search-bar-wrapper'>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearchChange}
            className='search-bar'
          />
          <AiOutlineSearch className='search-icon' />
        </div>
      </div>
      <div className='achievements-main'>
        {filteredAchievements.map((item, i) => {
          item.request=true;
          return (<div className='allachievements-item' key={i}>
            <Achievement data={item}  />
            <div className="request-btns">
              <button className='accept-btn' onClick={() => acceptAchievement(i)}>Accept</button>
            <button className='' onClick={() => removeAchievement(i)}>Reject</button>
            </div>
        
          </div>)
        })}
      </div>
    </div>
  )
}

export default Requestachievements