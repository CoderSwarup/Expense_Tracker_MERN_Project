import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useModal from "../../Hooks/useModal";
import useToast from "../Common/ToastContainerComponent";

export default function CategoryEdit({ catinfo }) {
  const { showToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();
  const [name, setName] = useState("");
  const [image, setImage] = useState(catinfo.image);
  const [originalName] = useState(catinfo.name);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    openModal();
  }, []);

  useEffect(() => {
    setName(catinfo.name);
  }, [catinfo]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleEdit = () => {
    if (name === originalName) {
      return showToast("Name is the same as the old name", "error");
    }
    closeModal();
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
              Category Image:{" "}
              <InputField
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <ImagePreview src={imagePreview} alt="Category Preview" />
              )}
            </InputLabel>
            <ButtonWrapper>
              <CancelButton onClick={closeModal}>Cancel</CancelButton>
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
