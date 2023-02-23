
import React from 'react';
import UpdatePost from '.';
import { useModal } from '../../../context/Modal';


function UpdatePostModal({
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(<UpdatePost />);
        if (onButtonClick) onButtonClick();
    };

    return (
        <>
        <div className='edit-icon-container'>
            <i onClick={onClick} className="fa-solid fa-pencil"></i>
            <span className='edit-icon-tag'>Edit</span>
        </div>
        </>
    );
}

export default UpdatePostModal;
