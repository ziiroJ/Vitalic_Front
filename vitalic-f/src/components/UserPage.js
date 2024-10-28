import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faBank,
	faCircleUser,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
	width: 100%;
	max-width: 600px;
	min-height: 100vh;
	margin: 0 auto;
	padding: 0 20px;
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
	}

	@media (max-width: 480px) {
	}
`;

const UserInfoWrap = styled.div`
	button {
		color: #fff;
		font-family: "Hanken Grotesk", sans-serif;
		border: none;
		background-color: transparent;
		margin-top: 20px;
	}
`;
const UserInfoWrapT = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const UserInfoImage = styled.div`
	margin-top: 80px;

	@media (max-width: 768px) {
		margin-top: 40px;
	}

	@media (max-width: 480px) {
		margin-top: 20px;
	}
`;
const UserName = styled.p`
	margin: 16px;
	padding: 0;
	font-size: 3rem;
	font-weight: bold;

	@media (max-width: 768px) {
		font-size: 2.5rem;
	}

	@media (max-width: 480px) {
		font-size: 2rem;
	}
`;

const SectionTop = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;
`;

const SectionSub = styled.p`
	margin: 5px;
	font-size: 1.2rem;

	@media (max-width: 480px) {
		font-size: 1rem;
	}
`;
const SectionTitle = styled.p`
	color: #fff;
	font-size: 1.5rem;
	font-weight: bold;
	margin: 0;

	@media (max-width: 480px) {
		font-size: 1.2rem;
	}
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

const SubmitButton = styled.button`
	width: 100%;
	padding: 12px;
	background-color: #444;
	border: none;
	color: white;
	border-radius: 30px;
	font-size: 0.75rem;
	cursor: pointer;
	margin: 10px 0px;

	&:hover {
		background-color: #f09000;
	}

	@media (max-width: 768px) {
		margin-bottom: 100px;
	}
	@media (max-width: 480px) {
		margin-bottom: 80px;
	}
