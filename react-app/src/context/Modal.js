import React, { useRef, useState, useContext, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children, theme, toggleTheme }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    console.log("closeModal called") // add this line to check if closeModal is being called
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  // Use the theme and toggleTheme props to force a re-render of the modal content
  const contextValue = useMemo(() => ({
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal,
    theme, // add theme prop to the context value
    toggleTheme // add toggleTheme prop to the context value
  }), [modalRef, modalContent, setModalContent, setOnModalClose, closeModal, theme, toggleTheme]);


  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  console.log('Modal closeModal called in Modal.js'); // add this line to check if closeModal is being called
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => {
  const { modalRef, modalContent, setModalContent, setOnModalClose, closeModal, theme, toggleTheme } = useContext(ModalContext);

  // Force a re-render of the modal content when the theme changes
  useEffect(() => {
    setModalContent(modalContent);
  }, [theme]);

  return { modalRef, modalContent, setModalContent, setOnModalClose, closeModal, theme, toggleTheme };
};