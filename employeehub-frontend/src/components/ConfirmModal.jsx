// Reusable modal for confirming delete actions.
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isDeleting }) => {
  // Do not render anything if the modal is closed.
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop clicks inside the modal from closing it */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{title}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{message}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
            style={{ padding: '0.6rem 1.5rem' }}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
            style={{ padding: '0.6rem 1.5rem' }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
