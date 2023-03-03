// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { thunkLoadConnections } from '../../store/connections'
// import './Connections.css'

// const Connections = () => {
//     const dispatch = useDispatch()
//     const user = useSelector(state => state.session.user)
//     console.log('users -->', user)


//     useEffect(() => {
//         if (user) {
//             dispatch(thunkLoadConnections(user.id));
//         }
//     }, [dispatch, user])

//     return (
//         <div></div>
//     )
// }

// export default Connections;