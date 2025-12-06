import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

const ErrorModal = ({ show, message, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header 
        closeButton 
        style={{ backgroundColor: '#dc3545', color: 'white' }}
      >
        <Modal.Title>
          <ExclamationTriangleFill className="me-2" />
          Form Error
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ fontSize: "1.1rem", color: "#333" }}>
        {message}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
