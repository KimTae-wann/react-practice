export const Alert = ({ children, dialogRef }) => {
  const onCloseClickHandler = () => {
    dialogRef.current.close();
  };

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-body">
        <section className="modal-close-button" onClick={onCloseClickHandler}>
          X
        </section>
        {children}
      </div>
    </dialog>
  );
};

export const Confirm = ({ children, onOkClick, onCloseClick }) => {
  const onOkClickHandler = () => {
    onOkClick();
  };

  const onCloseClickHandler = () => {
    onCloseClick();
  };

  return (
    <dialog className="modal">
      <div className="modal-body">
        {children}
        <section>
          <button
            type="button"
            className="confirm-ok"
            onClick={onOkClickHandler}
          >
            OK
          </button>
          <button
            type="button"
            className="confirm-cancel"
            onClick={onCloseClickHandler}
          >
            Cancel
          </button>
        </section>
      </div>
    </dialog>
  );
};
