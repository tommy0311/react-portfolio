import React, { forwardRef, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../store/slice/modal";

import { updateResume } from "../store/slice/resume";

const EditRawModal = forwardRef((props, ref) => {

  const dispatch = useDispatch();
  const modal = useSelector(state => {
    return state.modal
  });
  const resumeBodyRef = useRef("")

  const resume = useSelector(state => {
    return state.resume
  });
  const resumePayload = resume.payload

  if (!modal.payload || !resumePayload) {
    return
  }

  switch (modal.payload.name) {
    case "editRawModal":
      break

    default:
      return
  }

  const handleClose = () => dispatch(hideModal());

  const handleClickBtn2 = () => {
    const newResumePayload = JSON.parse(JSON.stringify(resumePayload));

    //console.log("22222 " + JSON.stringify(event.target.value))
    newResumePayload.body = resumeBodyRef.current;
    //console.log("111111111 " + JSON.stringify(newResumePayload.body))
    dispatch(updateResume(newResumePayload))
    dispatch(hideModal())
  };

  const handleInputChange = (event) => {
    resumeBodyRef.current = JSON.parse(event.target.value)
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
        <textarea
          className="mt-4 p-3"
          style={{
            width: "100%",
            textAlign: "left",
            backgroundColor: "transparent",
            borderColor: "black",
            fontSize: "20px",
          }}
          rows="8"
          defaultValue={JSON.stringify(modal.payload.message.body)}
          onChange={event => handleInputChange(event)}
        />
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

export default EditRawModal;







