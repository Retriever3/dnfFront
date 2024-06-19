import React from "react";
import "../css/Equip.css";

const Equip = ({ equipInfo, baseInfo }) => {
  const getItemRarityClass = (rarity) => {
    switch (rarity) {
      case "에픽":
        return "epic";
      case "유니크":
        return "unique";
      case "레어":
        return "rare";
      case "언커먼":
        return "uncommon";
      case "커먼":
        return "common";
      default:
        return "";
    }
  };

  const renderOptions = (item) => {
    if (item.customOption) {
      return (
        <div className="itemCustomOptionDetail">
          <div>버프력 {item.customOption.buff}</div>
          <div>공격력 {item.customOption.damage}</div>
          <div>장비 성장치 {item.customOption.expRate}%</div>
          <div>옵션 레벨 {item.customOption.level}</div>
          {item.customOption.options &&
            item.customOption.options.map((option, idx) => (
              <div key={idx}>
                옵션{idx + 1}: {option.explain}
              </div>
            ))}
        </div>
      );
    } else if (item.fixedOption) {
      return (
        <div className="itemFixedOptionDetail">
          <div>버프력 {item.fixedOption.buff}</div>
          <div>공격력 {item.fixedOption.damage}</div>
          <div>장비 성장치 {item.fixedOption.expRate}%</div>
          <div>옵션 레벨 {item.fixedOption.level}</div>
          <div>{item.fixedOption.explain}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mainContainer">
      <div className="equipContain">
        {equipInfo &&
          equipInfo.equipment.map((item, index) => {
            // 캐릭터의 직업 ID 추출
            const jobId = baseInfo?.jobId;

            // 강화 스킬 찾기
            const reinforceSkill = item.enchant?.reinforceSkill?.find(
              (skill) => skill.jobId === jobId
            );

            return (
              <div key={index} className="equipItem">
                <div className="slotName">{item.slotName}</div>
                <div className="equipImage">
                  <img
                    src={`https://img-api.neople.co.kr/df/items/${item.itemId}`}
                    alt={item.itemName}
                    style={{ width: "35px", height: "35px" }}
                  />
                </div>
                <div className="itemDetails">
                  <div
                    className={`itemName ${getItemRarityClass(
                      item.itemRarity
                    )}`}
                  >
                    {item.itemName}
                  </div>
                  <div className="itemEnchant">
                    {item.enchant && item.enchant.status ? (
                      item.enchant.status.map((enchant, index) => (
                        <div key={index} className="itemEnchantDetail">
                          {enchant.name} + {enchant.value}
                        </div>
                      ))
                    ) : (
                      <div className="itemEnchantDetail"></div>
                    )}
                    {/* 강화 스킬 표시 */}
                    {reinforceSkill ? (
                      <div className="reinforceSkill">
                        {reinforceSkill.skills.map((skill, index) => (
                          <div key={index} className="reinforceSkillDetail">
                            {skill.name} + {skill.value}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="reinforceSkillDetail"></div>
                    )}
                  </div>
                </div>

                <div className="refine">
                  {item.slotName === "무기" && <div>+ {item.refine} 제련</div>}
                  <div
                    className={
                      item.amplificationName
                        ? "reinforce amplified"
                        : "reinforce"
                    }
                  >
                    {item.amplificationName
                      ? `+ ${item.reinforce} 증폭`
                      : `+ ${item.reinforce} 강화`}
                  </div>
                </div>

                {/* 퓨전 옵션 표시 (무기 또는 방어구만 해당) */}
                {item.fusionOption && (
                  <div className="itemFusionOptionDetail">
                    {item.fusionOption.options.map((option, idx) => (
                      <div key={idx}>{option.explain}</div>
                    ))}
                  </div>
                )}

                {/* 옵션 표시 함수 호출 */}
                {renderOptions(item)}

                {/* 아스라한 옵션 표시 */}
                {item.asrahanOption && (
                  <div className="itemAsrahanOptionDetail">
                    {item.asrahanOption.options.map((option, idx) => (
                      <div key={idx}>
                        아스라한 옵션{idx + 1}: {option.explain}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Equip;
