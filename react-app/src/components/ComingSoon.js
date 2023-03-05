import { useModal } from "../context/Modal"

const ComingSoon = () => {
    const { closeModal } = useModal()
   
    return (
        <div className='coming-soon-container'>
            <h1 className="coming-soon-title">
                Feature Coming Soon!
            </h1>
            <button onClick={closeModal} className='coming-soon-modal-exit'>
                Return
            </button>
        </div>
    )
}

export default ComingSoon;