import React from 'react';
import Modal from 'react-modal';

const SignUpModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose}
      style={{
        content: {
          width: '300px',
          height: '180px',
          margin: 'auto',
          border: '1px solid #2E1346',
          borderRadius: '24px',
          backgroundColor: '#2E1346',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '1.5rem',
        },
      }}
    >
      <p style={{ color: 'white', fontSize: '16px', lineHeight: '1.2rem', textAlign: 'center', marginTop: '15px' }}>{message}</p>
      <button 
        onClick={onClose}
        style={{
          width: '100%',
          borderRadius: '14px',
          backgroundColor: '#F5367B',
          color: 'white',
          marginTop: 'auto',
          padding: '0.8rem 0',
        }}
      >Close</button>
    </Modal>
  );
};

export default SignUpModal;
