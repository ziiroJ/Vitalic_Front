import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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

function GoalPage({ goal, setGoal }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [yearGoal, setYearGoal] = useState("");
  const [monthGoal, setMonthGoal] = useState("");
  const [dayGoal, setDayGoal] = useState("");

  // 지출 데이터 (백엔드에서 받아와야 함)
  const dayExpenses = 20000; // 하루 지출
  const monthExpenses = 500000; // 이번 달 지출
  const yearExpenses = 6000000; // 올해 지출

  const today = new Date(); // 현재 날짜
  // 원하는 형식으로 날짜를 설정
  const formattedDate = `${today.getMonth() + 1}월`;

  // 목표 대비 지출 비율 계산
  const daySpentRatio = Math.min((dayExpenses / goal.day) * 100, 100); // 100% 초과하지 않도록
  const monthSpentRatio = Math.min((monthExpenses / goal.month) * 100, 100);
  const yearSpentRatio = Math.min((yearExpenses / goal.year) * 100, 100);

  // 목표 초과 금액 계산
  const dayExceededAmount = dayExpenses - goal.day;
  const monthExceededAmount = monthExpenses - goal.month;
  const yearExceededAmount = yearExpenses - goal.year;

  // 금액쉼표
  const formatCurrency = (amount) => {
    return amount.toLocaleString();
  };

  const handleOverlayClick = () => {
    setShowModal(false); // 모달 닫기
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // 모달 닫기 이벤트 전파 막기
  };
  const handleSetGoal = () => {
    // 입력값을 숫자로 변환
    setGoal({
      year: Number(yearGoal),
      month: Number(monthGoal),
      day: Number(dayGoal),
    });
    setShowModal(false); // 목표 설정 후 모달 닫기
  };
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
            하루 지출 목표: {formatCurrency(goal.day)}원
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
        {/* 이번 달 지출 목표 */}
        <GoalWrapper>
          <GoalLabel isExceeded={monthExceededAmount > 0}>
            {formattedDate} 지출 목표: {formatCurrency(goal.month)}원
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
        {/* 올해 지출 목표 */}
        <GoalWrapper>
          <GoalLabel isExceeded={yearExceededAmount > 0}>
            올해 지출 목표: {formatCurrency(goal.year)}원
            {yearExceededAmount > 0 && (
              <ExceededAmount>
                +{formatCurrency(yearExceededAmount)}원
              </ExceededAmount>
            )}
          </GoalLabel>
          <ProgressBarContainer>
            <ProgressBar width={`${yearSpentRatio}%`} />
          </ProgressBarContainer>
        </GoalWrapper>
      </Section>

      {/* 모달 팝업 */}
      {showModal && (
        <ModalOverlay onClick={handleOverlayClick}>
          <ModalContent onClick={handleModalClick}>
            <Section mHeight="250px;">
              <SectionTitleS>{formattedDate} 지출 목표 설정</SectionTitleS>
              <InputContainerWrap>
                <InputContainer>
                  <InputBox
                    placeholder="YEAR"
                    value={yearGoal}
                    onChange={(e) => setYearGoal(e.target.value)}
                  />
                  <InputBox
                    placeholder="MONTH"
                    value={monthGoal}
                    onChange={(e) => setMonthGoal(e.target.value)}
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
