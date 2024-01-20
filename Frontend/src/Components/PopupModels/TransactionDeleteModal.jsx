import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useModal from "../../Hooks/useModal";
import { DeleteTranSaction } from "../../Store/Actions/IncomeExpenseActions";
import { useDispatch } from "react-redux";

export default function TransactionDeleteModal({
  transactoninfo,
  setShowDeleteModal,
}) {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  const [isDisable, setIsDisable] = useState(false);
  useEffect(() => {
    openModal();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsInputValid(true);
  };

  const CloseModals = () => {
    closeModal();
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    // Validate the category name
    if (inputValue.toLowerCase() === transactoninfo.name.toLowerCase()) {
      // Close the modal after successful deletion\
      setIsDisable(true);
      await DeleteTranSaction(transactoninfo._id, dispatch, CloseModals);
      setIsDisable(false);
    } else {
      // Show an error message if the category name is incorrect
      setIsInputValid(false);
    }
  };

  return createPortal(
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <h1>Delete Trancation</h1>
            <p>
              Are you sure you want to delete Transaction{" "}
              <b>{transactoninfo.name}</b>?
            </p>
            <InputLabel>
              Transaction Name:{" "}
              <InputField
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </InputLabel>
            {!isInputValid && (
              <ErrorMessage>Incorrect category name</ErrorMessage>
            )}
            <ButtonWrapper>
              <CancelButton disabled={isDisable} onClick={CloseModals}>
                Cancel
              </CancelButton>
              <DeleteButton disabled={isDisable} onClick={handleDelete}>
                Delete
              </DeleteButton>
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
  p {
    font-size: 15px;
  }
`;

const InputLabel = styled.label`
  font-size: 16px;
  display: block;
  margin-top: 8px;

  text-align: left;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  margin-top: 5px;
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

const DeleteButton = styled.button`
  padding: 8px 16px;
  background-color: #e74c3c;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`;
