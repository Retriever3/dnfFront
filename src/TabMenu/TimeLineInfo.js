import React, { useState } from 'react';


const TimeLineInfo = () => {
  const [serverId, setServerId] = useState('');
  const [characterId, setCharacterId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const servers = [
    { id: 'cain', name: '카인' },
    { id: 'diregie', name: '디레지에' },
    { id: 'siroco', name: '시로코' },
    { id: 'prey', name: '프레이' },
    // 필요한 다른 서버들을 추가하세요
  ];

  // 타임 라인 정보 조회
  const handleTimeLine = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/timeline?serverId=${serverId}&characterId=${characterId}&startDate=${startDate}&endDate=${endDate}`);
      
      // response.ok가 false인 경우 에러 처리
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // JSON 데이터로 변환
      const data = await response.json();
      console.log("캐릭터 타임 라인 :", data);
    } catch (error) {
      console.log('캐릭터 타임 라인 조회 중 오류 발생:', error);
    }
  };

  return (
    <div className='TimeLineInfo'>
      <h2>타임 라인 정보 조회</h2>
      <div className='input-group'>
        <label htmlFor='serverId'>서버 선택:</label>
        <select
          id='serverId'
          value={serverId}
          onChange={(e) => setServerId(e.target.value)}
        >
          <option value="">서버를 선택하세요</option>
          {servers.map((server) => (
            <option key={server.id} value={server.id}>{server.name}</option>
          ))}
        </select>
      </div>
      <div className='input-group'>
        <label htmlFor='characterId'>캐릭터 ID:</label>
        <input
          type='text'
          id='characterId'
          value={characterId}
          onChange={(e) => setCharacterId(e.target.value)}
        />
      </div>
      <div className='input-group'>
        <label htmlFor='startDate'>시작 날짜:</label>
        <input
          type='date'
          id='startDate'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className='input-group'>
        <label htmlFor='endDate'>종료 날짜:</label>
        <input
          type='date'
          id='endDate'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleTimeLine}>타임 라인 조회</button>
    </div>
  );
};

export default TimeLineInfo;
