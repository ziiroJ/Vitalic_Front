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
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
} from "chart.js";
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
	font-weight: 600;
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
const SendEmailButton = styled.button`
	position: relative;
	width: 100%;
	height: 50px;
	padding: 12px;
	background-color: #444; // 버튼의 기본 배경색
	border: none;
	color: white;
	border-radius: 30px;
	font-size: 0.9rem;
	cursor: pointer;
	margin-bottom: 100px;
	font-family: "Hahmlet", serif;
	letter-spacing: 1.5px;
	overflow: hidden;
	transition: 0.6s cubic-bezier(0.77, 0, 0.175, 1);
	&:hover {
		color: white;
		background: transparent; // hover 시 배경색
	}
	@media (max-width: 768px) {
		margin-bottom: 100px;
	}
	@media (max-width: 480px) {
		margin-bottom: 80px;
	}
`;
const categories = {
	입금: faFileInvoiceDollar,
	이체: faAngleLeft,
	편의점: faShop,
	마트: faCartShopping,
	웹쇼핑: faTag,
	"엔테터인먼트(영화, 게임)": faHeart,
	카페: faMugHot,
	패스트푸드: faBurger,
	식당: faUtensils,
	기타: faEllipsis,
};
const getChartData = (topCategories, withdrawTotal) => {
	if (topCategories.length === 0) {
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

	const labels = topCategories.map(
		(category) => category.out_type
	);
	const data = topCategories.map(
		(category) => category.amount
	);

	const othersAmount =
		withdrawTotal -
		data.reduce((acc, curr) => acc + curr, 0);
	if (othersAmount > 0) {
		labels.push("그 외");
		data.push(othersAmount);
	}

	const backgroundColors = labels.map((label, index) =>
		index < topCategories.length
			? `hsla(36, 100%, ${
					100 -
					(topCategories[index].amount / withdrawTotal) *
						100
			  }%, 1)`
			: "#999"
	);

	// // 기타 항목은 회색으로 설정
	// if (otherTotal > 0) {
	//   backgroundColors.push("#999");
	// }

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

const ExpenseChart = ({ topCategories, withdrawTotal }) => {
	return (
		<ChartContainer>
			<Doughnut
				data={getChartData(topCategories, withdrawTotal)}
				options={{
					responsive: true,
					maintainAspectRatio: true,
					plugins: {
						legend: {
							position: "top",
							labels: {
								usePointStyle: true,
								padding: 15,
								font: {
									family: "Hahmlet",
									size: 16,
									weight: "400",
								},
								color: "#fff",
							},
						},
						tooltip: {
							backgroundColor: "rgba(0, 0, 0, 0.8)",
							padding: 10,
							titleFont: {
								color: "#fff",
								family: "Hahmlet",
								size: 17,
								weight: 500,
							},
							bodyFont: {
								color: "#fff",
								family: "Hahmlet",
								size: 15,
							},
							callbacks: {
								label: function (tooltipItem) {
									return ` ${tooltipItem.raw.toLocaleString()}원`;
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
	display: flex;
	justify-content: space-between;
	padding: 0 0 20px 0px;
	font-size: 1.25rem;
	font-weight: 500;
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

const ExpenseAmountWrap = styled.div`
	display: flex;
	align-items: center;
	font-weight: 500;
`;
const ExpenseAmount = styled.div`
	margin-right: 20px;
`;
const DetailDot = styled.div`
	width: 5px; /* 아이콘과 동일한 너비 */
	height: 5px; /* 아이콘과 동일한 높이 */
	background-color: #aaa; /* 원하는 색상으로 설정 */
	border-radius: 50%;
	margin: 0px 20px 0 60px;
	display: inline-flex; /* 아이콘과 같은 방식으로 정렬 */
	align-items: center; /* 수직 중앙 정렬 */
	justify-content: center; /* 수평 중앙 정렬 */
	@media (max-width: 768px) {
		margin: 0px 15px 0 50px;
	}
	@media (max-width: 480px) {
		margin: 0px 15px 0 40px;
	}
`;
const ExpenseDetailAmountWrap = styled.div`
	display: flex;
	align-items: center; /* 도트와 텍스트 정렬 */
	font-weight: 500;
	font-size: 1.25rem; /* 상위 항목과 동일한 크기 */
	padding: 0 0 20px 0; /* 일관된 패딩 유지 */
	color: #fff;
	@media (max-width: 768px) {
		font-size: 1rem;
	}
	@media (max-width: 480px) {
		font-size: 0.85rem;
	}
`;
const ExpenseDetailAmount = styled.div`
	margin-right: 20px;
	color: #fff;
`;
const Dot = styled.span`
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: orange;
	margin-right: 10px;
`;

const PatternAmountWrap = styled.div`
	font-weight: 400;
`;
const PatternAmount = styled.div`
	margin-right: 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin-right: 20px;
`;
const PatternAmountDate = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	font-size: 0.9rem;
	color: #fff;
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
// 모달 스타일
const Modal = styled.div.withConfig({
	shouldForwardProp: (prop) =>
		!["show", "fadeOut"].includes(prop),
})`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgba(0, 0, 0, 0.8);
	color: white;
	padding: 20px;
	border-radius: 10px;
	display: ${(props) => (props.$show ? "block" : "none")};
	opacity: ${(props) => (props.$fadeOut ? 0 : 1)};
	transition: opacity 1s ease;
`;
const HomePage = () => {
	const navigate = useNavigate();
	const [ExpenseShowMore, ExpenseSetShowMore] =
		useState(false);
	const [PatternShowMore, PatternSetShowMore] =
		useState(false);
	const [currentMonth, setCurrentMonth] = useState(
		new Date()
	);
	const [expenses, setExpenses] = useState([]);
	const [summaryData, setSummaryData] = useState(null);
	const [patterns, setPatterns] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showOtherExpenses, setShowOtherExpenses] =
		useState(false);
	const [showModal, setShowModal] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);
	// 원하는 형식으로 날짜를 설정합니다.
	const formattedDate = `${currentMonth.getMonth() + 1}월`;
	const [userEmail, setUserEmail] = useState(""); // userEmail만 상태로 관리

	//   // 이전 달로 변경하는 함수
	//   const handlePrevMonth = () => {
	//     setCurrentMonth(
	//       new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
	//     );
	//   };
	// 이전 달로 변경하는 함수
	const handlePrevMonth = () => {
		setCurrentMonth((prevMonth) => {
			const newDate = new Date(prevMonth);
			newDate.setMonth(prevMonth.getMonth() - 1); // 이전 달로 설정
			return newDate;
		});
	};

	//   // 다음 달로 변경하는 함수
	//   const handleNextMonth = () => {
	//     setCurrentMonth(
	//       new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
	//     );
	//   };
	// 다음 달로 변경하는 함수
	const handleNextMonth = () => {
		setCurrentMonth((prevMonth) => {
			const newDate = new Date(prevMonth);
			newDate.setMonth(prevMonth.getMonth() + 1); // 다음 달로 설정
			return newDate;
		});
	};

	//   const fetchSummaryData = async () => {
	//     setLoading(true);
	//     try {
	//       const response = await axios.post("http://127.0.0.1:8000/api/report/mwd");
	//       setSummaryData(response.data.monthly_summary);
	//     } catch (error) {
	//       console.error("월별 지출 데이터 가져오는 중 오류 발생:", error);
	//     } finally {
	//       setLoading(false);
	//     }
	//   };

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				// const response = await axios.get(
				// 	"http://localhost:8080/user/mypage"
				// );

				const response = await Promise.race([
					axios.get("http://localhost:8080/user/mypage"),
					axios.get(
						"http://172.16.13.116:8080/user/mypage"
					),
				]);

				const { userEmail } = response.data; // 이메일만 추출
				setUserEmail(userEmail); // 상태 업데이트
			} catch (error) {
				console.error(
					"사용자 정보를 가져오는 중 오류가 발생했습니다:",
					error
				);
			}
		};

		fetchUserData();
	}, []); // 처음 컴포넌트가 마운트될 때 한 번만 실행

	const fetchSummaryData = async () => {
		setLoading(true);
		try {
			// 현재 날짜 기반으로 year, month, day 가져오기
			const year = currentMonth.getFullYear();
			const month = currentMonth.getMonth() + 1; // 1부터 시작하도록
			const day = currentMonth.getDate(); // 현재 날짜의 일

			const response = await Promise.any([
				axios.post(
					"http://127.0.0.1:8000/api/report/monthly",
					{
						year,
						month,
						day,
					}
				),
				axios.post(
					"http://172.16.13.116:8000/api/report/monthly",
					{
						year,
						month,
						day,
					}
				),
			]);

			const { monthly_top3_summary, other_categories } =
				response.data;

			const {
				deposit_total,
				withdraw_total,
				top_categories,
			} = monthly_top3_summary;
			const otherCategories = other_categories;

			setSummaryData({
				deposit_total,
				withdraw_total,
				top_categories: top_categories || [],
				other_categories: other_categories || [], // other_categories가 없을 경우 빈 배열로 처리
			});
		} catch (error) {
			console.error(
				"월별 지출 데이터 가져오는 중 오류 발생:",
				error
			);
		} finally {
			setLoading(false);
		}
	};

	const fetchPatterns = async () => {
		setLoading(true);
		try {
			const res = await Promise.any([
				axios.post(
					"http://127.0.0.1:8000/api/report/fixed"
				),
				axios.post(
					"http://172.16.13.116:8000/api/report/fixed"
				),
			]);
			const data = Array.isArray(res.data.monthly)
				? res.data.monthly
				: [];
			console.log("Fetched Data:", data); // 데이터 확인용
			setPatterns(data);
		} catch (error) {
			console.error(
				"패턴화된 지출 데이터를 가져오는 중 오류 발생:",
				error
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSummaryData();
		// 컴포넌트가 마운트될 때 데이터 fetching
		fetchPatterns(); // 컴포넌트가 마운트될 때 데이터 fetching
	}, [currentMonth]);

	if (loading) return <div>로딩 중...</div>;
	if (!summaryData) return <div>데이터가 없습니다.</div>;

	const {
		deposit_total,
		withdraw_total,
		top_categories,
		other_categories,
	} = summaryData;

	const otherAmount =
		withdraw_total -
		top_categories.reduce(
			(sum, cat) => sum + cat.amount,
			0
		);
	// 패턴화된 지출 데이터 fetching

	// 총 패턴화된 금액 계산
	const totalPatterns = patterns.reduce(
		(total, pattern) => total + pattern.amount,
		0
	);

	// '그 외' 항목을 클릭했을 때의 핸들러
	const handleShowOtherExpenses = () => {
		setShowOtherExpenses(!showOtherExpenses);
	};

	console.log("총 토탈금액: " + totalPatterns);

	const handleSendEmail = async () => {
		try {
			console.log("가입할 때 입력한 이메일:", userEmail); // 이메일 값을 콘솔에 출력
			const response = await Promise.any([
				axios.post(
					"http://localhost:8000/api/report/visualization",
					{
						email: userEmail,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				),
				axios.post(
					"http://172.16.13.116:8000/api/report/visualization",
					{
						email: userEmail,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				),
			]);
			console.log("백엔드 응답:", response); // 응답 확인
			// 2. 백엔드에서 응답을 200 상태코드로 받으면 모달 띄우기
			if (response.status === 200) {
				setShowModal(true);
				setFadeOut(false);

				// 1초 후 모달 사라지기
				setTimeout(() => {
					setFadeOut(true);
					setTimeout(() => {
						setShowModal(false);
					}, 500); // fadeOut 애니메이션 후 모달 숨기기
				}, 2000); // 2초 후 모달 사라지기
			} else {
				// 상태 코드가 200이 아니면 에러 메시지 처리
				alert(
					"이메일 전송에 실패했습니다. 다시 시도해주세요."
				);
			}
		} catch (error) {
			// 요청 실패 시 에러 처리
			console.error("Email sending failed:", error);
			alert(
				"이메일 전송에 실패했습니다. 다시 시도해주세요."
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
						{withdraw_total.toLocaleString()}원
					</Expense>
					<ExpenseChart
						topCategories={top_categories}
						withdrawTotal={withdraw_total}
					/>
					<ExpenseListWrap>
						{top_categories.map((category, index) => (
							<ExpenseList key={index}>
								<ExpenseAmountWrap>
									<ExpenseListIcon
										icon={
											categories[category.out_type] ||
											categories["기타"]
										}
									/>
									{category.out_type}
								</ExpenseAmountWrap>
								<ExpenseAmount>
									{category.amount.toLocaleString()}원
								</ExpenseAmount>
							</ExpenseList>
						))}
						{otherAmount > 0 && (
							<ExpenseList
								onClick={handleShowOtherExpenses}
								style={{ cursor: "pointer" }}
							>
								<ExpenseAmountWrap>
									<ExpenseListIcon
										icon={categories["기타"]}
									/>
									그 외
								</ExpenseAmountWrap>
								<ExpenseAmount>
									{otherAmount.toLocaleString()}원
								</ExpenseAmount>
							</ExpenseList>
						)}
						{showOtherExpenses && (
							<div>
								{other_categories
									.filter(
										(cat) =>
											!top_categories.some(
												(top) =>
													top.out_type === cat.out_type
											)
									)
									.map((category, index) => (
										<ExpenseList key={index}>
											<ExpenseDetailAmountWrap>
												<DetailDot />
												{category.out_type}
											</ExpenseDetailAmountWrap>
											<ExpenseDetailAmount>
												{category.amount.toLocaleString()}원
											</ExpenseDetailAmount>
										</ExpenseList>
									))}
							</div>
						)}
					</ExpenseListWrap>
				</ExpenseDiv>
			</Section>

			{/* 패턴화된 지출 섹션 */}
			<Section>
				<SectionTitle>패턴화된 지출</SectionTitle>
				<ExpenseDiv>
					{loading ? ( // 로딩 중이면 로딩 메시지 표시
						<Expense>로딩 중...</Expense>
					) : (
						<>
							<Expense>
								{totalPatterns.toLocaleString()}원
							</Expense>
							<ExpenseListWrap>
								{patterns
									.slice(
										0,
										PatternShowMore ? patterns.length : 3
									)
									.map((pattern, index) => (
										<ExpenseList key={index}>
											<PatternAmountWrap>
												<Dot />
												&nbsp;{pattern.source}
											</PatternAmountWrap>
											<PatternAmount>
												<PatternAmountDate>
													결제예상일: {pattern.date}
												</PatternAmountDate>
												{pattern.amount.toLocaleString()}원
											</PatternAmount>
										</ExpenseList>
									))}
								{patterns.length > 3 &&
									!PatternShowMore && ( // 3개 이상의 패턴일 경우
										<FontAwesomeIcon
											icon={faAngleDown}
											size="2x"
											onClick={() =>
												PatternSetShowMore(true)
											}
											style={{ cursor: "pointer" }}
										/>
									)}
							</ExpenseListWrap>
						</>
					)}
				</ExpenseDiv>
			</Section>
			<SendEmailButton onClick={handleSendEmail}>
				내 금융 차트 이메일로 보내기
			</SendEmailButton>

			<Modal $show={showModal} $fadeOut={fadeOut}>
				내 이메일로 전송이 완료되었습니다.
			</Modal>
		</Container>
	);
};

export default HomePage;
