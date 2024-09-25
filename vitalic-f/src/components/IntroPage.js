import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faLink,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

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

const Chart = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  border: 1px solid black;
  background-color: #aaa;
  margin: 20px 0;
  margin-bottom: 40px;
`;

const TopSection = styled.p`
  font-family: "Hanken Grotesk", sans-serif;
  color: #fff;
  font-size: 1.5rem;
  margin: 50px 20px 70px 20px;
  font-weight: bold;
  b {
    color: #f3a338;
    font-size: 4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    b {
      font-size: 3rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
    b {
      font-size: 2.25rem;
    }
  }
`;

const ButtonSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 100px;
  button {
    font-family: "Hanken Grotesk", sans-serif;
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
  return (
    <Container>
      <TopNav>
        <button>
          <FontAwesomeIcon icon={faCircleUser} size="3x" />
        </button>
      </TopNav>
      <TopSection>
        <p>
          <b>Vitalic</b>과<br></br>당신의 금융을 관리 해 보세요
        </p>
      </TopSection>
      <Chart></Chart>
      <ButtonSection>
        <button>
          <FontAwesomeIcon icon={faUserPlus} size="2x" />
          &nbsp;&nbsp; 회원가입 하기
        </button>
        <button>
          <FontAwesomeIcon icon={faLink} size="2x" />
          &nbsp;&nbsp; 은행 연동하기
        </button>
      </ButtonSection>
    </Container>
  );
}

export default IntroPage;
