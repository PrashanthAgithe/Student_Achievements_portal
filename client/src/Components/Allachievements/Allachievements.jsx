import React, { useEffect, useState } from 'react';
import './Allachievements.css';
import Achievement from '../Achievement/Achievement';
import { AiOutlineSearch } from "react-icons/ai";

const Allachievements = () => {
  const [allAchievements, setAllAchievements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAchievements, setFilteredAchievements] = useState([]);

  async function fetchAchievements() {
    await fetch('http://localhost:4000/allachievements')
      .then(res => res.json())
      .then(data => {
        setAllAchievements(data);
        setFilteredAchievements(data); 
      });
  }

  // async function removeAchievement(i) {
  //   let achievement = { ...allAchievements[i] };
  //   let response;
  //   await fetch('http://localhost:4000/removeachievement', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(achievement),
  //   })
  //     .then(res => res.json())
  //     .then(data => (response = data));
  //   console.log(response);
  //   if (response.success) {
  //     let tempAchievements = [...allAchievements];
  //     tempAchievements.splice(i, 1);
  //     setAllAchievements(tempAchievements);
  //     setFilteredAchievements(tempAchievements); 
  //   } else {
  //     alert('Not Removed');
  //   }
  // }

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
        <h1>Student Achievements</h1>
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
        {filteredAchievements.map((item, i) => (
          <div className='allachievements-item' key={i}>
            <Achievement data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allachievements;
