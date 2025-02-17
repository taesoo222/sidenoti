import React, { useState, useEffect } from "react";
import "./MessageGenerator.css"; // CSS 파일 불러오기

const MessageGenerator = () => {
  const [uniqueNumber, setUniqueNumber] = useState("");
  const [name, setName] = useState("");
  const [choiceIndex, setChoiceIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  const choices = [
    "🚓 범죄압류 안내",
    "🚧 일반압류 1분 고지",
    "🚧 일반압류 진행 안내",
    "🚫 오프라인압류 진행 안내",
    "🚸️ 보호구역내 압류 안내",
  ];

  const templates = [
    "/팩션공지 [치즈도로공사 범죄압류 안내]\n범죄차량 즉각 압류합니다.\n압류대상 고유번호: @\n이름: #",
    "/팩션공지 [치즈도로공사 일반압류 안내]\n버려진 차량에 대해서 1분뒤에 압류합니다.\n압류대상 고유번호: @\n이름: #",
    "/팩션공지 [치즈도로공사 일반압류 안내]\n버려진 차량에 대한 1분압류를 사전에 고지했으나, 차주가 나타나지않음으로 압류진행합니다.\n압류대상 고유번호: @\n이름: #",
    "/팩션공지 [치즈도로공사 오프라인압류 안내]\n오프라인차량 즉각 압류합니다.\n압류대상 고유번호: @\n이름: #",
    "/팩션공지 [치즈도로공사 보호구역 압류 안내]\n보호구역 내 방치차량 즉각 압류합니다.\n압류대상 고유번호: @\n이름: #",
  ];

  const generateMessage = () => {
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

  const startTimer = () => {
    setRemainingTime(60);
    setTimer(setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000));
  };

  const resetForm = () => {
    setUniqueNumber("");
    setName("");
    setChoiceIndex(0);
    setMessage("");
    if (timer) clearInterval(timer);
    setRemainingTime(0);
  };

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  return (
    <div className="container">
      <h1 className="title">🚧 치즈도로공사 사이드공지</h1>
      <label className="label">압류대상 고유번호:</label>
      <input 
        type="text" 
        value={uniqueNumber} 
        onChange={(e) => setUniqueNumber(e.target.value)} 
        className="input"
      />
      <label className="label">이름 입력:</label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="input"
      />
      <label className="label">압류 안내 종류:</label>
      <select
        value={choiceIndex}
        onChange={(e) => setChoiceIndex(Number(e.target.value))}
        className="select"
      >
        {choices.map((choice, index) => (
          <option key={index} value={index}>{choice}</option>
        ))}
      </select>
      <textarea
        readOnly
        value={remainingTime > 0 ? `${remainingTime}초 남았습니다!` : message}
        className="textarea"
      />
      <button onClick={generateMessage} className="button button-primary">
        📋 메시지 생성 및 복사
      </button>
      <button onClick={startTimer} className="button button-warning">
        ⏳ 1분 카운트 시작
      </button>
      <button onClick={resetForm} className="button button-danger">
        🔄 처음으로 돌아가기
      </button>
    </div>
  );
};

export default MessageGenerator;
