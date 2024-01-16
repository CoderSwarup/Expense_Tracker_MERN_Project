import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useModal from "../../Hooks/useModal";
import useToast from "../Common/ToastContainerComponent";

export default function TransactionEditModal({ transactionInfo, setShow }) {
  const { showToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();
  const [name, setName] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [originalName] = useState(transactionInfo.name);

  useEffect(() => {
    openModal();
  }, []);

  useEffect(() => {
    setName(transactionInfo.name);
    setPrice(transactionInfo.amount);
    setDate(transactionInfo.createddate.split("T")[0]);
    setTransactionType(transactionInfo.category.type === "Income" ? "0" : "1");
  }, [transactionInfo]);

  const handleEdit = () => {
    // Perform validation and editing logic here
    // For simplicity, let's assume validation passes
    // You should add your own validation logic

    if (name === originalName) {
      return showToast("Name is the same as the old name", "error");
    }

    console.log(transactionType);

    // Close the modal after editing
    // closeModal();
    // setShow(false);
  };

  return createPortal(
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <h1>Edit Transaction</h1>
            <InputLabel>
              Transaction Name:{" "}
              <InputField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputLabel>
            <InputLabel>
              Transaction Type:{" "}
              <select
                value={transactionType}
                onChange={(e) => {
                  setTransactionType(e.target.value);
                }}
              >
                <option value="0">Income</option>
                <option value="1">Expense</option>
              </select>
            </InputLabel>
            <InputLabel>
              Price:{" "}
              <InputField
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputLabel>
            <InputLabel>
              Date:{" "}
              <InputField
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </InputLabel>
            <ButtonWrapper>
              <CancelButton
                onClick={() => {
                  closeModal();
                  setShow(false);
                }}
              >
                Cancel
              </CancelButton>
              <EditButton onClick={handleEdit}>Edit</EditButton>
            </ButtonWrapper>
          </ModalContent>
        </ModalWrapper>
      )}
    </>,
    document.getElementById("popup")
  );
}

const ModalWrapper = styled.div`
  color: #000;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.5); /* semi-transparent black overlay */
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;

  h1 {
    margin: 5px 0;
  }
`;

const InputLabel = styled.label`
  font-size: 16px;
  display: block;
  margin-top: 8px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EditButton = styled.button`
  padding: 8px 16px;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
