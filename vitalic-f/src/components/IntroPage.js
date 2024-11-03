import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // useHistory 대신 useNavigate 사용
import chartbg from "../img/chartImage.jpg";

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
`;

const Chart = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  border: 1px solid black;
  background-color: #aaa;
  margin: 20px 0;
  margin-bottom: 50px;
  position: relative;
  overflow: hidden;
`;
const ChartImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  filter: brightness(40%);
`;

const ChartText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  padding: 0 10px;
  z-index: 1; /* 이미지 위에 글씨가 나타나도록 설정 */
  b {
    color: #f3a338;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const TopSection = styled.p`
  color: #fff;
  font-size: 2rem;
  margin: 80px 20px 70px 20px;
  font-weight: bold;
  b {
    color: #f3a338;
    font-size: 4.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
    b {
      font-size: 3.5rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    b {
      font-size: 2.75rem;
    }
  }
`;

const ButtonSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  button {
    font-family: "Hahmlet", serif;
    background-color: #f4bd6f;
    border: none;
    border-radius: 20px 40px 20px 20px;
    width: 100%;
    height: 150px;
    font-size: 1.3rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    word-break: keep-all;
  }

  button:hover {
    transition: 0.5s;
    background-color: #f3a338;
  }

  @media (max-width: 768px) {
    button {
      width: 100%;
      font-size: 1.125rem;
      height: 120px;
    }
  }

  @media (max-width: 480px) {
    button {
      font-size: 1rem;
      height: 100px;
    }
  }
`;

function IntroPage() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSignUp = () => {
    navigate("/join"); // 회원가입 버튼 클릭 시 HomePage로 이동
  };

  const handleLogin = () => {
    navigate("/login"); // 로그인 버튼 클릭 시 HomePage로 이동
  };

  return (
    <Container>
      <TopSection>
        <p>
          <b>Vitalic</b>과<br></br>당신의 금융을 관리 해 보세요
        </p>
      </TopSection>
      <Chart>
        <ChartImage src={chartbg} alt="Chart Background" />
        <ChartText>
          <b>Vitalic</b>이 당신의 금융을 관리해 드릴게요!
        </ChartText>
      </Chart>
      <ButtonSection>
        <button onClick={handleSignUp}>
          <FontAwesomeIcon icon={faUserPlus} size="2x" />
          &nbsp;&nbsp; 회원가입 하기
        </button>
        <button onClick={handleLogin}>
          <FontAwesomeIcon icon={faRightToBracket} size="2x" />
          &nbsp;&nbsp; 로그인 하기
        </button>
      </ButtonSection>
    </Container>
  );
}

export default IntroPage;
