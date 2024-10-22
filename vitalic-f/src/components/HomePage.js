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
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);

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
    font-size: 1.5rem;
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

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Section = styled.div`
  font-family: "Hanken Grotesk", sans-serif;
  background-color: #373737;
  width: 100%;
  min-height: ${(props) => props.mHeight || "250px"};
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
    padding: 20px;
    &:last-child {
      margin-bottom: 80px;
    }
  }
`;

const SectionTitle = styled.p`
  color: #fff;
  font-size: 1.5rem;
  font-family: "Hanken Grotesk", sans-serif;
  font-weight: bold;
  margin: 0 0 15px 0;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ExpenseDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Expense = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  padding: 0 0 20px 0;
  align-self: flex-start;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
const getChartData = (expenses = [], additionalExpenses = []) => {
  const allExpenses = [...expenses, ...additionalExpenses];

  if (allExpenses.length === 0) {
    return {
      labels: [],
      datasets: [
        {
          label: "지출 카테고리",
          data: [],
          backgroundColor: ["#999"],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };
  }

  const labels = allExpenses.map((expense) => expense.category);
  const data = allExpenses.map((expense) => expense.amount);

  // 금액이 큰 순서대로 정렬
  const sortedExpenses = allExpenses
    .slice()
    .sort((a, b) => b.amount - a.amount);
  const maxAmount = sortedExpenses[0]?.amount || 1; // 최대 금액을 가져옴

  // 색상은 주황색 계열로 설정하며, 금액 비율에 따라 색상 변경
  const backgroundColors = allExpenses.map((expense) => {
    const percentage = expense.amount / maxAmount;
    const lightness = 100 - percentage * 50; // 가장 큰 금액은 진한 주황색(50% lightness), 작은 금액은 연한 주황색(100% lightness)
    return `hsla(36, 100%, ${lightness}%, 1)`; // H: 36 (주황색), S: 100%, L: 계산된 값
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "지출 카테고리",
        data: data,
        backgroundColor: backgroundColors,
        borderColor: "#444",
        borderWidth: 2,
      },
    ],
  };
};

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; // 수직 방향 가운데 정렬
  width: 100%;
  height: 400px;
  max-height: 400px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const ExpenseChart = ({ expenses, additionalExpenses }) => {
  return (
    <ChartContainer>
      <Doughnut
        data={getChartData(expenses, additionalExpenses)}
        options={{
          responsive: true,
          maintainAspectRatio: true, // 비율 유지
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
                padding: 15,
              },
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${
                    tooltipItem.label
                  }: ${tooltipItem.raw.toLocaleString()}원`;
                },
              },
            },
          },
        }}
      />
    </ChartContainer>
  );
};

const ExpenseListWrap = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const ExpenseList = styled.div`
  padding: 0 0 20px 0px;
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Dot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#999"};
  margin-right: 10px;
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
    margin-right: 5px;
  }

  svg {
    width: 50%;
    height: 50%;
  }
`;

