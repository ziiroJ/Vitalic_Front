import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
`;

const TopNav = styled.h1`
  display: flex;
  justify-content: flex-end;
  button {
    color: #fff;
    font-family: "Hanken Grotesk", sans-serif;
    border: none;
    background-color: transparent;
  }
  button:hover {
    transition: 0.2s;
    color: #f4cf85;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Logo = styled.p`
  font-family: "Hanken Grotesk", sans-serif;
  font-weight: bold;
  color: #f3a338;
  font-size: 5rem;
  text-align: center;
  margin: 0;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 3rem; // 중간 화면 크기에 맞게 조정
  }

  @media (max-width: 480px) {
    font-size: 2rem; // 작은 화면에 맞게 조정
  }
`;

const Section = styled.div`
  font-family: "Hanken Grotesk", sans-serif;
  background-color: #373737;
  width: 100%;
  min-height: 100px;
  margin-bottom: 30px;
  color: #fff;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const SectionTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 38px;
`;

const SectionTitle = styled.p`
  color: #fff;
  font-size: 1.5rem;
  font-family: "Hanken Grotesk", sans-serif;
  font-weight: bold;
  margin: 0;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  &:hover {
    color: #f4cf85;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// 진행률 바 스타일
const ProgressBarContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  height: 40px;
  margin: 5px 0 10px 0;
  width: 100%;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #ff8c00;
  width: ${({ width }) => width || "0%"};
`;

const GoalWrapper = styled.div`
  margin-bottom: 25px;
`;

const GoalLabel = styled.div`
  font-family: "Hanken Grotesk", sans-serif;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
`;

const ExceededAmount = styled.span`
  color: #c90000; // 초과 금액
  margin-left: 10px;
  font-weight: 300;
`;

// 팝업
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #373737;
  padding: 0 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  color: #fff;
`;
const SectionTitleS = styled.p`
  color: #fff;
  font-size: 1.5rem;
  font-family: "Hanken Grotesk", sans-serif;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin: 0;
  }
`;

const InputBox = styled.input`
  width: 100px;
  height: 50px;
  text-align: center;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 30px;

  @media (max-width: 768px) {
    margin: 20px;
  }

  @media (max-width: 480px) {
    margin: 8px;
    width: 65px;
    height: 40px;
  }
`;

const InputContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const GoalButton = styled.button`
  margin: 0;
  width: 480px;
  height: 50px;
  background-color: #444;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 100%;
    height: 40px;
  }
`;

// function GoalPage({ goal, setGoal }) {
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [monthGoal, setMonthGoal] = useState("");
//   const [weekGoal, setWeekGoal] = useState("");
//   const [dayGoal, setDayGoal] = useState("");

//   // 지출 데이터
//   const [monthlySummary, setMonthlySummary] = useState({});
//   const [weeklySummary, setWeeklySummary] = useState({});
//   const [dailySummary, setDailySummary] = useState({});

//   const today = new Date(); // 현재 날짜
//   // 원하는 형식으로 날짜를 설정
//   const formattedDate = `${today.getMonth() + 1}월`;

//   // 백엔드에서 데이터 받아오기 (useEffect 사용)
//   useEffect(() => {
//     // 백엔드 API 호출 (일일, 월간 지출 데이터)
//     const fetchData = async () => {
//       try {
//         const monthlyResponse = await axios.get("/api/monthly-summary");
//         const weeklyResponse = await axios.get("/api/weekly-summary");
//         const dailyResponse = await axios.get("/api/daily-summary");

//         setMonthlySummary(monthlyResponse.data);
//         setWeeklySummary(weeklyResponse.data);
//         setDailySummary(dailyResponse.data);
//       } catch (error) {
//         console.error("데이터 가져오기 실패:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // 목표 대비 지출 비율 계산
//   const daySpentRatio = Math.min(
//     (dailySummary.withdraw_total / (goal?.day || 1)) * 100,
//     100
//   );
//   const weekSpentRatio = Math.min(
//     (weeklySummary.withdraw_total / (goal?.week || 1)) * 100,
//     100
//   );
//   const monthSpentRatio = Math.min(
//     (monthlySummary.withdraw_total / (goal?.month || 1)) * 100,
//     100
//   );

//   // 목표 초과 금액 계산
//   const dayExceededAmount =
//     (dailySummary.withdraw_total || 0) - (goal?.day || 0);
//   const weekExceededAmount =
//     (weeklySummary.withdraw_total || 0) - (goal?.week || 0);
//   const monthExceededAmount =
//     (monthlySummary.withdraw_total || 0) - (goal?.month || 0);

//   // 금액 쉼표
//   const formatCurrency = (amount) => {
//     if (typeof amount !== "number" || isNaN(amount)) return "0";
//     return amount.toLocaleString();
//   };

//   const handleOverlayClick = () => {
//     setShowModal(false); // 모달 닫기
//   };

//   const handleModalClick = (e) => {
//     e.stopPropagation(); // 모달 닫기 이벤트 전파 막기
//   };
//   const handleSetGoal = () => {
//     // 입력값을 숫자로 변환
//     setGoal({
//       month: Number(monthGoal),
//       week: Number(weekGoal),
//       day: Number(dayGoal),
//     });
//     setShowModal(false); // 목표 설정 후 모달 닫기
//   };

//   // ESC 키로 모달 닫기
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         setShowModal(false);
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);
//   return (
//     <Container>
//       <TopNav>
//         <button onClick={() => navigate("/user")}>
//           <FontAwesomeIcon icon={faCircleUser} size="3x" />
//         </button>
//       </TopNav>
//       <Logo>Vitalic</Logo>

