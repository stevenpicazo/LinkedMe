import { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import FollowerOptions from '../FollowerOptions';
import gif from '../connection.gif'

const Followers = () => {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const followers = user.followers
    const [sortOption, setSortOption] = useState('')
    const [activeTab, setActiveTab] = useState('followers')

    const handleSortChange = (e) => {
        setSortOption(e.target.value)
    }
    const sortedfollowing = followers.sort((a, b) => {
        switch (sortOption) {
            case 'firstName':
                return a.first_name.localeCompare(b.first_name)
            case 'lastName':
                return a.last_name.localeCompare(b.last_name)
            case 'recentlyAdded':
            default:
            // return moment(b.date_added).format('YYYYMMDDHHmmss') - moment(a.date_added).format('YYYYMMDDHHmmss')
        }
    })

    const handleTabClick = (tab, url) => {
        setActiveTab(tab)
        history.push(url)
    }

    const followingTabStyles = activeTab === 'following' ? {
        color: "#008000",
        paddingBottom: '7px',
        paddingRight: '10px',
        paddingLeft: '10px',
        marginRight: '20px',
        borderBottom: '2px solid #008000'
    } : {
        color: "black",
        borderBottom: 'none',
        paddingRight: '10px',
        paddingLeft: '10px',
        marginRight: '20px',
    }

    const followersTabStyles = activeTab === 'followers' ? {
        color: "#008000",
        paddingBottom: '7px',
        paddingRight: '10px',
        paddingLeft: '10px',
        borderBottom: '2px solid #008000',
        marginRight: '20px',
    } : {
        color: "black",
        borderBottom: 'none',
        paddingRight: '10px',
        paddingLeft: '10px',
        marginRight: '20px'
    }

    return (
        <div className='connections-page-container'>
            <div className='connections-card'>
                <div className='connections-network'>{user.first_name + "'s Network"}</div>
                <div className='connections-tabs'>
                    <span id='following' onClick={() => handleTabClick('following', '/following')}
                        className={activeTab === 'following' ? 'active-tab' : null}
                    >Following</span>
                    <span id='followers' onClick={() => handleTabClick('followers', '/followers')}
                        className={activeTab === 'followers' ? 'active-tab' : null}
                    >Followers</span>
                </div>
                <span className='connections-count'>{followers.length} Followers</span>
                <div className='connections-sort-container'>
                    <label className='connections-sort-label' htmlFor="sortSelect">Sort by:</label>
                    <select className="sort-connections" value={sortOption} onChange={handleSortChange}>
                        <option className='connection-sort-options' value="firstName">First name</option>
                        <option className='connection-sort-options' value="lastName">Last name</option>
                    </select>
                </div>

                {sortedfollowing && sortedfollowing.map(connection => (
                    <>
                        <div className='connections-user-card-container'>
                            <div className='connections-user-card'>
                                <img className='connections-profile-pic' src={connection.profile_picture}></img>
                                <div className='connections-user-info-container'>
                                    <NavLink to={`/profile/${connection.id}`} className='connections-name'>{connection.first_name} {connection.last_name}</NavLink>
                                    <span className='connections-occupations'>{connection.occupation}</span>
                                </div>
                            </div>
                            <FollowerOptions connection={connection} />
                        </div>
                    </>
                ))}


            </div>
            <div className="mainpage-right-side-container">
                <div className='right-side-container'>
                    <img className='connection-img' src={gif}></img>
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
    )
}

export default Followers;