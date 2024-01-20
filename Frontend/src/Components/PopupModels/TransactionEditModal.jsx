import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useModal from "../../Hooks/useModal";
import useToast from "../Common/ToastContainerComponent";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTransaction } from "../../Store/Actions/IncomeExpenseActions";

export default function TransactionEditModal({ transactionInfo, setShow }) {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.category);
  const { showToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();
  const [name, setName] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    transactionInfo.category.name
  );

  const [desc, setDesc] = useState("");

  const CloseAllModels = () => {
    closeModal();
    setShow(false);
  };

  useEffect(() => {
    openModal();
  }, []);

  useEffect(() => {
    setFilteredCategories(
      categoryList.filter((category) => category.type === transactionType)
    );
  }, [transactionType, categoryList]);

  useEffect(() => {
    setName(transactionInfo.name);
    setPrice(transactionInfo.amount);
    setDate(transactionInfo.createddate.split("T")[0]);
    setTransactionType(
      transactionInfo.category.type === "Income" ? "Income" : "Expense"
    );
    setDesc(transactionInfo.desc);
  }, [transactionInfo]);

  const handleEdit = async () => {
    const selectedCategoryObject = categoryList.find(
      (category) => category.name === selectedCategory
    );

    const OldDate = transactionInfo.createddate.split("T")[0];
    if (
      transactionInfo.name === name &&
      transactionInfo.amount === price &&
      OldDate === date &&
      selectedCategoryObject._id === transactionInfo.category._id &&
      transactionInfo.desc === desc
    ) {
      return showToast("No Any Data Change", "info");
    }
    setIsDisable(true);
    const data = {
      name,
      createddate: date,
      amount: price,
      desc,
      category: selectedCategoryObject._id,
    };

    await UpdateTransaction(
      transactionInfo._id,
      data,
      dispatch,
      CloseAllModels
    );

    setIsDisable(false);
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
              Transaction Type:{" "}
              <select
                className="StyledSelect"
                value={transactionType}
                onChange={(e) => {
                  setTransactionType(e.target.value);
                }}
              >
                <option className="StyledOption" value="Income">
                  Income
                </option>
                <option className="StyledOption" value="Expense">
                  Expense
                </option>
              </select>
            </InputLabel>

            <InputLabel>
              Category:
              <select
                className="StyledSelect"
                value={selectedCategory}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setSelectedCategory(e.target.value);
                }}
              >
                <option className="StyledOption" value="">
                  Select a category
                </option>
                {filteredCategories.map((category) => (
                  <option
                    className="StyledOption"
                    key={category._id}
                    value={category.name}
                  >
                    {category.name.length > 10
                      ? `${category.name.slice(0, 9)}...`
                      : category.name}
                  </option>
                ))}
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
              <CancelButton disabled={isDisable} onClick={CloseAllModels}>
                Cancel
              </CancelButton>
              <EditButton disabled={isDisable} onClick={handleEdit}>
                Edit
              </EditButton>
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
