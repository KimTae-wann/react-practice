import { useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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
    <>
      {createPortal(
        <dialog className="modal" ref={alertModalRef}>
          <div className="modal-body">
            <section
              className="modal-close-button"
              onClick={onCloseClickHandler}
            >
              X
            </section>
            <div>{errorMessage}</div>
          </div>
        </dialog>,
        document.querySelector('#modals'),
      )}
    </>
  );
};

export const Confirm = ({ dialogRef, onOkClick, onCloseClick }) => {
  const [confirmMessage, setConfirmMessage] = useState();
  const confirmDialogRef = useRef();

  const handledFromEvents = useRef({ fired: false });

  useImperativeHandle(dialogRef, () => {
    // console.log('alert');
    // dialogRef에게 할당해줄 데이터 들을 반환
    return {
      //showModal: function () {}
      showConfirm(message) {
        setConfirmMessage(message);
        confirmDialogRef.current.showModal();
      },
    };
  });

  const onOkClickHandler = () => {
    handledFromEvents.fired = true;
    confirmDialogRef.current.close();
    onOkClick();
  };

  const onCloseClickHandler = () => {
    handledFromEvents.fired = true;
    confirmDialogRef.current.close();
    onCloseClick();
  };

  const onCloseNative = () => {
    if (!handledFromEvents.fired) {
      onCloseClick();
    }

    handledFromEvents.fired = false;
  };

  return (
    <>
      {createPortal(
        <dialog
          className="modal"
          ref={confirmDialogRef}
          onClose={onCloseNative}
        >
          <div className="modal-body">
            {confirmMessage}
            <section>
              <button
                type="button"
                className="confirm-ok"
                onClick={onOkClickHandler}
              >
                확인
              </button>
              <button
                type="button"
                className="confirm-cancel"
                onClick={onCloseClickHandler}
              >
                취소
              </button>
            </section>
          </div>
        </dialog>,
        document.querySelector('#confirm'),
      )}
    </>
  );
};
