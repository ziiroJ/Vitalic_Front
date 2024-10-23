import React, { useState, useEffect, useRef } from "react";
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
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
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

const CalendarWrap = styled.div`
  margin-bottom: 20px;
  .fc-button {
    background-color: #f3a338;
    border: none;
    color: #fff;
  }
  .saturday {
    color: blue;
  }
  .sunday {
    color: red;
  }
  .minus-event {
    border: none;
    background-color: #666;
  }
  .plus-event {
    border: none;
    background-color: #3a76ff;
  }
  /* 캘린더의 반응형 처리 */
  .fc {
    width: 100%;
    font-size: 1rem;
    @media (max-width: 768px) {
      font-size: 0.85rem;
    }
    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
  .fc-toolbar-title {
    font-size: 1.5rem;
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
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
  padding: 0 0 20px 0;
  align-self: flex-start;
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ExpenseListWrap = styled.div`
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

function CalendarPage() {
  const navigate = useNavigate();

  // 상태 관리
  const [ExpenseShowMore, ExpenseSetShowMore] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null); // FullCalendar 제어를 위한 ref 생성

  // 한국어 달 이름 배열
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  // 초기 이벤트 데이터 (백엔드에서 받아오는 데이터로 대체 가능)
  const initialEvents = [
    { title: "-4,285", date: "2024-10-15", classNames: ["minus-event"] },
    { title: "+35,000", date: "2024-10-16", classNames: ["plus-event"] },
    { title: "-1,000", date: "2024-10-01", classNames: ["minus-event"] },
    { title: "+20,000", date: "2024-10-10", classNames: ["plus-event"] },
    { title: "-20,000", date: "2024-10-10", classNames: ["minus-event"] },
    { title: "-1,000", date: "2024-11-11", classNames: ["minus-event"] },
    { title: "+20,000", date: "2024-12-20", classNames: ["plus-event"] },
    { title: "-40,000", date: "2024-08-10", classNames: ["minus-event"] },
  ];

  // 백엔드 API에서 받은 데이터를 처리하는 함수
  const fetchEvents = async () => {
    try {
      // const response = await axios.get("http://127.0.0.1:8000/api/summary"); // 백엔드에서 데이터를 받아옴
      // const { year, month, daily_totals } = response.data;

      // 임시 데이터
      const response = {
        data: {
          year: 2023,
          month: 9,
          daily_totals: {
            1: {
              deposits: 0,
              withdrawals: 135050,
            },
            2: {
              deposits: 19350,
              withdrawals: 18220,
            },
            3: {
              deposits: 27540,
              withdrawals: 105670,
            },
            4: {
              deposits: 0,
              withdrawals: 105140,
            },
            5: {
              deposits: 27760,
              withdrawals: 234740,
            },
            6: {
              deposits: 25510,
              withdrawals: 127350,
            },
            7: {
              deposits: 0,
              withdrawals: 70170,
            },
            8: {
              deposits: 27010,
              withdrawals: 87500,
            },
            9: {
              deposits: 0,
              withdrawals: 55190,
            },
            10: {
              deposits: 0,
              withdrawals: 141470,
            },
            11: {
              deposits: 0,
              withdrawals: 79000,
            },
            12: {
              deposits: 0,
              withdrawals: 186520,
            },
            13: {
              deposits: 0,
              withdrawals: 168260,
            },
            14: {
              deposits: 0,
              withdrawals: 85680,
            },
            15: {
              deposits: 3500000,
              withdrawals: 214140,
            },
            30: {
              deposits: 0,
              withdrawals: 178100,
            },
          },
        },
      };
      const { year, month, daily_totals } = response.data;

      // daily_totals 데이터를 FullCalendar 이벤트 형식으로 변환
      const newEvents = Object.keys(daily_totals)
        .map((day) => {
          const { deposits, withdrawals } = daily_totals[day];
          const date = `${year}-${String(month).padStart(
            2,
            "0"
          )}-${day.padStart(2, "0")}`; // 연도와 월을 동적으로 설정

          // 입금과 출금을 각각 다른 이벤트로 설정
          const depositEvent =
            deposits > 0
              ? { title: `+${deposits}`, date, classNames: ["plus-event"] }
              : null;
          const withdrawalEvent =
            withdrawals > 0
              ? { title: `-${withdrawals}`, date, classNames: ["minus-event"] }
              : null;

          return [depositEvent, withdrawalEvent].filter(Boolean); // null 제거
        })
        .flat();

      setEvents(newEvents); // 이벤트 설정
    } catch (error) {
      console.error("이벤트 데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 이벤트 데이터를 받아옴
  useEffect(() => {
    fetchEvents();
  }, []);

  // 지출 항목 데이터
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

  // 추가 지출 항목 데이터
  const additionalExpenses = [
    { category: "교통", amount: 12000, icon: faTag, color: "#FFD2BD" },
    { category: "기타", amount: 12000, icon: faEllipsis, color: "#999" },
  ];

  // 총 지출 금액 계산
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // 달 변경 시 호출되는 함수
  const handleDatesSet = (dateInfo) => {
    const currentStart = dateInfo.view.currentStart;
    const month = currentStart.getMonth() + 1;
    setCurrentMonth(monthNames[month - 1]);
    setEvents(initialEvents);
  };

  // 이전 달로 이동
  const handlePrevMonth = () => {
    const calendarApi = calendarRef.current.getApi(); // FullCalendar API 가져오기
    calendarApi.prev(); // 이전 달로 이동
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    const calendarApi = calendarRef.current.getApi(); // FullCalendar API 가져오기
    calendarApi.next(); // 다음 달로 이동
  };

  return (
    <Container>
      {/* 상단 내비게이션 */}
      <TopNav>
        <button onClick={() => navigate("/user")}>
          <FontAwesomeIcon icon={faCircleUser} size="3x" />
        </button>
      </TopNav>

      {/* 로고 */}
      <Logo>Vitalic</Logo>

      {/* 캘린더 */}
      <CalendarWrap>
        <FullCalendar
          ref={calendarRef} // FullCalendar에 ref 연결
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          dayCellClassNames={(arg) => {
            const dayOfWeek = arg.date.getDay();
            if (dayOfWeek === 6) return "saturday"; // 토요일
            if (dayOfWeek === 0) return "sunday"; // 일요일
            return ""; // 평일은 클래스 추가 안함
          }}
          titleFormat={{ year: "numeric", month: "long" }} // 제목 포맷
          events={events} // 캘린더에 이벤트 설정
          datesSet={handleDatesSet} // 날짜 변경 시 이벤트 핸들러
        />
      </CalendarWrap>

      {/*월 지출 섹션 */}
      <Section>
        <SectionTitle>
          <FontAwesomeIcon
            icon={faAngleLeft}
            onClick={handlePrevMonth}
            style={{ cursor: "pointer" }}
          />
          &nbsp;{currentMonth} 지출&nbsp;
          <FontAwesomeIcon
            icon={faAngleRight}
            onClick={handleNextMonth}
            style={{ cursor: "pointer" }}
          />
        </SectionTitle>
        <ExpenseDiv>
          <Expense>{totalExpenses.toLocaleString()}원</Expense>
          <ExpenseListWrap>
            {/* 기존 지출 항목과 추가 지출 항목을 모두 렌더링 */}
            {expenses
              .concat(ExpenseShowMore ? additionalExpenses : []) // 더보기 시 추가 항목 포함
              .sort((a, b) => b.amount - a.amount) // 금액 내림차순 정렬
              .map((expense, index) => (
                <ExpenseList key={index}>
                  <ExpenseListIcon
                    icon={expense.icon}
                    size="2x"
                    bgColor={expense.color}
                  />
                  &nbsp;{expense.category}: {expense.amount.toLocaleString()}원
                </ExpenseList>
              ))}

            {/* 더보기 아이콘 */}
            {!ExpenseShowMore && additionalExpenses.length > 0 && (
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
    </Container>
  );
}

export default CalendarPage;
