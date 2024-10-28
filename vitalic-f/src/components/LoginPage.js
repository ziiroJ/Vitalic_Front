// import React, { useState } from "react";
// import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// // 기존 스타일과 동일하게 유지
// const Section = styled.div`
// 	font-family: "Hanken Grotesk", sans-serif;
// 	background-color: #373737;
// 	width: 100%;
// 	min-height: ${(props) => props.mHeight || "auto"};
// 	margin-bottom: 30px;
// 	color: #fff;
// 	border-radius: 15px;
// 	padding: 20px;
// 	display: flex;
// 	justify-content: space-around;
// 	align-items: center;
// 	box-sizing: border-box;
// 	flex-direction: column;
// 	align-items: stretch;
// 	&:last-child {
// 		margin-bottom: 80px;
// 	}
// 	@media (max-width: 768px) {
// 		padding: 15px;
// 		min-height: ${(props) => props.mHeight || "300px"};
// 	}

// 	@media (max-width: 480px) {
// 		padding: 10px;
// 		min-height: ${(props) => props.mHeight || "200px"};
// 	}
// `;

// const Container = styled.div`
// 	width: 100%;
// 	max-width: 600px;
// 	min-height: 100vh;
// 	margin: 0 auto;
// 	padding: 0 20px;

// 	@media (max-width: 768px) {
// 		padding: 0 15px;
// 	}

// 	@media (max-width: 480px) {
// 		padding: 0 10px;
// 	}
// `;

// const UserInfoWrap = styled.div`
// 	button {
// 		color: #fff;
// 		font-family: "Hanken Grotesk", sans-serif;
// 		border: none;
// 		background-color: transparent;
// 		margin-top: 20px;
// 	}
// `;

// const Logo = styled.p`
// 	font-family: "Hanken Grotesk", sans-serif;
// 	font-weight: bold;
// 	color: #f3a338;
// 	font-size: 5rem;
// 	text-align: center;
// 	margin-bottom: 50px;

// 	@media (max-width: 768px) {
// 		font-size: 4rem;
// 	}

// 	@media (max-width: 480px) {
// 		font-size: 3rem;
// 	}
// `;

// const FormField = styled.div`
// 	position: relative;
// 	width: 100%;
// 	margin-bottom: 30px;
// `;

// const InputField = styled.input`
// 	width: 100%;
// 	font-size: 1rem;
// 	color: #eee;
// 	border: none;
// 	border-bottom: 1px solid #aaaaaa;
// 	padding: 0 0 10px 0;
// 	background: none;
// 	z-index: 5;
// 	margin-top: 20px;

// 	&:focus {
// 		outline: none;
// 		background-color: transparent;
// 	}

// 	&:focus ~ label,
// 	&:valid ~ label {
// 		font-size: 0.85rem;
// 		bottom: 35px;
// 		color: #666;
// 		font-weight: bold;
// 	}

// 	&:focus ~ span,
// 	&:valid ~ span {
// 		width: 100%;
// 	}
// `;

// const InputLabel = styled.label`
// 	position: absolute;
// 	color: #aaa;
// 	left: 0;
// 	font-size: 1.25rem;
// 	font-weight: bold;
// 	bottom: 10px;
// 	transition: all 0.2s;
// 	@media (max-width: 768px) {
// 		font-size: 1rem;
// 	}

// 	@media (max-width: 480px) {
// 		font-size: 0.7rem;
// 	}
// `;

// const InputSpan = styled.span`
// 	display: block;
// 	position: absolute;
// 	bottom: 0;
// 	left: 0;
// 	background-color: #666;
// 	width: 0;
// 	height: 2px;
// 	border-radius: 2px;
// 	transition: width 0.5s;
// `;

// const SubmitButton = styled.button`
// 	width: 100%;
// 	padding: 12px;
// 	background-color: #f3a338;
// 	border: none;
// 	color: white;
// 	font-weight: bold;
// 	border-radius: 30px;
// 	font-size: 1.2rem;
// 	cursor: pointer;
// 	margin-top: 20px;

// 	&:hover {
// 		background-color: #f09000;
// 	}
// `;

// const Guide = styled.span`
// 	font-size: 12px;
// 	text-align: center;
// 	display: flex;
// 	justify-content: center;
// 	margin: 10px;
// 	a {
// 		color: #f09000;
// 		margin-left: 5px;
// 	}
// `;

// function LoginPage() {
// 	const [formData, setFormData] = useState({
// 		email: "",
// 		password: "",
// 	});

// 	const navigate = useNavigate();

// 	const handleChange = (e) => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();

// 		try {
// 			const response = await axios.post(
// 				"http://localhost:8080/user/signin",
// 				{
// 					userEmail: formData.email,
// 					userPw: formData.password,
// 				},
// 				{
// 					withCredentials: true, // 이 위치가 맞습니다
// 				}
// 			);

// 			// 로그인 성공 시 처리
// 			console.log("로그인 성공: ", response.data);
// 			navigate("/home"); // 홈으로 이동
// 		} catch (error) {
// 			console.error("로그인 실패: ", error);
// 			// 오류 처리 추가 (예: 알림 표시)
// 		}
// 	};