//       {/* 목표 달성률 */}
//       <Section>
//         <SectionTop>
//           <SectionTitle>목표 달성률</SectionTitle>
//           <EditButton onClick={() => setShowModal(true)}>
//             <FontAwesomeIcon icon={faPenToSquare} size="2x" />
//           </EditButton>
//         </SectionTop>

//         {/* 하루 지출 목표 */}
//         <GoalWrapper>
//           <GoalLabel isExceeded={dayExceededAmount > 0}>
//             하루 지출 목표: {formatCurrency(goal?.day)}원
//             {dayExceededAmount > 0 && (
//               <ExceededAmount>
//                 +{formatCurrency(dayExceededAmount)}원
//               </ExceededAmount>
//             )}
//           </GoalLabel>
//           <ProgressBarContainer>
//             <ProgressBar width={`${daySpentRatio}%`} />
//           </ProgressBarContainer>
//         </GoalWrapper>

//         {/* 이번주 지출 목표 */}
//         <GoalWrapper>
//           <GoalLabel isExceeded={weekExceededAmount > 0}>
//             이번주 지출 목표: {formatCurrency(goal?.week)}원
//             {weekExceededAmount > 0 && (
//               <ExceededAmount>
//                 +{formatCurrency(weekExceededAmount)}원
//               </ExceededAmount>
//             )}
//           </GoalLabel>
//           <ProgressBarContainer>
//             <ProgressBar width={`${weekSpentRatio}%`} />
//           </ProgressBarContainer>
//         </GoalWrapper>

//         {/* 이번 달 지출 목표 */}
//         <GoalWrapper>
//           <GoalLabel isExceeded={monthExceededAmount > 0}>
//             {formattedDate} 지출 목표: {formatCurrency(goal?.month)}원
//             {monthExceededAmount > 0 && (
//               <ExceededAmount>
//                 +{formatCurrency(monthExceededAmount)}원
//               </ExceededAmount>
//             )}
//           </GoalLabel>
//           <ProgressBarContainer>
//             <ProgressBar width={`${monthSpentRatio}%`} />
//           </ProgressBarContainer>
//         </GoalWrapper>
//       </Section>

//       {/* 모달 팝업 */}
//       {showModal && (
//         <ModalOverlay onClick={handleOverlayClick}>
//           <ModalContent onClick={handleModalClick}>
//             <Section>
//               <SectionTitleS>{formattedDate} 지출 목표 설정</SectionTitleS>
//               <InputContainerWrap>
//                 <InputContainer>
//                   <InputBox
//                     placeholder="MONTH"
//                     value={monthGoal}
//                     onChange={(e) => setMonthGoal(e.target.value)}
//                   />
//                   <InputBox
//                     placeholder="WEEK"
//                     value={weekGoal}
//                     onChange={(e) => setWeekGoal(e.target.value)}
//                   />
//                   <InputBox
//                     placeholder="DAY"
//                     value={dayGoal}
//                     onChange={(e) => setDayGoal(e.target.value)}
//                   />
//                 </InputContainer>
//                 <GoalButton onClick={handleSetGoal}>설정하기</GoalButton>
//               </InputContainerWrap>
//             </Section>
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </Container>
//   );
// }

// export default GoalPage;

