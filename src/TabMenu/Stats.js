import React from "react";
import "../css/Stats.css";

const Stats = ({ statusInfo }) => {
  return (
    <div>
      <div>
        {statusInfo && statusInfo.status && statusInfo.status.length > 30 ? (
          <div>
            <h2>능력치 정보</h2>
            <div className="table-container">
              {/* 왼쪽 표 */}
              <table>
                <tbody>
                  <tr>
                    <td>{statusInfo.status[2].name}</td>
                    <td>{statusInfo.status[2].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[4].name}</td>
                    <td>{statusInfo.status[4].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[6].name}</td>
                    <td>{statusInfo.status[6].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[8].name}</td>
                    <td>{statusInfo.status[8].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[10].name}</td>
                    <td>{statusInfo.status[10].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[12].name}</td>
                    <td>{statusInfo.status[12].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[13].name}</td>
                    <td>{statusInfo.status[13].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[23].name}</td>
                    <td>{statusInfo.status[23].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[27].name}</td>
                    <td>{statusInfo.status[27].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[24].name}</td>
                    <td>{statusInfo.status[24].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[28].name}</td>
                    <td>{statusInfo.status[28].value}</td>
                  </tr>
                </tbody>
              </table>

              {/* 오른쪽 표 */}
              <table style={{ marginLeft: "20px" }}>
                <tbody>
                  <tr>
                    <td>{statusInfo.status[3].name}</td>
                    <td>{statusInfo.status[3].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[5].name}</td>
                    <td>{statusInfo.status[5].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[7].name}</td>
                    <td>{statusInfo.status[7].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[9].name}</td>
                    <td>{statusInfo.status[9].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[11].name}</td>
                    <td>{statusInfo.status[11].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[15].name}</td>
                    <td>{statusInfo.status[15].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[14].name}</td>
                    <td>{statusInfo.status[14].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[25].name}</td>
                    <td>{statusInfo.status[25].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[29].name}</td>
                    <td>{statusInfo.status[29].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[26].name}</td>
                    <td>{statusInfo.status[26].value}</td>
                  </tr>
                  <tr>
                    <td>{statusInfo.status[30].name}</td>
                    <td>{statusInfo.status[30].value}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h1>명성에 대한 정보가 없습니다</h1>
        )}
      </div>
    </div>
  );
};

export default Stats;
