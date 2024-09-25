import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faAngleLeft,
  faAngleRight,
  faMugHot,
  faTag,
  faFileInvoiceDollar,
  faAngleDown,
  faFaceLaughBeam,
  faEllipsis,
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

const Logo = styled.p`
  font-family: "Hanken Grotesk", sans-serif;
  font-weight: bold;
  color: #f3a338;
  font-size: 5rem;
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
`;

const Section = styled.div`
  font-family: "Hanken Grotesk", sans-serif;
  background-color: #373737;
  width: 100%;
  /* min-height: 550px; */
  min-height: ${(props) => props.mHeight || "550px"};
  margin-bottom: 30px;
  color: #fff;
  border-radius: 15px;
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 100px;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const SectionTitle = styled.p`
  color: #fff;
  font-size: 1.5rem;
  font-family: "Hanken Grotesk", sans-serif;
  font-weight: bold;
  padding: 20px;
  margin: 0;
`;

const ExpenseDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Expense = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  padding: 0 0 20px 30px;
  align-self: flex-start;
`;

const ExpenseChart = styled.div`
  height: 20vh;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
  background-color: orange;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ExpenseListWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExpenseList = styled.div`
  padding: 0 0 20px 30px;
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
`;

const ExpenseListIcon = styled(FontAwesomeIcon)`
  background-color: ${(props) => props.bgColor || "#fff"};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: #222;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }

  svg {
    width: 50%;
    height: 50%;
  }
`;

function HomePage() {
  const [ExpenseShowMore, ExpenseSetShowMore] = useState(false); // 지출추가 항목의 표시 여부
  const [PatternShowMore, PatternSetShowMore] = useState(false); // 패턴화 추가 항목의 표시 여부
  const [IncomeShowMore, IncomeSetShowMore] = useState(false); // 수입추가 항목의 표시 여부

  return (
    <Container>
      <TopNav>
        <button>
          <FontAwesomeIcon icon={faCircleUser} size="3x" />
        </button>
      </TopNav>
      <Logo>Vitalic</Logo>

      {/* 지출 */}
      <Section>
        <SectionTitle>
          <FontAwesomeIcon icon={faAngleLeft} />
          &nbsp;9월 지출&nbsp;
          <FontAwesomeIcon icon={faAngleRight} />
        </SectionTitle>
        <ExpenseDiv>
          <Expense>613,456원</Expense>
          <ExpenseChart></ExpenseChart>
          <ExpenseListWrap>
            <ExpenseList>
              <ExpenseListIcon icon={faMugHot} size="2x" bgColor="#5D3800" />
              &nbsp;카페·간식
            </ExpenseList>
            <ExpenseList>
              <ExpenseListIcon icon={faTag} size="2x" bgColor="#FFD2BD" />
              &nbsp;쇼핑
            </ExpenseList>
            <ExpenseList>
              <ExpenseListIcon
                icon={faFileInvoiceDollar}
                size="2x"
                bgColor="#5E76FF"
              />
              &nbsp;공과금
            </ExpenseList>

            {/* showMore가 false일 때만 faAngleDown을 렌더링 */}
            {!ExpenseShowMore && (
              <FontAwesomeIcon
                icon={faAngleDown}
                size="2x"
                onClick={() => ExpenseSetShowMore(true)}
                style={{ cursor: "pointer" }}
              />
            )}

            {/* showMore가 true일 때만 추가 항목을 렌더링 */}
            {ExpenseShowMore && (
              <>
                <ExpenseList>
                  <ExpenseListIcon
                    icon={faFaceLaughBeam}
                    size="2x"
                    bgColor="#FF8C00"
                  />
                  &nbsp;메롱
                </ExpenseList>
                <ExpenseList>
                  <ExpenseListIcon icon={faEllipsis} size="2x" bgColor="#999" />
                  &nbsp;기타
                </ExpenseList>
              </>
            )}
          </ExpenseListWrap>
        </ExpenseDiv>
      </Section>

      {/* 패턴화된 지출 */}
      <Section mHeight="40px;">
        <SectionTitle>패턴화된 나의 지출 살펴보기</SectionTitle>
        <ExpenseDiv>
          <ExpenseListWrap>
            <ExpenseList>
              <ExpenseListIcon icon={faTag} size="2x" bgColor="black" />
              &nbsp;NETFLIX
            </ExpenseList>
            <ExpenseList>
              <ExpenseListIcon icon={faTag} size="2x" bgColor="red" />
              &nbsp;TIVING
            </ExpenseList>
            <ExpenseList>
              <ExpenseListIcon icon={faTag} size="2x" bgColor="purple" />
              &nbsp;DISNEY PLUS
            </ExpenseList>

            {/* showMore가 false일 때만 faAngleDown을 렌더링 */}
            {!PatternShowMore && (
              <FontAwesomeIcon
                icon={faAngleDown}
                size="2x"
                onClick={() => PatternSetShowMore(true)}
                style={{ cursor: "pointer" }}
              />
            )}

            {/* showMore가 true일 때만 추가 항목을 렌더링 */}
            {PatternShowMore && (
              <>
                <ExpenseList>
                  <ExpenseListIcon
                    icon={faFaceLaughBeam}
                    size="2x"
                    bgColor="#FF8C00"
                  />
                  &nbsp;메롱
                </ExpenseList>
                <ExpenseList>
                  <ExpenseListIcon icon={faEllipsis} size="2x" bgColor="#999" />
                  &nbsp;기타
                </ExpenseList>
              </>
            )}
          </ExpenseListWrap>
        </ExpenseDiv>
      </Section>

      {/* 나의 소득 */}
      <Section>
        <SectionTitle>
          <FontAwesomeIcon icon={faAngleLeft} />
          &nbsp;9월 소득&nbsp;
          <FontAwesomeIcon icon={faAngleRight} />
        </SectionTitle>
        <ExpenseDiv>
          <Expense>999,888원</Expense>
          <ExpenseChart></ExpenseChart>
          <ExpenseListWrap>
            <ExpenseList>
              <ExpenseListIcon icon={faMugHot} size="2x" bgColor="#5D3800" />
              &nbsp;카페·간식
            </ExpenseList>
            <ExpenseList>
              <ExpenseListIcon icon={faTag} size="2x" bgColor="#FFD2BD" />
              &nbsp;쇼핑
            </ExpenseList>
            <ExpenseList>
              <ExpenseListIcon
                icon={faFileInvoiceDollar}
                size="2x"
                bgColor="#5E76FF"
              />
              &nbsp;공과금
            </ExpenseList>

            {/* showMore가 false일 때만 faAngleDown을 렌더링 */}
            {!IncomeShowMore && (
              <FontAwesomeIcon
                icon={faAngleDown}
                size="2x"
                onClick={() => IncomeSetShowMore(true)}
                style={{ cursor: "pointer" }}
              />
            )}

            {/* showMore가 true일 때만 추가 항목을 렌더링 */}
            {IncomeShowMore && (
              <>
                <ExpenseList>
                  <ExpenseListIcon
                    icon={faFaceLaughBeam}
                    size="2x"
                    bgColor="#FF8C00"
                  />
                  &nbsp;메롱
                </ExpenseList>
                <ExpenseList>
                  <ExpenseListIcon icon={faEllipsis} size="2x" bgColor="#999" />
                  &nbsp;기타
                </ExpenseList>
              </>
            )}
          </ExpenseListWrap>
        </ExpenseDiv>
      </Section>
    </Container>
  );
}

export default HomePage;
