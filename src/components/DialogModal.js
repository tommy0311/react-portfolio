import React, { forwardRef, useState, useImperativeHandle } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const DialogModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true)
    },
    hide() {
      setShow(false)
    }
  }));

  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className="my-3">
          {props.message}
        </h2>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="lg" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );

})

export default DialogModal;







