import React, { useState } from "react";
import styled from "styled-components"; // 필요없는 줄 삭제
import { useEffect } from "react";

// 여기서 styled-components를 다시 정의하지 않고 임포트한 것을 사용

const FormContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	/* height: 100vh; */
	width: 100%;
	background-color: #f0f0f0;
`;

const Form = styled.form`
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	width: 300px;
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const Title = styled.h2`
	text-align: center;
	color: #333;
`;

const Label = styled.label`
	font-size: 14px;
	color: #555;
`;

const Input = styled.input`
	width: 95%;
	padding: 7px;
	border-radius: 5px;
	border: 1px solid #ccc;
	font-size: 14px;
`;

const Select = styled.select`
	width: 100%;
	padding: 7px;
	border-radius: 5px;
	border: 1px solid #ccc;
	font-size: 14px;
`;

const Button = styled.button`
	padding: 5px;
	background-color: #f3a338;;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	&:hover {
		background-color: #0056b3;
	}
`;

const Divider = styled.hr`
	border: none;
	border-top: 1px dotted #ddd;
	margin: 1px 0;
`;

export {
	FormContainer,
	Form,
	Title,
	Label,
	Input,
	Select,
	Button,
};

const AdminPage = () => {
	//   const [tranDateTime, setTranDateTime] = useState("");

	//   useEffect(() => {
	//     const now = new Date();
	//     const formattedNow = now.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM' 형식
	//     setTranDateTime(formattedNow);
	//   }, []);

	// form 상태 관리
	const [formData, setFormData] = useState({
		bank_name: "",
		balance_amt: "",
		inout_type: "0",
		in_des: "",
		out_des: "",
		out_type: "",
		tran_year: "",
		tran_month: "",
		tran_day: "",
		tran_hour: "",
		tran_minute: "",
		tran_second: "",
		tran_type: "0",
		tran_amt: "",
	});

	useEffect(() => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hour = String(now.getHours()).padStart(2, '0');
		const minute = String(now.getMinutes()).padStart(2, '0');
		const second = String(now.getSeconds()).padStart(2, '0');
		
		setFormData((prevData) => ({
			...prevData,
			tran_year: year,
			tran_month: month,
			tran_day: day,
			tran_hour: hour,
			tran_minute: minute,
			tran_second: second,
		}));
	}, []);

	// 입력값이 변경될 때 상태를 업데이트
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// 폼 제출 시 호출되는 함수 필요 없으면 삭제
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form Data:", formData);

		// 데이터 전송 요청
		fetch("/api/Admin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				alert("데이터가 성공적으로 저장되었습니다.");
				console.log("서버 응답:", data);
			})
			.catch((error) => {
				console.error("데이터 전송 중 오류 발생:", error);
			});
	};

	return (
		<FormContainer>
			<Title>    </Title>
			<Form onSubmit={handleSubmit}>
				<div>
					<Label htmlFor="bank_name">은행명</Label>
					<Input
						type="text"
						id="bank_name"
						name="bank_name"
						value={formData.bank_name}
						onChange={handleChange}
						required
					/>
				</div>

				<Divider />

				<div>
					<Label htmlFor="tran_amt">거래 금액</Label>
					<Input
						type="number"
						id="tran_amt"
						name="tran_amt"
						value={formData.tran_amt}
						onChange={handleChange}
						required
					/>
				</div>

				<Divider />

				<div>
					<Label htmlFor="balance_amt">계좌 잔액</Label>
					<Input
						type="number"
						id="balance_amt"
						name="balance_amt"
						value={formData.balance_amt}
						onChange={handleChange}
						required
					/>
				</div>

				<Divider />

				<div>
					<Label htmlFor="inout_type">입출금 구분</Label>
					<Select
						id="inout_type"
						name="inout_type"
						value={formData.inout_type}
						onChange={handleChange}
						required
					>
						<option value="0">입금</option>
						<option value="1">출금</option>
					</Select>
				</div>

				<Divider />

				<div>
					<Label htmlFor="in_des">입금처</Label>
					<Input
						type="text"
						id="in_des"
						name="in_des"
						value={formData.in_des}
						onChange={handleChange}
					/>
				</div>

				<Divider />

				<div>
					<Label htmlFor="out_des">출금처</Label>
					<Input
						type="text"
						id="out_des"
						name="out_des"
						value={formData.out_des}
						onChange={handleChange}
					/>
				</div>

				<Divider />

				<div>
					<Label htmlFor="out_type">출금처 카테고리</Label>
					<Input
						type="number"
						id="out_type"
						name="out_type"
						value={formData.out_type}
						onChange={handleChange}
						required
					/>
				</div>

				<Divider />

				<div>
					<Label htmlFor="tran_date_time">거래 일자</Label>
					<div style={{ display: "flex", gap: "5px" }}>
						<Input
							type="number"
							name="tran_year"
							placeholder="연도"
							value={formData.tran_year}
							onChange={handleChange}
							min="1900"
							max="2100"
							required
						/>년
						<Input
							type="number"
							name="tran_month"
							placeholder="월"
							value={formData.tran_month}
							onChange={handleChange}
							min="1"
							max="12"
							required
						/>월
						<Input
							type="number"
							name="tran_day"
							placeholder="일"
							value={formData.tran_day}
							onChange={handleChange}
							min="1"
							max="31"
							required
						/>일
					</div>
				</div>

				<Divider />

				<div>
					<Label htmlFor="tran_time">거래 시간</Label>
					<div style={{ display: "flex", gap: "5px" }}>
						<Input
							type="number"
							name="tran_hour"
							placeholder="시간"
							value={formData.tran_hour}
							onChange={handleChange}
							min="0"
							max="23"
							required
						/>시
						<Input
							type="number"
							name="tran_minute"
							placeholder="분"
							value={formData.tran_minute}
							onChange={handleChange}
							min="0"
							max="59"
							required
						/>분
						<Input
							type="number"
							name="tran_second"
							placeholder="초"
							value={formData.tran_second}
							onChange={handleChange}
							min="0"
							max="59"
							required
						/>초
					</div>
				</div>

				<Divider />

				<div>
					<Label htmlFor="tran_type">거래 구분</Label>
					<Select
						id="tran_type"
						name="tran_type"
						value={formData.tran_type}
						onChange={handleChange}
						required
					>
						<option value="0">통장</option>
						<option value="1">카드</option>
					</Select>
				</div>

				<Divider />

				<Button type="submit">저장</Button>
			</Form>
			</FormContainer>
	);
};

export default AdminPage;
