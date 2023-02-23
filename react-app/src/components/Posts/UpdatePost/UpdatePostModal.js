
import React from 'react';
// import UpdatePost from '.';
import { useModal } from '../../../context/Modal';
import CreatePost from '../CreatePost';


function UpdatePostModal({
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(<CreatePost />);
        if (onButtonClick) onButtonClick();
    };

    return (
        <div onClick={onClick} className='edit-icon-container'>
            <i className="fa-solid fa-pencil"></i>
            <span className='edit-icon-tag'>Edit</span>
        </div>
    );
}

export default UpdatePostModal;
