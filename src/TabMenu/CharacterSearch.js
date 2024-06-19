import React, { useState, useEffect } from "react";
import "../css/CharacterSearch.css";
import Equip from "./Equip";
import Stats from "./Stats";

const CharacterSearch = () => {
  const [serverList, setServerList] = useState([]);
  const [selectedServer, setSelectedServer] = useState("all");
  const [characterName, setCharacterName] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [characterImage, setCharacterImage] = useState("");
  const [selectedTab, setSelectedTab] = useState("equipment");

  useEffect(() => {
    fetchServerList();
  }, []);

  useEffect(() => {
    if (searchResult) {
      const { serverId, characterId } = searchResult.baseInfo || {};
      if (serverId && characterId) {
        const imageUrl = `https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}`;
        setCharacterImage(imageUrl);
      }
    }
  }, [searchResult]);

  const fetchServerList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/servers");
      const data = await response.json();
      setServerList(data.rows || data);
      console.log("서버 목록 불러오기 성공!");
    } catch (error) {
      console.error("서버 목록을 가져오는 중 오류 발생:", error);
    }
  };

  const handleSearchCharacter = async () => {
    try {
      if (!characterName) {
        alert("캐릭터 이름을 입력하세요.");
        return;
      }
      const encodedCharacterName = encodeURIComponent(characterName);
      const response = await fetch(
        `http://localhost:8080/api/searchCharacter?serverId=${selectedServer}&characterName=${encodedCharacterName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.rows && data.rows.length > 0) {
        const characterData = data.rows[0];
        const serverId = characterData.serverId;
        const characterId = characterData.characterId;

        const baseInfo = await handleCharacterBaseInfo(serverId, characterId);
        const statusInfo = await handleCharacterStatus(serverId, characterId);
        const equipInfo = await handleCharacterEquip(serverId, characterId);

        setSearchResult({ ...characterData, baseInfo, statusInfo, equipInfo });
        console.log("캐릭터 검색 성공!");
      } else {
        alert("존재하지 않는 캐릭터입니다.");
      }
    } catch (error) {
      console.error("캐릭터 검색 중 오류 발생:", error);
    }
  };

  const handleCharacterBaseInfo = async (serverId, characterId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/baseInfo?serverId=${serverId}&characterId=${characterId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("기본정보 :", data);
      return data;
    } catch (error) {
      console.error("캐릭터 기본 정보 불러오는 중 오류 발생:", error);
      return null;
    }
  };

  const handleCharacterStatus = async (serverId, characterId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/status?serverId=${serverId}&characterId=${characterId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("능력치 불러오는 중 오류 발생:", error);
      return null;
    }
  };

  const handleCharacterEquip = async (serverId, characterId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/equip?serverId=${serverId}&characterId=${characterId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("장착 장비 조회 :", data);
      return data;
    } catch (error) {
      console.error("장착 장비 조회 중 오류 발생:", error);
      return [];
    }
  };

  const handleServerChange = (event) => {
    const selectedValue = event.target.value;
    const newSelectedServer = selectedValue === "" ? "all" : selectedValue;
    setSelectedServer(newSelectedServer);
  };

  const handleCharacterNameChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchCharacter();
    }
  };

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
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
          <option value="">전체 서버</option>
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
        <button onClick={handleSearchCharacter} className="searchBtn">
          검색
        </button>
      </div>

      {searchResult && (
        <div className="searchResult">
          <div
            className="searchResult1"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <h1>{searchResult.baseInfo.characterName}</h1>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <h2>{searchResult.baseInfo.adventureName}</h2>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <h3>레벨 : {searchResult.baseInfo.level}</h3>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <h3>직업 : {searchResult.baseInfo.jobGrowName}</h3>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <h3>서버 : {searchResult.serverId}</h3>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <h3> | {searchResult.baseInfo.guildName || ""}</h3>
            </div>
          </div>

          {characterImage && (
            <div>
              <img
                src={characterImage}
                alt={`${searchResult.characterName} 이미지`}
                className="charImg"
              />
            </div>
          )}

          <h2>
            {searchResult.statusInfo?.status?.[16]?.name
              ? `${searchResult.statusInfo.status[16].name} : ${searchResult.statusInfo.status[16].value}`
              : "명성이 없는 캐릭터입니다"}
          </h2>

          <div>
            <button onClick={() => handleTabChange("equipment")}>
              장착 장비
            </button>
            <button onClick={() => handleTabChange("stats")}>스탯</button>
          </div>

          <div>
            {selectedTab === "equipment" && (
              <div>
                <Equip
                  equipInfo={searchResult.equipInfo}
                  baseInfo={searchResult.baseInfo}
                />
              </div>
            )}

            {selectedTab === "stats" && (
              <div>
                <Stats statusInfo={searchResult.statusInfo} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
