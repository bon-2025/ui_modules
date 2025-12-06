import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * @param {boolean} show - Whether modal is visible
 * @param {function} onHide - Close modal
 * @param {string} message - Confirmation message
 * @param {function} onConfirm - Function to call if confirmed
 */
export const ConfirmModal = ({ show, onHide, message, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="danger" onClick={() => { onConfirm(); onHide(); }}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};
