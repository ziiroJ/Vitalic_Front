import React, { useState } from "react";
import styled from "styled-components";

// 스타일 컴포넌트 정의
const Form = styled.form`
  width: 300px;
  margin: 20px auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
`;

const Select = styled.select`
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
`;

const Button = styled.button`
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const AdminPage = () => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("deposit"); // deposit(입금), withdrawal(출금)
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // 서버로 데이터를 전송하는 로직
    const transactionData = {
      bankName,
      accountNumber,
      amount,
      transactionType,
      description,
    };

    console.log("Transaction Data:", transactionData);

    // 여기서 API 호출
  };

  return (
    <div>
      <h2>관리자 거래 입력</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>은행 이름:</Label>
          <Input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>계좌 번호:</Label>
          <Input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>거래 금액:</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>거래 유형:</Label>
          <Select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="deposit">입금</option>
            <option value="withdrawal">출금</option>
          </Select>
        </div>
        <div>
          <Label>설명:</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <Button type="submit">거래 추가</Button>
      </Form>
    </div>
  );
};

export default AdminPage;
