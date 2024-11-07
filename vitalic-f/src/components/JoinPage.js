import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Section = styled.div`
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
		border: none;
		background-color: transparent;
		margin-top: 20px;
	}
`;

const Logo = styled.p`
	font-weight: bold;
	color: #f3a338;
	font-size: 5rem;
	text-align: center;
	margin-bottom: 20px;

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

	@media (max-width: 768px) {
		font-size: 0.7rem;
	}

	@media (max-width: 480px) {
		font-size: 0.5rem;
		padding: 0 0 20px 0;
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

// 로그인 페이지 이동 안내
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

function JoinPage() {
	const [formData, setFormData] = useState({
		userEmail: "",
		userPw: "",
		checkedPassword: "",
		userName: "",
		userPH: "",
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

		// 비밀번호와 비밀번호 확인 일치 여부 확인
		if (formData.userPw !== formData.checkedPassword) {
			alert("비밀번호가 일치하지 않습니다.");
			return;
		}

		try {
			// API 호출
			const response = await Promise.race([
				axios.post(
					"http://localhost:8080/user/signup",
					formData,
					{
						headers: {
							"Content-Type": "application/json", // JSON 형식으로 보내는 경우
						},
					}
				),
				axios.post(
					"http://172.16.13.116:8080/user/signup",
					formData,
					{
						headers: {
							"Content-Type": "application/json", // JSON 형식으로 보내는 경우
						},
					}
				),
			]);
			console.log("회원가입 성공:", response.data);
			navigate("/login"); // 회원가입 후 로그인 페이지로 이동
		} catch (error) {
			alert("회원가입 실패:", error);
			console.error("회원가입 실패:", error);
			alert(
				"회원가입 중 문제가 발생했습니다. 다시 시도해주세요."
			);
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
			<Section mHeight="450px">
				<form onSubmit={handleSubmit}>
					<FormField>
						<InputField
							type="email"
							name="userEmail" // 백엔드와 맞춘 필드명
							value={formData.userEmail}
							onChange={handleChange}
							required
						/>
						<InputLabel>이메일</InputLabel>
						<InputSpan></InputSpan>
					</FormField>
					<FormField>
						<InputField
							type="password"
							name="userPw" // 백엔드와 맞춘 필드명
							value={formData.userPw}
							onChange={handleChange}
							required
						/>
						<InputLabel>비밀번호</InputLabel>
						<InputSpan></InputSpan>
					</FormField>
					<FormField>
						<InputField
							type="password"
							name="checkedPassword" // 백엔드와 맞춘 필드명
							value={formData.checkedPassword}
							onChange={handleChange}
							required
						/>
						<InputLabel>비밀번호 확인</InputLabel>
						<InputSpan></InputSpan>
					</FormField>
					<FormField>
						<InputField
							type="text"
							name="userName" // 백엔드와 맞춘 필드명
							value={formData.userName}
							onChange={handleChange}
							required
						/>
						<InputLabel>이름</InputLabel>
						<InputSpan></InputSpan>
					</FormField>
					<FormField>
						<InputField
							type="tel"
							name="userPH" // 백엔드와 맞춘 필드명
							value={formData.userPH}
							onChange={handleChange}
							required
						/>
						<InputLabel>전화번호</InputLabel>
						<InputSpan></InputSpan>
					</FormField>
					<SubmitButton type="submit">확 인</SubmitButton>
					<Guide>
						계정이 이미 있으신가요?
						<Link to={"/login"}>로그인</Link>
					</Guide>
				</form>
			</Section>
		</Container>
	);
}

export default JoinPage;
