import React, { useState } from "react";
import styled from "styled-components"; // 필요없는 줄 삭제

// 여기서 styled-components를 다시 정의하지 않고 임포트한 것을 사용

const FormContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
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
	width: 100%;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	font-size: 14px;
`;

const Select = styled.select`
	width: 100%;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	font-size: 14px;
`;

const Button = styled.button`
	padding: 10px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	&:hover {
		background-color: #0056b3;
	}
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
		inout_type: "0", // 기본값 '입금' (0)
		in_des: "",
		out_des: "",
		out_type: "",
		tran_date_time: "",
		tran_type: "0", // 기본값 '통장' (0)
		tran_amt: "",
	});

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
		<div>
			<h2>Passbook 데이터 입력</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="bank_name">은행명</label>
					<input
						type="text"
						id="bank_name"
						name="bank_name"
						value={formData.bank_name}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label htmlFor="balance_amt">계좌 잔액</label>
					<input
						type="number"
						id="balance_amt"
						name="balance_amt"
						value={formData.balance_amt}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label htmlFor="inout_type">입출금 구분</label>
					<select
						id="inout_type"
						name="inout_type"
						value={formData.inout_type}
						onChange={handleChange}
						required
					>
						<option value="0">입금</option>
						<option value="1">출금</option>
					</select>
				</div>

				<div>
					<label htmlFor="in_des">입금처</label>
					<input
						type="text"
						id="in_des"
						name="in_des"
						value={formData.in_des}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="out_des">출금처</label>
					<input
						type="text"
						id="out_des"
						name="out_des"
						value={formData.out_des}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="out_type">출금처 카테고리</label>
					<input
						type="number"
						id="out_type"
						name="out_type"
						value={formData.out_type}
						onChange={handleChange}
						required
					/>
				</div>

				{/* <div>
          <Label htmlFor="tran_date_time">거래 일자</Label>
          <Input
            type="datetime-local"
            id="tran_date_time"
            name="tran_date_time"
            value={tranDateTime}
            onChange={(e) => setTranDateTime(e.target.value)}
            required
          />
        </div> */}

				<div>
					<label htmlFor="tran_type">거래 구분</label>
					<select
						id="tran_type"
						name="tran_type"
						value={formData.tran_type}
						onChange={handleChange}
						required
					>
						<option value="0">통장</option>
						<option value="1">카드</option>
					</select>
				</div>

				<div>
					<label htmlFor="tran_amt">거래 금액</label>
					<input
						type="number"
						id="tran_amt"
						name="tran_amt"
						value={formData.tran_amt}
						onChange={handleChange}
						required
					/>
				</div>

				<button type="submit">저장</button>
			</form>
		</div>
	);
};

export default AdminPage;
