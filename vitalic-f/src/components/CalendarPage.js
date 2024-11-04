import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
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
  font-family: "Hahmlet", serif;

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
  font-weight: bold;
  margin: 0 0 15px 0;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const CalendarWrap = styled.div`
  margin-bottom: 20px;
  overflow: hidden;
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
    padding: 0;
  }
  .plus-event {
    border: none;
    background-color: #3a76ff;
    padding: 0;
  }

  /* 캘린더의 반응형 처리 */
  .fc {
    width: 100%;
    font-size: 0.8rem;
    height: auto;
    @media (max-width: 768px) {
      font-size: 0.7rem;
    }
    @media (max-width: 480px) {
      font-size: 0.6rem;
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
`;
const TransactionList = styled.ul`
  list-style-type: none; /* 기본 리스트 스타일 제거 */
  padding: 0; /* 패딩 제거 */
  margin: 0; /* 마진 제거 */
`;

const TransactionItem = styled.li`
  display: flex;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }

  justify-content: space-between; /* 왼쪽과 오른쪽 정렬 */
  align-items: center; /* 수직 정렬 */
  margin-bottom: 10px; /* 아이템 간격 */
`;

const Dot = styled.span`
  width: 8px; /* 도트의 너비 */
  height: 8px; /* 도트의 높이 */
  border-radius: 50%; /* 둥근 형태 */
  display: inline-block; /* 블록 형태 */
  margin-right: 8px; /* 도트와 텍스트 간격 */
  background-color: #fff; /* 조건에 따른 색상 */
`;

