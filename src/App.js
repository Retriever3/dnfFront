import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TabMenu from "./TabMenu/TabMenu";
import CharacterSearch from "./TabMenu/CharacterSearch";
import TimeLineInfo from "./TabMenu/TimeLineInfo";
import BufferRanking from "./TabMenu/BufferRanking";
import AllcharacterSearch from "./TabMenu/AllCharacterSearch";
import "./css/TabMenu.css";
import "./css/App.css";

function App() {
  useEffect(() => {
    // JavaScript로 body 요소에 스타일을 적용합니다.
    document.body.style.backgroundColor = "white"; // 배경색을 설정합니다.
    document.body.style.margin = 0; // 마진을 없앱니다.
    document.body.style.fontFamily = "Arial, sans-serif"; // 폰트 패밀리를 설정합니다.
  }, []); // useEffect의 두 번째 매개변수로 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  return (
    <div>
      <Router>
        <div className="App">
          <TabMenu />
          <Routes>
            <Route path="/characterSearch" element={<CharacterSearch />} />
            <Route path="/timeLine" element={<TimeLineInfo />} />
            <Route path="/bufferRanking" element={<BufferRanking />} />
            <Route
              path="/allCharacterSearch"
              element={<AllcharacterSearch />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
