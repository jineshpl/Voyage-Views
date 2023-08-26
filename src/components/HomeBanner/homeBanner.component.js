import React from 'react';
import './homeBanner.style.css';

export const HomeBanner = ({destination}) => (
    <div className="banner-section" id="banner">
        <div className="banner-container container">
            <div className="row">
                <div className="col-md-6">
                    <div className="banner-text-container">
                        <h4>{destination.caption}</h4>
                        <h3>{destination.location}</h3>
                        <h1>{destination.destination}</h1>
                        <a href="/" className="btn banner-btn">Learn More</a>
                    </div>
                </div>
                <div className="col-md-6"></div>
            </div>
        </div>
    </div>
)