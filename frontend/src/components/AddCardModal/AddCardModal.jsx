import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AddCardForm } from "../AddCardForm/AddCardForm";
import {
  BackDrop,
  Modal,
  CloseIcon,
  ModalContainer,
  Title,
} from "./AddCardModal.styled";

export const AddCardModal = ({ onClose, columnId, stayOpen = true }) => {
  const [formKey, setFormKey] = useState(Date.now()); // formu resetlemek için key

  useEffect(() => {
    const handleCloseOnKeydown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleCloseOnKeydown);
    return () => {
      window.removeEventListener("keydown", handleCloseOnKeydown);
    };
  }, [onClose]);

  const handleCloseOnBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const handleCardAdded = (newCardData) => {
    // Eğer formdan gelen data varsa buradan işlem yapabilirsin
    // örn: console.log("Added card", newCardData);

    if (stayOpen) {
      setFormKey(Date.now()); // formu resetle
    } else {
      onClose?.();
    }
  };

  return (
    <BackDrop onClick={handleCloseOnBackdrop}>
      <Modal>
        <ModalContainer>
          <CloseIcon onClick={onClose} />
          <Title>Add card</Title>
          <AddCardForm
            key={formKey}
            onClose={handleCardAdded}
            columnId={columnId}
            stayOpen={stayOpen}
          />
        </ModalContainer>
      </Modal>
    </BackDrop>
  );
};

AddCardModal.propTypes = {
  onClose: PropTypes.func,
  columnId: PropTypes.string.isRequired,
  stayOpen: PropTypes.bool,
};
