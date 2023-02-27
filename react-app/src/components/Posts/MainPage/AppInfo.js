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
        },
    ]

    return (
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
    )
}

export default AppInfo;
