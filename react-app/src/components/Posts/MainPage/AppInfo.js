import React, { useState } from "react"
import './AppInfo.css'

const maxFeatures = 2

const AppInfo = () => {
    const [showAllFeatures, setShowAllFeatures] = useState(false)

    const toggleShowAllFeatures = () => {
        setShowAllFeatures(!showAllFeatures)
    }

    const appFeatures = [
        {
            title: "Posts",
            description: "Share your thoughts and ideas with your network",
        },
        {
            title: "Comments",
            description: "Engage in meaningful discussions and exchange ideas",
        },
        {
            title: "Likes (coming soon)",
            description: "Engage with other users bt like each other posts",
        },
        {
            title: "Network (coming soon)",
            description: "Connect with users by following each other",
        }
    ]

    return (
        <div className="mainpage-right-side-container">
            <div className={`app-info-container ${showAllFeatures ? "show-all" : ""}`}>
                <div className="app-info-title">About LinkedMe</div>
                <div className="app-info">
                    LinkedMe is a professional social network used for networking and job
                    searching. It helps individuals showcase their skills, education, and
                    experience.
                </div>
                {appFeatures.slice(0, showAllFeatures ? appFeatures.length : maxFeatures).map((feature) => (
                    <div className="app-info-feature" key={feature.title}>
                        <li className="feature-title">{feature.title}</li>
                        <div className="feature-description">{feature.description}</div>
                    </div>
                ))}
                <div className="toggle-features-container">
                    {appFeatures.length > maxFeatures && (
                        <button className="toggle-features-button" onClick={toggleShowAllFeatures}>
                            {showAllFeatures ? "Show Less " : "Show More "}
                            <i className={`fa-solid ${showAllFeatures ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                        </button>
                    )}
                </div>
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
    )
}

export default AppInfo;