function GoalPage({ goal, setGoal }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [monthGoal, setMonthGoal] = useState("");
  const [weekGoal, setWeekGoal] = useState("");
  const [dayGoal, setDayGoal] = useState("");

  // 지출 데이터
  const [monthlySummary, setMonthlySummary] = useState({});
  const [weeklySummary, setWeeklySummary] = useState({});
  const [dailySummary, setDailySummary] = useState({});

  const today = new Date(); // 현재 날짜
  const formattedDate = `${today.getMonth() + 1}월`;

  // 백엔드에서 데이터 받아오기 (useEffect 사용)
  // useEffect(() => {
  // 	const fetchData = async () => {
  // 		try {
  // 			// 하나의 API로 모든 데이터를 가져옴
  // 			const response = await axios.post(
  // 				"http://127.0.0.1:8000/api/report/mwd"
  // 			);
  // 			const data = response.data;

  // 			// 각각의 지출 요약 데이터로 설정
  // 			setMonthlySummary(data.monthly_summary || {});
  // 			setWeeklySummary(data.weekly_summary || {});
  // 			setDailySummary(data.daily_summary || {});
  // 		} catch (error) {
  // 			console.error("데이터 가져오기 실패:", error);
  // 		}
  // 	};

  // 	fetchData();
  // }, []);

  // 더미 데이터////////////////////////////////////////////////////////////////////////////////////
  const dummyData = {
    monthly_summary: {
      withdraw_total: 150000, // 예시: 월간 지출
    },
    weekly_summary: {
      withdraw_total: 35000, // 예시: 주간 지출
    },
    daily_summary: {
      withdraw_total: 5000, // 예시: 일일 지출
    },
  };

  // fetchData 함수 수정
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 더미 데이터를 사용하여 직접 설정
        setMonthlySummary(dummyData.monthly_summary);
        setWeeklySummary(dummyData.weekly_summary);
        setDailySummary(dummyData.daily_summary);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, []);

  /////////////////////////////////////////////////////////////////////////////

  // 목표 대비 지출 비율 계산
  const daySpentRatio = Math.min(
    (dailySummary.withdraw_total / (goal?.day || 1)) * 100,
    100
  );
  const weekSpentRatio = Math.min(
    (weeklySummary.withdraw_total / (goal?.week || 1)) * 100,
    100
  );
  const monthSpentRatio = Math.min(
    (monthlySummary.withdraw_total / (goal?.month || 1)) * 100,
    100
  );

  // 목표 초과 금액 계산
  const dayExceededAmount =
    (dailySummary.withdraw_total || 0) - (goal?.day || 0);
  const weekExceededAmount =
    (weeklySummary.withdraw_total || 0) - (goal?.week || 0);
  const monthExceededAmount =
    (monthlySummary.withdraw_total || 0) - (goal?.month || 0);

  // 금액 쉼표 추가
  const formatCurrency = (amount) => {
    if (typeof amount !== "number" || isNaN(amount)) return "0";
    return amount.toLocaleString();
  };

  const handleOverlayClick = () => {
    setShowModal(false); // 모달 닫기
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // 모달 닫기 이벤트 전파 막기
  };

  const handleSetGoal = () => {
    // 목표 설정
    setGoal({
      month: Number(monthGoal),
      week: Number(weekGoal),
      day: Number(dayGoal),
    });
    setShowModal(false); // 모달 닫기
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container>
      <TopNav>
        <button onClick={() => navigate("/user")}>
          <FontAwesomeIcon icon={faCircleUser} size="3x" />
        </button>
      </TopNav>
      <Logo>Vitalic</Logo>

      {/* 목표 달성률 */}
      <Section>
        <SectionTop>
          <SectionTitle>목표 달성률</SectionTitle>
          <EditButton onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPenToSquare} size="2x" />
          </EditButton>
        </SectionTop>

        {/* 하루 지출 목표 */}
        <GoalWrapper>
          <GoalLabel isExceeded={dayExceededAmount > 0}>
            하루 지출 목표: {formatCurrency(goal?.day)}원
            {dayExceededAmount > 0 && (
              <ExceededAmount>
                +{formatCurrency(dayExceededAmount)}원
              </ExceededAmount>
            )}
          </GoalLabel>
          <ProgressBarContainer>
            <ProgressBar width={`${daySpentRatio}%`} />
          </ProgressBarContainer>
        </GoalWrapper>

        {/* 이번주 지출 목표 */}
        <GoalWrapper>
          <GoalLabel isExceeded={weekExceededAmount > 0}>
            이번주 지출 목표: {formatCurrency(goal?.week)}원
            {weekExceededAmount > 0 && (
              <ExceededAmount>
                +{formatCurrency(weekExceededAmount)}원
              </ExceededAmount>
            )}
          </GoalLabel>
          <ProgressBarContainer>
            <ProgressBar width={`${weekSpentRatio}%`} />
          </ProgressBarContainer>
        </GoalWrapper>

        {/* 이번 달 지출 목표 */}
        <GoalWrapper>
          <GoalLabel isExceeded={monthExceededAmount > 0}>
            {formattedDate} 지출 목표: {formatCurrency(goal?.month)}원
            {monthExceededAmount > 0 && (
              <ExceededAmount>
                +{formatCurrency(monthExceededAmount)}원
              </ExceededAmount>
            )}
          </GoalLabel>
          <ProgressBarContainer>
            <ProgressBar width={`${monthSpentRatio}%`} />
          </ProgressBarContainer>
        </GoalWrapper>
      </Section>

      {/* 모달 팝업 */}
      {showModal && (
        <ModalOverlay onClick={handleOverlayClick}>
          <ModalContent onClick={handleModalClick}>
            <Section>
              <SectionTitleS>{formattedDate} 지출 목표 설정</SectionTitleS>
              <InputContainerWrap>
                <InputContainer>
                  <InputBox
                    placeholder="MONTH"
                    value={monthGoal}
                    onChange={(e) => setMonthGoal(e.target.value)}
                  />
                  <InputBox
                    placeholder="WEEK"
                    value={weekGoal}
                    onChange={(e) => setWeekGoal(e.target.value)}
                  />
                  <InputBox
                    placeholder="DAY"
                    value={dayGoal}
                    onChange={(e) => setDayGoal(e.target.value)}
                  />
                </InputContainer>
                <GoalButton onClick={handleSetGoal}>설정하기</GoalButton>
              </InputContainerWrap>
            </Section>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default GoalPage;
