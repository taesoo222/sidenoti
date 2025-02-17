import React, { useState } from "react";
import "./MessageGenerator.css"; // CSS 파일 추가

const MessageGenerator = () => {
  const [uniqueNumber, setUniqueNumber] = useState("");
  const [name, setName] = useState("");
  const [choiceIndex, setChoiceIndex] = useState(0);
  const [message, setMessage] = useState("");

  const choices = [
    "🚓 범죄압류 안내",
    "🚧 일반압류 1분 고지",
    "🚧 일반압류 진행 안내",
    "🚫 오프라인압류 진행 안내",
    "🚸 보호구역내 압류 안내",
  ];

  const templates = [
    "/팩션공지 [치즈도로공사 범죄압류 안내]\n범죄차량 즉각 압류합니다.\n압류대상 고유번호: @\n이름: #",
    "/팩션공지 [치즈도로공사 일반압류 안내]\n버려진 차량에 대해서 1분뒤에 압류합니다.\n압류대상 고유번호: @\n이름: #",
    "/팩션공지 [치즈도로공사 일반압류 안내]\n버려진 차량에 대한 1분압류를 사전에 고지했으나, 차주가 나타나지않음으로 압류진행합니다.\n압류대상 고유번호: @\n이름: #",
    "/팩션공지 [치즈도로공사 오프라인압류 안내]\n오프라인차량 즉각 압류합니다.\n압류대상 고유번호: @\n이름: #",
    "/팩션공지 [치즈도로공사 보호구역 압류 안내]\n보호구역 내 방치차량 즉각 압류합니다.\n압류대상 고유번호: @\n이름: #",
  ];

  const generateMessage = (e) => {
    e.preventDefault();
    if (!uniqueNumber || !name) {
      alert("고유번호와 이름을 입력하세요!");
      return;
    }
    const newMessage = templates[choiceIndex]
      .replace("@", uniqueNumber)
      .replace("#", name);
    setMessage(newMessage);
    navigator.clipboard.writeText(newMessage);
  };

  const resetForm = () => {
    setUniqueNumber("");
    setName("");
    setChoiceIndex(0);
    setMessage("");
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🚧 치즈도로공사 사이드공지</h1>
        <form onSubmit={generateMessage} className="form">
          <input
            type="text"
            placeholder="압류대상 고유번호 입력"
            value={uniqueNumber}
            onChange={(e) => setUniqueNumber(e.target.value)}
            className="input"
            required
          />
          <input
            type="text"
            placeholder="이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
          <select
            value={choiceIndex}
            onChange={(e) => setChoiceIndex(e.target.value)}
            className="input"
          >
            {choices.map((choice, index) => (
              <option key={index} value={index}>{choice}</option>
            ))}
          </select>
          <button type="submit" className="button primary">📋 메시지 생성</button>
        </form>
        {message && (
          <div className="message-box">
            <textarea readOnly value={message} className="textarea" />
            <div className="button-group">
              <button onClick={() => navigator.clipboard.writeText(message)} className="button secondary">
                📋 클립보드에 복사
              </button>
              <button onClick={resetForm} className="button danger">
                🔄 처음으로 돌아가기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageGenerator;
