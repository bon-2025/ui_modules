import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';

const SuccessModal = ({ show, message, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header 
        closeButton 
        style={{ backgroundColor: '#28a745', color: 'white' }}
      >
        <Modal.Title>
          <CheckCircleFill className="me-2" />
          Success
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ fontSize: "1.1rem", color: "#333" }}>
        {message}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
