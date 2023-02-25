// import { useEffect, useState, useRef } from 'react'
// import { useSelector } from 'react-redux'


// const AllComments = ({comment}) => {
//     const [showComments, setShowComments] = useState(false);
//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef();
//     const sessionUser = useSelector(state => state.session.user);

//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true);
//     };

//     const closeMenu = (e) => {
//         setShowMenu(false);
//     };


//     useEffect(() => {
//         if (!showMenu) return;

//         const closeMenu = (e) => {
//             if (!ulRef.current.contains(e.target)) {
//                 setShowMenu(false);
//             }
//         };

//         document.addEventListener("click", closeMenu);
//         return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu]);

//     const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//     return (
//         <div>
//             {showComments && (
//                 <div className='comment-content-container'>
//                     {comment.user_id === sessionUser.id && (
//                         <>
//                             <i onClick={openMenu} className="fa-solid fa-ellipsis"></i>
//                             <div className='comments-content' key={comment.id}>{comment.comment}</div>
//                         </>
//                     )}
//                     {comment.user_id === sessionUser.id && (
//                         <ul className={ulClassName} ref={ulRef}>
//                             <div className='comment-options container'>
// \                                <span>Delete</span>
//                             </div>
//                         </ul>
//                     )}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default AllComments;