// 	return (
// 		<Container>
// 			<UserInfoWrap>
// 				<button onClick={() => navigate(-1)}>
// 					<FontAwesomeIcon icon={faAngleLeft} size="2x" />
// 				</button>
// 				<Logo>Vitalic</Logo>
// 			</UserInfoWrap>
// 			<Section mHeight="350px">
// 				<form onSubmit={handleSubmit}>
// 					<FormField>
// 						<InputField
// 							type="email"
// 							name="email"
// 							value={formData.email}
// 							onChange={handleChange}
// 							required
// 						/>
// 						<InputLabel>이메일</InputLabel>
// 						<InputSpan></InputSpan>
// 					</FormField>
// 					<FormField>
// 						<InputField
// 							type="password"
// 							name="password"
// 							value={formData.password}
// 							onChange={handleChange}
// 							required
// 						/>
// 						<InputLabel>비밀번호</InputLabel>
// 						<InputSpan></InputSpan>
// 					</FormField>
// 					<SubmitButton type="submit">로그인</SubmitButton>
// 					<Guide>
// 						계정이 없으신가요?
// 						<Link to={"/join"}>회원가입</Link>
// 					</Guide>
// 				</form>
// 			</Section>
// 		</Container>
// 	);
// }

// export default LoginPage;
import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// 기존 스타일과 동일하게 유지
const Section = styled.div`
	font-family: "Hanken Grotesk", sans-serif;
	background-color: #373737;
	width: 100%;
	min-height: ${(props) => props.mHeight || "auto"};
	margin-bottom: 30px;
	color: #fff;
	border-radius: 15px;
	padding: 20px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	box-sizing: border-box;
	flex-direction: column;
	align-items: stretch;
	&:last-child {
		margin-bottom: 80px;
	}
	@media (max-width: 768px) {
		padding: 15px;
		min-height: ${(props) => props.mHeight || "300px"};
	}

	@media (max-width: 480px) {
		padding: 10px;
		min-height: ${(props) => props.mHeight || "200px"};
	}
`;

const Container = styled.div`
	width: 100%;
	max-width: 600px;
	min-height: 100vh;
	margin: 0 auto;
	padding: 0 20px;

	@media (max-width: 768px) {
		padding: 0 15px;
	}

	@media (max-width: 480px) {
		padding: 0 10px;
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

const Logo = styled.p`
	font-family: "Hanken Grotesk", sans-serif;
	font-weight: bold;
	color: #f3a338;
	font-size: 5rem;
	text-align: center;
	margin-bottom: 50px;

	@media (max-width: 768px) {
		font-size: 4rem;
	}

	@media (max-width: 480px) {
		font-size: 3rem;
	}
`;

const FormField = styled.div`
	position: relative;
	width: 100%;
	margin-bottom: 30px;
`;

const InputField = styled.input`
	width: 100%;
	font-size: 1rem;
	color: #eee;
	border: none;
	border-bottom: 1px solid #aaaaaa;
	padding: 0 0 10px 0;
	background: none;
	z-index: 5;
	margin-top: 20px;

	&:focus {
		outline: none;
		background-color: transparent;
	}

	&:focus ~ label,
	&:valid ~ label {
		font-size: 0.85rem;
		bottom: 35px;
		color: #666;
		font-weight: bold;
	}

	&:focus ~ span,
	&:valid ~ span {
		width: 100%;
	}
`;

const InputLabel = styled.label`
	position: absolute;
	color: #aaa;
	left: 0;
	font-size: 1.25rem;
	font-weight: bold;
	bottom: 10px;
	transition: all 0.2s;
	@media (max-width: 768px) {
		font-size: 1rem;
	}

	@media (max-width: 480px) {
		font-size: 0.7rem;
	}
`;

const InputSpan = styled.span`
	display: block;
	position: absolute;
	bottom: 0;
	left: 0;
	background-color: #666;
	width: 0;
	height: 2px;
	border-radius: 2px;
	transition: width 0.5s;
`;

const SubmitButton = styled.button`
	width: 100%;
	padding: 12px;
	background-color: #f3a338;
	border: none;
	color: white;
	font-weight: bold;
	border-radius: 30px;
	font-size: 1.2rem;
	cursor: pointer;
	margin-top: 20px;

	&:hover {
		background-color: #f09000;
	}
`;

const Guide = styled.span`
	font-size: 12px;
	text-align: center;
	display: flex;
	justify-content: center;
	margin: 10px;
	a {
		color: #f09000;
		margin-left: 5px;
	}
`;

function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:8080/user/signin",
				{
					userEmail: formData.email,
					userPw: formData.password,
				},
				{
					withCredentials: true,
				}
			);

			// 로그인 성공 시 JWT를 로컬 스토리지에 저장
			const token = response.data.token; // 서버에서 받은 JWT
			localStorage.setItem("authToken", token); // 로컬 스토리지에 저장

			console.log("로그인 성공: ", response.data);
			navigate("/home"); // 홈으로 이동
		} catch (error) {
			console.error("로그인 실패: ", error);
			// 오류 처리 추가 (예: 알림 표시)
		}
	};

	return (
		<Container>
			<UserInfoWrap>
				<button onClick={() => navigate(-1)}>
					<FontAwesomeIcon icon={faAngleLeft} size="2x" />
				</button>
				<Logo>Vitalic</Logo>
			</UserInfoWrap>
			<Section mHeight="350px">
				<form onSubmit={handleSubmit}>
					<FormField>
						<InputField
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<InputLabel>이메일</InputLabel>
						<InputSpan></InputSpan>
					</FormField>
					<FormField>
						<InputField
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<InputLabel>비밀번호</InputLabel>
						<InputSpan></InputSpan>
					</FormField>
					<SubmitButton type="submit">로그인</SubmitButton>
					<Guide>
						계정이 없으신가요?
						<Link to={"/join"}>회원가입</Link>
					</Guide>
				</form>
			</Section>
		</Container>
	);
}

export default LoginPage;
