import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/TabMenu.css';

const TabMenu = () => {
  const [activeTab, setActiveTab] = useState('characterSearch');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <section className='main-container'>
      <div className="top-nav-bar">
        <div className="top-nav">
          <ul className="nav-menu">
            <li className={`nav-item ${activeTab === 'characterSearch' ? 'active' : ''}`}>
              <Link to="/characterSearch" className="nav-link" onClick={() => handleTabClick('characterSearch')}>캐릭터 검색</Link>
            </li>
            <li className={`nav-item ${activeTab === 'timeLine' ? 'active' : ''}`}>
              <Link to="/timeLine" className="nav-link" onClick={() => handleTabClick('timeLine')}>타임 라인</Link>
            </li>
            <li className={`nav-item ${activeTab === 'bufferRanking' ? 'active' : ''}`}>
              <Link to="/bufferRanking" className="nav-link" onClick={() => handleTabClick('bufferRanking')}>버퍼 랭킹</Link>
            </li>
            <li className={`nav-item ${activeTab === 'allCharacterSearch' ? 'active' : ''}`}>
              <Link to="/allCharacterSearch" className="nav-link" onClick={() => handleTabClick('allCharacterSearch')}>모든 캐릭터 검색</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TabMenu;
