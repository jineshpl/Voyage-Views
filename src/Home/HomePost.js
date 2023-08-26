import React, { Component } from 'react'
import '../stylesheet.css';
import '../CreatePost/styles.css';

// Code token from Post.js 
// Make component for post object
class HomePost extends Component {
    
    render() {
        const post = this.props.post
        return (
            <div className="postObject">
                <img className="postImage" alt="" src={post.img}/>
                <div className="infoContainer2">
                <h6 id="user2">{post.user}</h6>
                <span id="dest2"><strong> {post.destination} </strong></span>
                <span id="location2"> {post.location} </span>
                </div>
                <div className="captionContainer">
                <p id="caption2">{post.caption}</p>
                {post.rating === 1 && <span className="rating2"> ★✰✰✰✰ </span>}
                {post.rating === 2 && <span className="rating2"> ★★✰✰✰ </span>}
                {post.rating === 3 && <span className="rating2"> ★★★✰✰ </span>}
                {post.rating === 4 && <span className="rating2"> ★★★★✰ </span>}
                {post.rating === 5 && <span className="rating2"> ★★★★★ </span>}
                </div>

            </div>
        )
    }
}

export {HomePost as default}