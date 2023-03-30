import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkLoadPosts } from '../../store/posts';
import { thunkFollowUser, thunkGetUser, thunkUnfollowUser } from '../../store/session';
import ComingSoon from '../ComingSoon';
import OpenModaButton from '../OpenModalButton'
import './Profile.css'


const Profile = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoaded , setIsLoaded] = useState('')

    const user = useSelector(state => state.session.singleUser)
    const sessionUser = useSelector(state => state.session.user)
    const following = sessionUser.following
    const all_posts = useSelector(state => state.posts?.allPosts)
    const posts = Object.values(all_posts).filter(post => post.user_id == userId)
    const isFollowing = following.find(following => following.id === user?.id)

    const followUser = async (e) => {
        e.preventDefault()
        await dispatch(thunkFollowUser(userId))
        setHasSubmitted(!hasSubmitted)
    }


    const unfollowUser = async (e) => {
        e.preventDefault()
        await dispatch(thunkUnfollowUser(userId))
        setHasSubmitted(!hasSubmitted)
    }

    useEffect(() => {
        dispatch(thunkLoadPosts())
    }, [dispatch])


    useEffect(() => {
        dispatch(thunkGetUser(userId)).then(() => setIsLoaded(true))
    }, [dispatch, userId, hasSubmitted])

    if (!user) return null

    return (
        <div>
            <div className='user-profile-container'>
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
                                    {!isFollowing ?
                                        <button onClick={(e) => followUser(e, userId)} className='profile-connect-button'>
                                            <i class="fa-solid fa-user-plus"></i>
                                            Follow
                                        </button>

                                        : <button onClick={(e) => unfollowUser(e, userId)} className='profile-connect-button'>
                                            <i class="fa-solid fa-user-plus"></i>
                                            Unfollow
                                        </button>


                                    }
                                    {/* <button className='profile-message-button'>Message</button> */}

                                    <OpenModaButton
                                        className='profile-message-button'
                                        buttonText="Message"
                                        modalComponent={<ComingSoon />}
                                    />
                                </div>
                            </div>
                            <div className='profile-info-section-2-container'>
                                <OpenModaButton
                                    buttonText='✎'
                                    className='profile-edit-button'
                                    modalComponent={<ComingSoon />}
                                />
                                <div className='profile-info-section-2'>
                                    <img className='education-pic' src={user.education_picture}></img>
                                    <span className='education-text'>{user.education}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='user-about-card'>
                    <div className='about-card-title'>About</div>
                    <div className='about-card-text'>
                        {user.about}
                    </div>
                </div>
                <div className='user-activity-card'>
                    <div className='activity-card-title'>Activity</div>
                    <div className='activity-card-posts'>
                        <div className='activity-card-subtitle'>{user.first_name} {user.last_name} posted this:</div>
                        <div className='activity-card-posts'>{posts[0]?.post}</div>
                        <div className='activity-card-posts'>{posts[1]?.post}</div>
                    </div>
                </div>
                <div className='user-education-card'>
                    <div className='education-card-title'>Education</div>
                    <div className='education-content'>
                        <img className='educatin-card-pic' src={user.education_picture}></img>
                        <div className='education-card-achievements-container'>
                            <div className='education-card-achievements-info'>
                                <span className='education-card-education'>{user.education}</span>
                                <span className='education-card-studyfield'></span>
                                <span className='education-card-education-year'>{user.education_date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='user-footer-card'>
                <div>
                    <div className='foot-card-logo-container'>
                        <span className="footer-card-logo-section-1">Linked</span>
                        <span className="footer-card-logo-section-2">me</span>
                    </div>
                    <div className='footer-card-row-1'>

                        <span className="footer-language-row-1">React</span>
                        <span className="footer-language-row-1">Redux</span>
                        <span className="footer-language-row-1">NPM</span>
                        <span className="footer-language-row-1">Javascript</span>
                        <span className="footer-card-logo-year">LinkedMe Corporation © 2023</span>

                    </div>
                </div>
                <div className='footer-card-row-2'>
                    <span className="footer-language-row-1">Python</span>
                    <span className="footer-language-row-1">Flask</span>
                    <span className="footer-language-row-1">SQLAlchemy</span>
                </div>
                <div className='footer-card-row-3'>
                    <span className="footer-language-row-1">SQLAlchemy</span>
                    <span className="footer-language-row-1">HTML</span>
                    <span className="footer-language-row-1">CSS</span>
                </div>
                <div className='footer-card-row-4'>
                    <span className="footer-language-row-1">Hosted using Render</span>
                    <span className="footer-language-row-1">Potgres SQL Database</span>
                </div>
                <div className='footer-card-row-5'>

                    <div
                        onClick={() => window.open('https://github.com/stevenpicazo')}
                        className="footer-language-links"><i class="fa-brands fa-github footer-symbol"></i>GitHub
                    </div>
                    <div
                        onClick={() => window.open("https://www.linkedin.com/in/steven-picazo-994042225", "_blank")}
                        className="footer-language-links"><i class="fa-brands fa-linkedin footer-symbol"></i>LinkedIn
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile;