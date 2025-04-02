import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function ContextualToast({ showToast, toggleShowToast, variant, message }) {

  return (

        <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }} >
          <Toast onClose={() => toggleShowToast(false)} show={showToast} delay={5000} bg={variant} autohide>
            <Toast.Header>
                <strong className="me-auto">Side-Quests Badge Sync</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
 
  );
}

export default ContextualToast;