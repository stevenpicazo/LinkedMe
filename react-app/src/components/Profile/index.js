import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetUser } from '../../store/session';
import ComingSoon from '../ComingSoon';
import OpenModaButton from '../OpenModalButton'
import './Profile.css'


const Profile = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()

    const user = useSelector(state => state.session.singleUser)

    useEffect(() => {
        dispatch(thunkGetUser(userId))
            .then((user) => console.log(user))
    }, [dispatch])

    if (!user) return null

    const openModal = () => {
            <OpenModaButton
                modalComponent={<ComingSoon />}
            />
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

                                    <button onClick={openModal} className='profile-connect-button'>
                                        <i class="fa-solid fa-user-plus"></i>
                                        Connect
                                    </button>
                                    <button className='profile-message-button'>Message</button>

                                    {/* <OpenModaButton
                                        className='profile-message-button'
                                        buttonText="Message"
                                        modalComponent={<ComingSoon />}
                                    /> */}
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