const TransactionText = styled.div`
  display: flex;
  align-items: center; /* 수직 정렬 */
  font-weight: 600;
  letter-spacing: 2px;
`;
const TransactionTimeText = styled.div`
  color: #aaa;
  font-size: 0.8rem;
`;
const TransactionAmountText = styled.div`
  font-weight: 600;
  color: ${(props) =>
    props.type === "입금" ? "#17A1FA" : "#fff"}; /* 조건에 따른 색상 */
`;
function CalendarPage() {
  const navigate = useNavigate();

  // 상태 관리
  const [transactionList, setTransactionList] = useState([]); // 거래 내역 상태 추가
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
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

  // 이벤트와 거래 데이터를 백엔드 API에서 받아오는 함수
  useEffect(() => {
    const today = new Date();
    fetchData(today.getFullYear(), today.getMonth() + 1, today.getDate()); // 현재 날짜로 초기화
  }, []);

  // fetchData 함수 수정
  // const fetchData = async (year, month) => {
  // 	try {
  // 		// POST 요청으로 데이터를 body에 담아 전송
  // 		const eventResponse = await axios.post(
  // 			"http://127.0.0.1:8000/api/report/calendar/all",
  // 			{
  // 				year: year,
  // 				month: month,
  // 			}
  // 		);

  // 		console.log("Event Response:", eventResponse.data);

  // 		const daily_totals = eventResponse.data.daily_totals;
  // 		console.log("Daily Totals:", daily_totals);

  // 		if (!daily_totals) {
  // 			console.error("daily_totals가 undefined입니다");
  // 			return;
  // 		}

  // 		// daily_totals을 기반으로 newEvents 생성
  // 		const newEvents = Object.keys(daily_totals).flatMap(
  // 			(day) => {
  // 				const { deposits, withdrawals } =
  // 					daily_totals[day];
  // 				const date = `${year}-${String(month).padStart(
  // 					2,
  // 					"0"
  // 				)}-${String(day).padStart(2, "0")}`;

  // 				const events = [];
  // 				if (deposits > 0) {
  // 					events.push({
  // 						title: `+${deposits.toLocaleString()}원`,
  // 						date,
  // 						classNames: ["plus-event"],
  // 					});
  // 				}
  // 				if (withdrawals > 0) {
  // 					events.push({
  // 						title: `-${withdrawals.toLocaleString()}원`,
  // 						date,
  // 						classNames: ["minus-event"],
  // 					});
  // 				}
  // 				return events;
  // 			}
  // 		);

  // 		setEvents(newEvents);
  // 		console.log("Fetched events:", newEvents);

  // 		// 거래 내역 생성
  // 		const transactionMap = {};
  // 		Object.keys(daily_totals).forEach((day) => {
  // 			const { deposits, withdrawals } = daily_totals[day];
  // 			const date = `${year}-${String(month).padStart(
  // 				2,
  // 				"0"
  // 			)}-${String(day).padStart(2, "0")}`;

  // 			if (!transactionMap[date]) {
  // 				transactionMap[date] = [];
  // 			}

  // 			if (deposits > 0) {
  // 				transactionMap[date].push({
  // 					title: `+${deposits.toLocaleString()}원 (입금)`,
  // 					classNames: ["plus-event"],
  // 				});
  // 			}
  // 			if (withdrawals > 0) {
  // 				transactionMap[date].push({
  // 					title: `-${withdrawals.toLocaleString()}원 (출금)`,
  // 					classNames: ["minus-event"],
  // 				});
  // 			}
  // 		});

  // 		// 거래 내역 상태 업데이트
  // 		const groupedTransactions = Object.entries(
  // 			transactionMap
  // 		).map(([date, transactions]) => ({
  // 			date,
  // 			transactions,
  // 		}));

  // 		setTransactionList(groupedTransactions);
  // 	} catch (error) {
  // 		console.error(
  // 			"데이터를 가져오는 중 오류가 발생했습니다:",
  // 			error
  // 		);
  // 	}
  // };
  // fetchData 함수 수정
  const fetchData = async (year, month, day) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/report/calendar",
        {
          year: year,
          month: month,
          day: day,
        }
      );

      console.log("Event Response:", response.data);

      const {
        deposits_total,
        withdrawals_total,
        deposit_details,
        withdraw_details,
      } = response.data;

      // 입금 및 출금 이벤트를 생성
      const newEvents = [
        {
          title: `${deposits_total.toLocaleString()}원`,
          date: `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`, // 날짜 포맷팅
          classNames: ["plus-event"],
        },
        {
          title: `-${withdrawals_total.toLocaleString()}원`,
          date: `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`, // 날짜 포맷팅
          classNames: ["minus-event"],
        },
      ];
      setEvents(newEvents);
      console.log("Fetched events:", newEvents);

      // 거래 내역 상태 업데이트
      const transactionMap = {};

      deposit_details.forEach(({ tran_amt, in_des, tran_date_time }) => {
        const date = tran_date_time.split(" ")[0];
        if (!transactionMap[date]) {
          transactionMap[date] = [];
        }
        transactionMap[date].push({
          tran_amt,
          in_des,
          tran_date_time,
          type: "입금",
        });
      });

      withdraw_details.forEach(({ tran_amt, in_des, tran_date_time }) => {
        const date = tran_date_time.split(" ")[0];
        if (!transactionMap[date]) {
          transactionMap[date] = [];
        }
        transactionMap[date].push({
          tran_amt,
          in_des,
          tran_date_time,
          type: "출금",
        });
      });

      const groupedTransactions = Object.entries(transactionMap).map(
        ([date, transactions]) => ({
          date,
          transactions,
        })
      );

      setTransactionList(groupedTransactions);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태
  const [selectedData, setSelectedData] = useState(null);
  const [transactions, setTransactions] = useState([]); // 해당 날짜의 거래 내역 상태

  const handleDatesSet = (arg) => {
    const currentStart = arg.view.currentStart;
    const year = currentStart.getFullYear();
    const month = currentStart.getMonth() + 1;
    setCurrentMonth(monthNames[month - 1]);
    setCurrentYear(year);

    fetchData(year, month); // 날짜 변경 시 데이터 요청
  };
  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    setSelectedDate(clickedDate);
    console.log(`날짜 클릭: ${arg.dateStr}`);
    const dateTransactions = transactionList.find(
      (item) => item.date === clickedDate
    );

    if (dateTransactions) {
      setTransactions(dateTransactions.transactions);
    } else {
      setTransactions([]); // 해당 날짜에 데이터가 없으면 빈 배열 설정
    }
  };

  //   // 백엔드에서 해당 날짜의 거래 내역 가져오기
  //   const response = await axios.get(
  //     `/api/report/calendar?date=${clickedDate}`
  //   );
  //   setTransactions(response.data); // 거래 내역 업데이트
  // };
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
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          dayCellClassNames={(arg) => {
            const dayOfWeek = arg.date.getDay();
            if (dayOfWeek === 6) return "saturday"; // 토요일
            if (dayOfWeek === 0) return "sunday"; // 일요일
            return ""; // 평일은 클래스 추가 안함
          }}
          titleFormat={{ year: "numeric", month: "long" }} // 제목 포맷
          events={events} // 캘린더에 이벤트 설정
          datesSet={handleDatesSet} // 날짜 변경 시 이벤트 핸들러
          dateClick={handleDateClick} // 날짜 클릭 핸들러 추가
        />
      </CalendarWrap>

      {/*월 지출 섹션 */}
      <Section>
        {selectedDate && (
          <div>
            <SectionTitle>{selectedDate} 내역</SectionTitle>
            {transactions.length > 0 ? (
              <TransactionList>
                {transactions.map((transaction, index) => (
                  <TransactionItem key={index}>
                    <TransactionText>
                      <Dot />
                      <span>
                        {transaction.in_des}
                        <TransactionTimeText>
                          {transaction.tran_date_time}
                        </TransactionTimeText>
                      </span>
                    </TransactionText>
                    <TransactionAmountText type={transaction.type}>
                      {transaction.type === "출금"
                        ? `-${transaction.tran_amt}`
                        : transaction.tran_amt}
                      원
                    </TransactionAmountText>
                  </TransactionItem>
                ))}
              </TransactionList>
            ) : (
              <p>거래 내역이 없습니다.</p>
            )}
          </div>
        )}
      </Section>
    </Container>
  );
}

export default CalendarPage;