`;

// function UserPage({ setGoal }) {
//   // 더미 사용자 데이터
//   const userInfo = {
//     name: "홍길동",
//     email: "user@example.com",
//     phone: "010-1234-5678",
//   };

//   const { name, email, phone } = userInfo;
//   const [yearGoal, setMonthGoal] = useState("");
//   const [monthGoal, setMonthGoal] = useState("");
//   const [dayGoal, setDayGoal] = useState("");
//   const navigate = useNavigate();

//   const handleSetGoal = () => {
//     setGoal({ year: yearGoal, month: monthGoal, day: dayGoal });
//     navigate("/goal");
//   };

//   // 로그아웃 함수
//   const handleLogout = () => {
//     // 여기서 인증 정보 삭제하는 코드를 추가할 수 있습니다 (예: 로컬 스토리지에서 토큰 삭제)
//     // 예: localStorage.removeItem("authToken");

//     // 로그인 페이지로 이동
//     navigate("/");
//   };

//   return (
//     <Container>
//       <UserInfoWrap>
//         <button onClick={() => navigate(-1)}>
//           <FontAwesomeIcon icon={faAngleLeft} size="2x" />
//         </button>
//         <UserInfoWrapT>
//           <UserInfoImage>
//             <FontAwesomeIcon icon={faCircleUser} size="6x" />
//           </UserInfoImage>
//           <UserName>{name || "-"}</UserName>
//         </UserInfoWrapT>
//       </UserInfoWrap>

//       <Section mHeight="100px;">
//         <SectionTop>
//           <SectionTitle>나의 정보</SectionTitle>
//         </SectionTop>
//         {/* 사용자 정보 표시 */}
//         <SectionSub>
//           <b>Email :</b> {email}
//         </SectionSub>
//         <SectionSub>
//           <b>TEL :</b> {phone}
//         </SectionSub>
//       </Section>
//       <Section mHeight="150px;">
//         <SectionTitleS>지출 목표 설정</SectionTitleS>
//         <InputContainerWrap>
//           <InputContainer>
//             <InputBox
//               placeholder="YEAR"
//               value={yearGoal}
//               onChange={(e) => setMonthGoal(e.target.value)} // 입력값 상태로 저장
//             />
//             <InputBox
//               placeholder="MONTH"
//               value={monthGoal}
//               onChange={(e) => setMonthGoal(e.target.value)}
//             />
//             <InputBox
//               placeholder="DAY"
//               value={dayGoal}
//               onChange={(e) => setDayGoal(e.target.value)}
//             />
//           </InputContainer>
//           <GoalButton onClick={handleSetGoal}>설정하기</GoalButton>
//         </InputContainerWrap>
//       </Section>
//       <SubmitButton onClick={handleLogout}>로그아웃</SubmitButton>
//     </Container>
//   );
// }
// export default UserPage;
// Axios 인터셉터를 설정합니다.
axios.interceptors.request.use((config) => {
	const token = localStorage.getItem("authToken"); // 로컬 스토리지에서 토큰을 가져옵니다.
	if (token) {
		config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰을 추가합니다.
	}
	return config;
});

function UserPage({ setGoal }) {
	const [userData, setUserData] = useState({
		userNo: null,
		userEmail: "",
		userPH: "",
		userBudgetMonth: 0,
		userBudgetDay: 0,
		userBudgetWeek: 0,
	});

	const [monthGoal, setMonthGoal] = useState("");
	const [weekGoal, setWeekGoal] = useState("");
	const [dayGoal, setDayGoal] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/user/mypage"
				);

				const {
					userNo,
					username,
					userEmail,
					userPH,
					userBudgetMonth,
					userBudgetDay,
					userBudgetWeek,
				} = response.data;

				setUserData({
					userNo,
					userEmail,
					username,
					userPH,
					userBudgetMonth: userBudgetMonth || 0, // null일 경우 0으로 설정
					userBudgetDay: userBudgetDay || 0, // null일 경우 0으로 설정
					userBudgetWeek: userBudgetWeek || 0, // null일 경우 0으로 설정
				});
			} catch (error) {
				console.error(
					"사용자 정보를 가져오는 중 오류가 발생했습니다:",
					error
				);
			}
		};

		fetchUserData();
	}, []);

	const handleSetGoal = async () => {
		try {
			// 목표 예산을 서버에 전송
			await axios.post(
				"http://localhost:8080/user/updateBudget",
				{
					dailyBudget: dayGoal,
					monthlyBudget: monthGoal,
					weeklyBudget: weekGoal,
				}
			);

			// 전송 후 상태 업데이트 및 페이지 이동
			setGoal({
				week: weekGoal,
				month: monthGoal,
				day: dayGoal,
			});

			navigate("/goal");
		} catch (error) {
			console.error(
				"목표 예산을 설정하는 중 오류가 발생했습니다:",
				error
			);
		}
	};
	const handleLogout = async () => {
		try {
			await axios.post(
				"http://localhost:8080/user/logout",
				{}
			);
			localStorage.removeItem("authToken");
			navigate("/");
		} catch (error) {
			console.error(
				"로그아웃 중 오류가 발생했습니다:",
				error
			);
		}
	};

	return (
		<Container>
			<UserInfoWrap>
				<button onClick={() => navigate(-1)}>
					<FontAwesomeIcon icon={faAngleLeft} size="2x" />
				</button>
				<UserInfoWrapT>
					<UserInfoImage>
						<FontAwesomeIcon
							icon={faCircleUser}
							size="6x"
						/>
					</UserInfoImage>
					<UserName>
						{userData.username
							? `User ${userData.username}`
							: "-"}
					</UserName>
				</UserInfoWrapT>
			</UserInfoWrap>

			<Section mHeight="100px;">
				<SectionTop>
					<SectionTitle>나의 정보</SectionTitle>
				</SectionTop>
				<SectionSub>
					<b>Email :</b> {userData.userEmail || "-"}
				</SectionSub>
				<SectionSub>
					<b>TEL :</b> {userData.userPH || "-"}
				</SectionSub>
				<SectionSub>
					<b>Monthly Budget:</b>{" "}
					{userData.userBudgetMonth.toLocaleString()}원
				</SectionSub>
				<SectionSub>
					<b>Weekly Budget:</b>{" "}
					{userData.userBudgetWeek.toLocaleString()}원
				</SectionSub>
				<SectionSub>
					<b>Daily Budget:</b>{" "}
					{userData.userBudgetDay.toLocaleString()}원
				</SectionSub>
			</Section>

			<Section mHeight="150px;">
				<SectionTitleS>지출 목표 설정</SectionTitleS>
				<InputContainerWrap>
					<InputContainer>
						<InputBox
							placeholder="Month"
							value={monthGoal}
							onChange={(e) => setMonthGoal(e.target.value)}
						/>
						<InputBox
							placeholder="Week"
							value={weekGoal}
							onChange={(e) => setWeekGoal(e.target.value)}
						/>
						<InputBox
							placeholder="DAY"
							value={dayGoal}
							onChange={(e) => setDayGoal(e.target.value)}
						/>
					</InputContainer>
					<GoalButton onClick={handleSetGoal}>
						설정하기
					</GoalButton>
				</InputContainerWrap>
			</Section>

			<SubmitButton onClick={handleLogout}>
				로그아웃
			</SubmitButton>
		</Container>
	);
}

export default UserPage;
