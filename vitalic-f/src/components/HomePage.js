import React, { useState, useEffect } from "react";
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
  faShop,
  faCartShopping,
  faHeart,
  faBurger,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

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
const getChartData = (expenses) => {
  if (expenses.length === 0) {
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
  // 지출을 금액 내림차순으로 정렬
  const sortedExpenses = expenses.slice().sort((a, b) => b.amount - a.amount);
  // 상위 3개를 가져오고 나머지를 "기타"로 묶기
  const top3Expenses = sortedExpenses.slice(0, 3);
  const others = sortedExpenses.slice(3);
  const otherTotal = others.reduce((sum, expense) => sum + expense.amount, 0);

  const labels = top3Expenses.map((expense) => expense.category);
  const data = top3Expenses.map((expense) => expense.amount);

  // "기타" 항목 추가
  if (otherTotal > 0) {
    labels.push("기타");
    data.push(otherTotal);
  }

  const maxAmount = Math.max(...data, otherTotal); // 최대 금액을 가져옴

  // 색상은 주황색 계열로 설정하며, 금액 비율에 따라 색상 변경
  const backgroundColors = top3Expenses.map((expense) => {
    const percentage = expense.amount / maxAmount;
    const lightness = 100 - percentage * 50; // 가장 큰 금액은 진한 주황색(50% lightness), 작은 금액은 연한 주황색(100% lightness)
    return `hsla(36, 100%, ${lightness}%, 1)`; // H: 36 (주황색), S: 100%, L: 계산된 값
  });

  // 기타 항목은 회색으로 설정
  if (otherTotal > 0) {
    backgroundColors.push("#999");
  }

  return {
    labels: labels,
    datasets: [
      {
        label: "지출 카테고리",
        data: data.concat(otherTotal > 0 ? [otherTotal] : []), // "기타" 값을 data에 추가
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

const ExpenseChart = ({ expenses }) => {
  return (
    <ChartContainer>
      <Doughnut
        data={getChartData(expenses)}
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
  background-color: #111;
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

const HomePage = () => {
  const navigate = useNavigate();
  const [ExpenseShowMore, ExpenseSetShowMore] = useState(false); // 지출추가 항목의 표시 여부
  const [PatternShowMore, PatternSetShowMore] = useState(false); // 패턴화 추가 항목의 표시 여부

  const [currentMonth, setCurrentMonth] = useState(new Date()); // 현재 달을 저장
  const [expenses, setExpenses] = useState([]);
  const [patterns, setPatterns] = useState([]); // 패턴화된 지출을 저장할 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  // 원하는 형식으로 날짜를 설정합니다.
  const formattedDate = `${currentMonth.getMonth() + 1}월`;
  // 이전 달로 변경하는 함수
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  // 다음 달로 변경하는 함수
  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  const categories = [
    {
      category: "입금",
      icon: faFileInvoiceDollar,
      amount: 0,
    },
    { category: "이체", icon: faAngleLeft, amount: 0 },
    { category: "편의점", icon: faShop, amount: 0 },
    { category: "마트", icon: faCartShopping, amount: 0 },
    { category: "웹쇼핑", icon: faTag, amount: 0 },
    { category: "엔터테인먼트", icon: faHeart, amount: 0 },
    { category: "카페", icon: faMugHot, amount: 0 },
    { category: "페스트푸드", icon: faBurger, amount: 0 },
    { category: "식당", icon: faUtensils, amount: 0 },
    { category: "기타", icon: faEllipsis, amount: 0 },
  ];

  // 백엔드에서 데이터 fetching
  const fetchExpenses = async () => {
    setLoading(true);
    try {
      // 여기에 백엔드 API 호출 추가
      const response = await axios.get("/api/summary"); // API 엔드포인트에 맞게 수정
      setExpenses(response.data); // 지출 데이터를 상태에 저장
    } catch (error) {
      console.error("지출 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };
  // 컴포넌트가 마운트될 때 데이터 fetching
  useEffect(() => {
    fetchExpenses();
    fetchPatterns();
  }, []);

  // 추가된 카테고리의 지출 금액을 계산하여 업데이트
  const updateExpenses = (allExpenses) => {
    const updatedCategories = categories.map((category) => {
      const totalAmount = allExpenses
        .filter((expense) => expense.category === category.category)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return { ...category, amount: totalAmount };
    });

    return updatedCategories;
  };

  // 더미 데이터 (각 월별 지출)
  const allExpenses = [
    { category: "카페", amount: 20000, month: 9 },
    { category: "웹쇼핑", amount: 150000, month: 9 },
    { category: "엔터테인먼트", amount: 50000, month: 9 },
    { category: "식당", amount: 30000, month: 9 },
    { category: "기타", amount: 70000, month: 9 },
    { category: "식당", amount: 30000, month: 10 },
    { category: "기타", amount: 70000, month: 10 },
    { category: "페스트푸드", amount: 50000, month: 10 },
  ];

  const filteredExpenses = updateExpenses(
    allExpenses.filter(
      (expense) => expense.month === currentMonth.getMonth() + 1
    )
  ).sort((a, b) => b.amount - a.amount);

  // // 백엔드에서 패턴화된 지출 데이터 fetching
  const fetchPatterns = async () => {
    setLoading(true);
    try {
      // const response = await axios.get("/api/patterns"); // API 엔드포인트에 맞게 수정
      // setPatterns(response.data); // 패턴 데이터를 상태에 저장

      // 더미 데이터 설정
      const dummyPatterns = [
        { source: "NETFLIX", amount: 30000, date: "5일" },
        { source: "DISNEY", amount: 45000, date: "5일" },
        { source: "SKT", amount: 20000, date: "5일" },
        { source: "LG", amount: 60000, date: "5일" },
        { source: "TVING", amount: 100000, date: "5일" },
        { source: "보험", amount: 15000, date: "5일" },
      ];
      setPatterns(dummyPatterns);
      //
    } catch (error) {
      console.error("패턴화된 지출 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatterns(); // 컴포넌트가 마운트될 때 데이터 fetching
  }, []);

  // 총 패턴화된 금액 계산
  const totalPatterns = patterns.reduce(
    (total, pattern) => total + pattern.amount,
    0
  );

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
          <Expense>
            {filteredExpenses
              .reduce((acc, expense) => acc + expense.amount, 0)
              .toLocaleString()}{" "}
            원
          </Expense>
          <ExpenseChart expenses={filteredExpenses} />
          <ExpenseListWrap>
            {ExpenseShowMore
              ? filteredExpenses.map((expense, index) => (
                  <ExpenseList key={index}>
                    <ExpenseListIcon icon={expense.icon} />
                    &nbsp;{expense.category} {expense.amount.toLocaleString()}원
                  </ExpenseList>
                ))
              : filteredExpenses.slice(0, 3).map((expense, index) => (
                  <ExpenseList key={index}>
                    <ExpenseListIcon icon={expense.icon} />
                    &nbsp;{expense.category} {expense.amount.toLocaleString()}원
                  </ExpenseList>
                ))}
            {!ExpenseShowMore && (
              <FontAwesomeIcon
                icon={faAngleDown}
                size="2x"
                onClick={() => ExpenseSetShowMore(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </ExpenseListWrap>
        </ExpenseDiv>
      </Section>

      <Section>
        <SectionTitle>패턴화된 지출</SectionTitle>
        <ExpenseDiv>
          {loading ? ( // 로딩 중이면 로딩 메시지 표시
            <Expense>로딩 중...</Expense>
          ) : (
            <>
              <Expense>{totalPatterns.toLocaleString()}원</Expense>
              <ExpenseListWrap>
                {patterns
                  .slice(0, PatternShowMore ? patterns.length : 3)
                  .map((pattern, index) => (
                    <ExpenseList key={index}>
                      <Dot />
                      &nbsp;{pattern.source}&nbsp;&nbsp;&nbsp;-&nbsp;
                      {pattern.amount.toLocaleString()}원
                    </ExpenseList>
                  ))}

                {patterns.length > 3 &&
                  !PatternShowMore && ( // 3개 이상의 패턴일 경우
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      size="2x"
                      onClick={() => PatternSetShowMore(true)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
              </ExpenseListWrap>
            </>
          )}
        </ExpenseDiv>
      </Section>
    </Container>
  );
};

export default HomePage;
