import { useEffect, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { connectionThunk, thunkGetUser } from '../../store/session';
import './Connections.css'
import ConnectionOptions from './ConnectionOptions';

const Connections = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [sortOption, setSortOption] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const user = useSelector(state => state.session.user)
    console.log('user', user)
    const { userId } = useParams()

    useEffect(() => {
        dispatch(thunkGetUser(userId)).then(() => setIsLoaded(true));
    }, [dispatch, userId])


    const handleFollow = async (userId) => {
        await dispatch(connectionThunk(userId))
        history.push(`/connections/${userId}`)
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value)
    }

    const sortedConnections = user.connections.sort((a, b) => {
        switch (sortOption) {
            case 'firstName':
                return a.first_name.localeCompare(b.first_name)
            case 'lastName':
                return a.last_name.localeCompare(b.last_name)
            //   case 'recentlyAdded':
            //   default:
            // return b.date_added.localeCompare(a.date_added)
        }
    })

    // console.log('sorted',sortedConnections)

    return (
        <>
            {!isLoaded && <div>Loading...</div>}
            {isLoaded && (
                <div className='connections-page-container'>
                    <div className='connections-card'>
                        <span className='connections-count'>{user.connections.length} Connections</span>
                        <div className='connections-sort-container'>
                            <label className='connections-sort-label' htmlFor="sortSelect">Sort by:</label>
                            <select className="sort-connections" value={sortOption} onChange={handleSortChange}>
                                <option className='connection-sort-options' value="firstName">First name</option>
                                <option className='connection-sort-options' value="lastName">Last name</option>
                            </select>
                        </div>

                        {sortedConnections && sortedConnections.map(connection => (
                            <>
                                <div className='connections-user-card-container'>
                                    <div className='connections-user-card'>
                                        <img className='connections-profile-pic' src={connection.profile_picture}></img>
                                        <div className='connections-user-info-container'>
                                            <NavLink to={`/profile/${connection.id}`} className='connections-name'>{connection.first_name} {connection.last_name}</NavLink>
                                            <span className='connections-occupations'>{connection.occupation}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleFollow(connection.id)}>
                                        {user.connections.includes(connection.id)
                                            ? ""
                                            : 'unfollow'}
                                    </button>
                                </div>
                            </>
                        ))}
                    </div>

                    <div className="mainpage-right-side-container">
                        <div className='right-side-container'>
                            <img className='connection-img' src='https://connectedinvestors.com/blog/wp-content/uploads/2018/05/Connect-with-Motivated-Sellers-How-to-Use-Text-Social.gif'></img>
                        </div>
                        <div className="languages-used-container">
                            <div className="languages-row">
                                <span className="language">Python</span>
                                <span className="language">Flask</span>
                                <span className="language">SQLAlchemy</span>
                            </div>
                            <div className="languages-row">
                                <span className="language">React</span>
                                <span className="language">Redux</span>
                                <span className="language">NPM</span>
                                <span className="language">Javascript</span>
                            </div>
                            <div className="languages-row">
                                <span className="language">HTML</span>
                                <span className="language">CSS</span>
                            </div>
                            <div className="languages-row">Hosted using Render</div>
                            <div className="linkedMe-text-logo-container">
                                <span className="linked">Linked</span>
                                <span className="me">me</span>
                                <span className="linkedme-me-year">LinkedMe Corporation © 2023</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Connections;