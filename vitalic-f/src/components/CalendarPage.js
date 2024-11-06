import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate } from "react-router-dom";
import interactionPlugin from "@fullcalendar/interaction";
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
	width: 8px; /* 도트의 너비 */
	height: 8px; /* 도트의 높이 */
	border-radius: 50%; /* 원형으로 만들기 */
	display: inline-block; /* 인라인 블록으로 표시 */
	margin-right: 8px; /* 텍스트와의 간격 */
	background-color: ${(props) =>
		props.isMinus
			? "#e74c3c"
			: "#2ecc71"}; /* 출금과 입금에 따라 색상 설정 */
`;
function CalendarPage() {
	const navigate = useNavigate();

	const [transactionList, setTransactionList] = useState(
		[]
	);
	const [currentMonth, setCurrentMonth] = useState("");
	const [currentYear, setCurrentYear] = useState("");
	const [events, setEvents] = useState([]);
	const [
		selectedDateTransactions,
		setSelectedDateTransactions,
	] = useState([]);
	const [selectedDate, setSelectedDate] = useState("");
	const calendarRef = useRef(null);

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

	// 이벤트와 지출 데이터를 백엔드 API에서 받아오는 함수
	useEffect(() => {
		const today = new Date();
		fetchData(today.getFullYear(), today.getMonth() + 1);
	}, []);

	// fetchData 함수 수정
	const fetchData = async (year, month) => {
		try {
			const eventResponse = await axios.post(
				"http://127.0.0.1:8000/api/report/calendar/all",
				{ year, month }
			);

			console.log("Event Response:", eventResponse.data);
			const dailyData = eventResponse.data;

			if (!dailyData) {
				console.error("dailyData가 undefined입니다");
				return;
			}

			// 이벤트 생성
			const newEvents = dailyData.flatMap(
				({ day, deposit, withdraw }) => {
					const date = `${year}-${String(month).padStart(
						2,
						"0"
					)}-${String(day).padStart(2, "0")}`;
					const events = [];

					if (deposit > 0) {
						events.push({
							title: `+${deposit.toLocaleString()}원`,
							date,
							classNames: ["plus-event"],
						});
					}
					if (withdraw > 0) {
						events.push({
							title: `-${withdraw.toLocaleString()}원`,
							date,
							classNames: ["minus-event"],
						});
					}

					return events;
				}
			);

			setEvents(newEvents);
			console.log("Fetched events:", newEvents);

			// 거래 내역 상태 업데이트
			const groupedTransactions = dailyData.map(
				({ day, deposits, withdrawals }) => {
					const date = `${year}-${String(month).padStart(
						2,
						"0"
					)}-${String(day).padStart(2, "0")}`;
					const transactions = [];

					if (deposits > 0) {
						transactions.push({
							title: `+${deposits.toLocaleString()}원 (입금)`,
							classNames: ["plus-event"],
						});
					}
					if (withdrawals > 0) {
						transactions.push({
							title: `-${withdrawals.toLocaleString()}원 (출금)`,
							classNames: ["minus-event"],
						});
					}

					return { date, transactions };
				}
			);

			setTransactionList(groupedTransactions);
		} catch (error) {
			console.error(
				"데이터를 가져오는 중 오류가 발생했습니다:",
				error
			);
		}
	};

	// 달 변경 시 호출되는 함수
	const handleDatesSet = (dateInfo) => {
		const currentStart = dateInfo.view.currentStart;
		const year = currentStart.getFullYear();
		const month = currentStart.getMonth() + 1;
		setCurrentMonth(monthNames[month - 1]);
		setCurrentYear(year);

		// 변경된 연도와 월로 fetchData 호출
		fetchData(year, month);
	};

	const handleDateSelect = async (date) => {
		const selectedDateStr = date.startStr;
		setSelectedDate(selectedDateStr);

		const dateObj = new Date(selectedDateStr);
		const payload = {
			year: dateObj.getFullYear(),
			month: dateObj.getMonth() + 1,
			day: dateObj.getDate(),
		};

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/report/calendar",
				payload
			);
			const data = response.data;

			console.log("Response Data:", data);

			const transactionDetails = [
				...data.deposit_details,
				...data.withdraw_details,
			];
			transactionDetails.sort(
				(a, b) =>
					new Date(a.tran_date_time) -
					new Date(b.tran_date_time)
			);

			setSelectedDateTransactions(transactionDetails);
		} catch (error) {
			console.error(
				"데이터를 가져오는 중 오류가 발생했습니다:",
				error
			);
		}
	};

	return (
		<Container>
			<TopNav>
				<button onClick={() => navigate("/user")}>
					<FontAwesomeIcon icon={faCircleUser} size="3x" />
				</button>
			</TopNav>

			<Logo>Vitalic</Logo>

			<CalendarWrap>
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					headerToolbar={{
						left: "prev",
						center: "title",
						right: "next",
					}}
					dayCellClassNames={(arg) => {
						const dayOfWeek = arg.date.getDay();
						if (dayOfWeek === 6) return "saturday";
						if (dayOfWeek === 0) return "sunday";
						return "";
					}}
					titleFormat={{ year: "numeric", month: "long" }}
					events={events}
					datesSet={handleDatesSet}
					selectable={true}
					select={handleDateSelect}
				/>
			</CalendarWrap>

			<Section>
				<SectionTitle>
					{currentYear} - {currentMonth} 거래 내역
				</SectionTitle>
				<ExpenseDiv>
					<ExpenseListWrap>
						<h3>{selectedDate}</h3> {/* 선택한 날짜 */}
						{selectedDateTransactions.map((item, index) => (
							<ExpenseList key={index}>
								<Dot
									isMinus={
										item.in_des.includes("이체")
											? false
											: true
									}
								/>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
									}}
								>
									<div>
										<span>{item.in_des}</span>{" "}
										{/* 거래 상세 내용 */}
										<span
											style={{
												fontSize: "smaller",
												display: "block",
											}}
										>
											{item.tran_date_time}
										</span>{" "}
										{/* 거래 시간, 글씨 작게, 블록으로 표시하여 줄 바꿈 */}
									</div>
									<span style={{ marginLeft: "auto" }}>
										{item.tran_amt.toLocaleString()}원
									</span>{" "}
									{/* 거래 금액, 오른쪽 배치 */}
								</div>
							</ExpenseList>
						))}
					</ExpenseListWrap>
				</ExpenseDiv>
			</Section>
		</Container>
	);
}

export default CalendarPage;
