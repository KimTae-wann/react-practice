import { useImperativeHandle, useRef, useState } from 'react';

export const Alert = ({ dialogRef }) => {
  const alertModalRef = useRef();
  const [errorMessage, setErrorMessage] = useState();

  /**
   * Props로 전달된 ref에게 DOM이 아닌 함수 객체를 전달하기 위한 방법.
   * 부모 컴포넌트에게 전달해줄 데이터들(함수, 객체, 변수, 상수 등등)
   * 부모에게 전달해줄 데이터들은 props로 전달된 ref에 담아서 전달한다.
   */
  useImperativeHandle(dialogRef, () => {
    console.log('alert');
    // dialogRef에게 할당해줄 데이터 들을 반환
    return {
      //showModal: function () {}
      showModal(message) {
        alertModalRef.current.showModal();
        setErrorMessage(message);
      },
    };
  });

  const onCloseClickHandler = () => {
    alertModalRef.current.close();
  };

  return (
    <dialog className="modal" ref={alertModalRef}>
      <div className="modal-body">
        <section className="modal-close-button" onClick={onCloseClickHandler}>
          X
        </section>
        <div>{errorMessage}</div>
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
