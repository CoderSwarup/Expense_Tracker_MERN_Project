// CreateTransactionModal.js
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useModal from "../../Hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../Common/ToastContainerComponent";
import { CreateNewTransaction } from "../../Store/Actions/IncomeExpenseActions";
export default function CreateTransactionModal({
  setShowTransactionCreationModal,
}) {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.category);
  const { isOpen, openModal, closeModal } = useModal();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("Income");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const { showToast } = useToast();

  //

  useEffect(() => {
    openModal();
  }, []);

  // Filter Category List
  useEffect(() => {
    setFilteredCategories(
      categoryList.filter((category) => category.type === type)
    );
  }, [type, categoryList]);

  const CloseModel = () => {
    closeModal();
    setShowTransactionCreationModal(false);
  };
  // Handle Create Category
  const handleCreate = async () => {
    const selectedCategoryObject = categoryList.find(
      (category) => category.name === selectedCategory
    );
    if (
      [name, type, desc, selectedCategory].some((s) => s.trim() === "") ||
      !date ||
      date === ""
    ) {
      console.log("ee");
      return showToast("All Fields Are Required", "warn");
    }
    setIsDisable(true);
    const data = {
      name,
      createddate: date,
      amount,
      desc,
      category: selectedCategoryObject._id,
    };

    await CreateNewTransaction(data, CloseModel, dispatch);
    setIsDisable(false);
  };

  // Handle Cancel
  const handleCancel = () => {
    // Close the modal if cancel is clicked
    closeModal();
  };

  return createPortal(
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <h1>Create Transaction</h1>
            <InputLabel>
              Transaction Name:
              <InputField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputLabel>
            <InputLabel>
              Transaction Description:
              <textarea
                style={{
                  width: "100%",
                  height: "50px",
                  resize: "none",
                  margin: "5px 0",
                  padding: "5px",
                }}
                type="textarea"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </InputLabel>
            <InputLabel>
              Amount:
              <InputField
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </InputLabel>
            <InputLabel>
              Transaction Type:
              <StyledSelect
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <StyledOption value="Income">Income</StyledOption>
                <StyledOption value="Expense">Expense</StyledOption>
              </StyledSelect>
            </InputLabel>
            <InputLabel>
              Category:
              <StyledSelect
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                <StyledOption value="">Select a category</StyledOption>
                {filteredCategories.map((category) => (
                  <StyledOption key={category._id} value={category.name}>
                    {category.name.length > 10
                      ? `${category.name.slice(0, 9)}...`
                      : category.name}
                  </StyledOption>
                ))}
              </StyledSelect>
            </InputLabel>
            <InputLabel>
              Date:
              <InputField
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </InputLabel>
            <ButtonWrapper>
              <CancelButton onClick={handleCancel} disabled={isDisable}>
                Cancel
              </CancelButton>
              <CreateButton onClick={handleCreate} disabled={isDisable}>
                Create
              </CreateButton>
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

const CreateButton = styled.button`
  padding: 8px 16px;
  background-color: #2ecc71;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const StyledSelect = styled.select`
  margin: 10px 0;
  width: 100%;
  padding: 8px;
  font-size: 16px;

  /* Additional styles for the arrow icon */
`;

const StyledOption = styled.option`
  padding: 8px !important;
  margin: 20px;
`;
