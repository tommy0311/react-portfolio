import React, { forwardRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../store/slice/modal";

import { updateResume } from "../store/slice/resume";

const DialogModal = forwardRef((props, ref) => {

  const dispatch = useDispatch();
  const modal = useSelector(state => {
    return state.modal
  });

  if (!modal.payload) {
    return
  }

  switch (modal.payload.name) {
    case "updateReumseOkModal":
    case "deleteWorkModal":
      break

    default:
      return
  }

  const handleClose = () => dispatch(hideModal());

  const handleClickBtn2 = () => {
    switch (modal.payload.name) {
      case "deleteWorkModal":
        dispatch(updateResume(modal.payload.newResume))
        break

      default:
        break
    }
    dispatch(hideModal())
  }

  return (
    <Modal
      show={modal.show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{modal.payload.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className="my-3">
          {modal.payload.message}
        </h2>
      </Modal.Body>
      <Modal.Footer>
        {modal.payload.btn2Label ?
          <Button variant="secondary" size="lg" className="mx-3" onClick={handleClickBtn2}>
            {modal.payload.btn2Label}
          </Button> : null}
        <Button variant="secondary" size="lg" onClick={handleClose}>
          {modal.payload.btn1Label}
        </Button>
      </Modal.Footer>
    </Modal>
  );

})

export default DialogModal;







