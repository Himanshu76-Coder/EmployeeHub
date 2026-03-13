// Reusable confirmation modal for delete operations
import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  // Don't render if modal is closed
  if (!isOpen) return null;

  return (
    // Overlay with click-to-close functionality
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal content - prevent click propagation */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{title}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{message}</p>
        </div>
        
        {/* Action buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={onClose}
            style={{ padding: '0.6rem 1.5rem' }}
          >
            Cancel
          </button>
          <button 
            className="btn btn-danger" 
            onClick={onConfirm}
            style={{ padding: '0.6rem 1.5rem' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
