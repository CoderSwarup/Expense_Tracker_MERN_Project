import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useModal from "../../Hooks/useModal";
import useToast from "../Common/ToastContainerComponent";
import { useDispatch } from "react-redux";
import { UpdateCategory } from "../../Store/Actions/CategoryActions";

export default function CategoryEdit({ catinfo, setShowEditModal }) {
  const { showToast } = useToast();
  const distpatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const [name, setName] = useState("");
  const [originalName] = useState(catinfo.name);
  const [categoryType, setCategoryType] = useState(catinfo.type);

  const CloseModals = () => {
    closeModal();
    setShowEditModal(false);
  };
  useEffect(() => {
    openModal();
  }, []);

  useEffect(() => {
    setName(catinfo.name);
  }, [catinfo]);

  const handleEdit = async () => {
    if (name === originalName && categoryType === catinfo.type) {
      return showToast("Nothing Is Change", "warn");
    }

    const Data = {
      newCategoryName: name,
      type: categoryType,
    };

    await UpdateCategory(catinfo._id, Data, distpatch, CloseModals);
  };

  return createPortal(
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <h1>Edit Category</h1>
            <InputLabel>
              Category Name:{" "}
              <InputField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputLabel>
            <InputLabel>
              Category Type:
              <select
                id="cattype"
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
                className="StyledSelect"
              >
                <option className="StyledOption" value="Income">
                  Income
                </option>
                <option className="StyledOption" value="Expense">
                  Expense
                </option>
              </select>
            </InputLabel>
            <ButtonWrapper>
              <CancelButton
                onClick={() => {
                  closeModal();
                  setShowEditModal(false);
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

const ImagePreview = styled.img`
  margin-top: 10px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  align-self: center;
`;
