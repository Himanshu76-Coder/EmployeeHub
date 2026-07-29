// Reusable modal for confirming delete actions.
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isDeleting }) => {
  // Do not render anything if the modal is closed.
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop clicks inside the modal from closing it */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <div style={{ marginBottom: '0.25rem' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 800,
            color: 'var(--on-surface)',
            marginBottom: '0.625rem',
          }}>
            {title}
          </h3>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9375rem',
            lineHeight: 1.6,
          }}>
            {message}
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          borderTop: '1.5px solid var(--border)',
          marginTop: '1.75rem',
          paddingTop: '1.5rem',
        }}>
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
