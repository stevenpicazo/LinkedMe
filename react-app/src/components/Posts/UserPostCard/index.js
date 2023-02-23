import './UserPostCard.css'

const UserPostCard = ({ post }) => {
    return (
        <div className="feed-container">
            <div className="create-post-container">
            </div>
            <div className="user-post">
                <div className="post-header">
                    <img src="" alt="Profile Image" className="profile-image">
                        
                    </img>
                    <div className="post-info">
                        <h3 className="user-name">User Name</h3>
                        <span className="post-date">Post Date</span>
                    </div>
                </div>
                <div className="post-body">
                    <div>{post.post}</div>
                </div>
                <div className="post-image">
                </div>
            </div>
        </div>
    )
}

export default UserPostCard;