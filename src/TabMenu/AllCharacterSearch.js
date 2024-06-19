import React, { useState, useEffect } from "react";
import "../css/AllCharacterSearch.css";

const AllCharacterSearch = () => {
  const [serverList, setServerList] = useState([]);
  const [selectedServer, setSelectedServer] = useState("all");
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    fetchServerList();
  }, []);

  const fetchServerList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/servers");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setServerList(data.rows || data);
      console.log("서버 목록 불러오기 성공!");
    } catch (error) {
      console.error("서버 목록을 가져오는 중 오류 발생:", error);
    }
  };

  const fetchCharacterList = async () => {
    try {
      if (!characterName) {
        alert("캐릭터 이름을 입력하세요.");
        return;
      }

      let url = `http://localhost:8080/api/characters?name=${encodeURIComponent(
        characterName
      )}`;

      if (selectedServer !== "all") {
        url += `&serverId=${selectedServer}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCharacterList(data.rows || data);
      console.log("캐릭터 목록 불러오기 성공!");
      console.log(data);
    } catch (error) {
      console.error("캐릭터 목록을 가져오는 중 오류 발생:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchCharacterList();
  };

  const handleServerChange = (event) => {
    setSelectedServer(event.target.value);
  };

  const handleCharacterNameChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <div>
      <div className="search">
        <select
          id="servers"
          value={selectedServer}
          onChange={handleServerChange}
          className="select-server"
        >
          <option value="all">전체 서버</option>
          {serverList.map((server) => (
            <option key={server.serverId} value={server.serverId}>
              {server.serverName}
            </option>
          ))}
        </select>

        <input
          type="text"
          id="characterName"
          value={characterName}
          onChange={handleCharacterNameChange}
          onKeyPress={handleKeyPress}
          placeholder="캐릭터 이름을 입력하세요"
          className="input"
        />
        <button onClick={handleSearch} className="searchBtn">
          검색
        </button>
      </div>

      <div>
        <h2>검색 결과</h2>
        {characterList.length > 0 ? (
          <ul>
            {characterList.map((character) => (
              <li key={character.characterId}>
                {character.characterName} (서버: {character.serverId})
              </li>
            ))}
          </ul>
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default AllCharacterSearch;