function HomePage() {
  const navigate = useNavigate();
  const [ExpenseShowMore, ExpenseSetShowMore] = useState(false); // 지출추가 항목의 표시 여부
  const [PatternShowMore, PatternSetShowMore] = useState(false); // 패턴화 추가 항목의 표시 여부

  const [currentMonth, setCurrentMonth] = useState(new Date()); // 현재 달을 저장

  // 원하는 형식으로 날짜를 설정합니다.
  const formattedDate = `${currentMonth.getMonth() + 1}월`;
  // 이전 달로 변경하는 함수
  const handlePrevMonth = () => {
    setCurrentMonth((prevDate) => {
      const newDate = new Date(prevDate); // 새로운 Date 객체 생성
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  // 다음 달로 변경하는 함수
  const handleNextMonth = () => {
    setCurrentMonth((prevDate) => {
      const newDate = new Date(prevDate); // 새로운 Date 객체 생성
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  // 더미 데이터

  const [expenses, setExpenses] = useState([
    { category: "카페·간식", amount: 20000, icon: faMugHot, color: "#5D3800" },
    { category: "쇼핑", amount: 150000, icon: faTag, color: "#FFD2BD" },
    {
      category: "공과금",
      amount: 50000,
      icon: faFileInvoiceDollar,
      color: "#5E76FF",
    },
  ]);

  const [patterns, setPatterns] = useState([
    { category: "NETFLIX", amount: 10000, color: "black" },
    { category: "TIVING", amount: 15000, color: "red" },
    { category: "DISNEY PLUS", amount: 12000, color: "purple" },
  ]);

  // 총 지출 금액 계산
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  // 총 패턴화된 금액 계산
  const totalPatterns = patterns.reduce(
    (total, pattern) => total + pattern.amount,
    0
  );

  // 지출 추가 항목 데이터
  const additionalExpenses = [
    { category: "교통", amount: 12000, icon: faTag, color: "#FFD2BD" },
    { category: "기타", amount: 12000, icon: faEllipsis, color: "#999" },
  ];

  // 패턴화된 추가 항목 데이터
  const additionalPatterns = [
    { category: "HBO MAX", amount: 9000, color: "blue" },
    { category: "SPOTIFY", amount: 7000, color: "green" },
  ];

  return (
    <Container>
      <TopNav>
        <button onClick={() => navigate("/user")}>
          <FontAwesomeIcon icon={faCircleUser} size="3x" />
        </button>
      </TopNav>
      <Logo>Vitalic</Logo>

      {/* 지출 */}
      <Section>
        <SectionTitle>
          <FontAwesomeIcon
            icon={faAngleLeft}
            onClick={handlePrevMonth}
            style={{ cursor: "pointer" }}
          />
          &nbsp;{formattedDate} 지출&nbsp;
          <FontAwesomeIcon
            icon={faAngleRight}
            onClick={handleNextMonth}
            style={{ cursor: "pointer" }}
          />
        </SectionTitle>
        <ExpenseDiv>
          <Expense>{totalExpenses.toLocaleString()}원</Expense>
          <ExpenseChart
            expenses={expenses}
            additionalExpenses={additionalExpenses}
          />
          <ExpenseListWrap>
            {expenses.map((expense, index) => (
              <ExpenseList key={index}>
                <ExpenseListIcon
                  icon={expense.icon}
                  size="2x"
                  bgColor={expense.color}
                />
                &nbsp;{expense.category} {expense.amount.toLocaleString()}원
              </ExpenseList>
            ))}

            {/* showMore가 false일 때만 faAngleDown을 렌더링 */}
            {!ExpenseShowMore && additionalExpenses.length > 0 && (
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
                {additionalExpenses.map((item, index) => (
                  <ExpenseList key={index}>
                    <ExpenseListIcon
                      icon={item.icon}
                      size="2x"
                      bgColor={item.color}
                    />
                    &nbsp;{item.category}{" "}
                    {item.amount ? item.amount.toLocaleString() + "원" : ""}
                  </ExpenseList>
                ))}
              </>
            )}
          </ExpenseListWrap>
        </ExpenseDiv>
      </Section>

      <Section>
        <SectionTitle>패턴화된 지출</SectionTitle>
        <ExpenseDiv>
          <Expense>{totalPatterns.toLocaleString()}원</Expense>
          <ExpenseListWrap>
            {patterns.map((pattern, index) => (
              <ExpenseList key={index}>
                <Dot color={pattern.color} /> {/* 점을 표시 */}
                &nbsp;{pattern.category}: {pattern.amount.toLocaleString()}원
              </ExpenseList>
            ))}

            {/* showMore가 false일 때만 faAngleDown을 렌더링 */}
            {!PatternShowMore && additionalPatterns.length > 0 && (
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
                {additionalPatterns.map((item, index) => (
                  <ExpenseList key={index}>
                    <Dot color={item.color} /> {/* 점을 표시 */}
                    &nbsp;{item.category}: {(item.amount || 0).toLocaleString()}
                    원
                  </ExpenseList>
                ))}
              </>
            )}
          </ExpenseListWrap>
        </ExpenseDiv>
      </Section>
    </Container>
  );
}

export default HomePage;
