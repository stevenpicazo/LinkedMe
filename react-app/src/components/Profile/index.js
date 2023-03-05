import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunkCreateConnection, thunkGetUser, thunkLoadConnections } from '../../store/session';
import './Profile.css'


const Profile = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { userId } = useParams()

    const user = useSelector(state => state.session.singleUser)
    const sessionUser = useSelector(state => state.session.user)
    const connections = useSelector(state => state?.session?.connections)
    const isConnected = connections?.find(connection => connection?.id === user?.id)
    console.log('connected', isConnected)
    useEffect(() => {
        dispatch(thunkGetUser(userId))
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(thunkLoadConnections(userId));
    // }, [dispatch, userId]);


    if (!user) return null

    const createConnection = async (e) => {
        dispatch(thunkCreateConnection(userId))
        history.push('/connections')
    }

    return (
        <div>
            <div className='user-profile-container'>
                {/* {
                    console.log('user', user)

                } */}
                <div className='user-profile-card'>
                    <div className='profile-card-content'>
                        <img className='profile-background' src={user.background_picture}></img>
                        <img className='profile-card-picture' src={user.profile_picture}></img>
                        <div className='profile-card-info'>
                            <div className='profile-info-section-1'>
                                <span className='profile-name'>{user.first_name} {user.last_name}</span>
                                <span className='profile-occupation'>{user.occupation}</span>
                                <span className='profile-location'>{user.location}</span>
                                <div className='profile-buttons'>
                                    {!isConnected ? (
                                        <button onClick={createConnection} className='profile-connect-button'>
                                            <i class="fa-solid fa-user-plus"></i>
                                            Connect
                                        </button>
                                    ) : null }
                                    <button className='profile-message-button'>Message</button>
                                </div>
                            </div>
                            <div className='profile-info-section-2'>
                                <img className='education-pic' src={user.education_picture}></img>
                                <span className='education-text'>{user.education}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='user-education-card'>
                    <div className='education-card-title'>Education</div>
                    <div className='education-content'>
                        <img className='educatin-card-pic' src={user.education_picture}></img>
                        <div className='education-achievements'>
                            <span className='education-education'>{user.education}</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Profile;