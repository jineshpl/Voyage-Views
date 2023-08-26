import React from 'react';
//import '../stylesheet.css';
import "./styles.css";
import { Link } from 'react-router-dom';
import { ChatLeftFill, HeartFill, X, ArrowsAngleExpand, Heart} from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { FormControl } from 'react-bootstrap';
import { addComment, addLike } from '../actions/post';

class Post extends React.Component {
    state = {
        expand: false,
        likes: this.props.post.likes,
        comments: this.props.post.comments,
        id: this.props.post._id,
        liked: false,
        comment: "",
        user: this.props.user
    }
    handleChange = (event) =>{
        const value = event.target.value
        this.setState({
            comment: value
        })
    }
    likeClicked= ()=> {
        if (this.state.liked === false){
            const num = this.state.likes + 1
            this.setState({
                likes: num,
                liked: true
            })
        } else {
            const num = this.state.likes - 1
            this.setState({
                likes: num,
                liked: false
            })
        }
        addLike(this);
    }
    exitClicked = () => {
        this.setState({
            expand: false
        })
    }

    expand = ()=> {
        this.setState({
            expand: true
        })
    }

    leaveComment =()=> {
        if(this.state.comment !== ""){
            addComment(this)
            const comments = this.state.comments
            const value = {id: Math.floor(Math.random() * 100), user: this.props.username, comment: this.state.comment}
            this.setState({
                comments: [...comments, value],
                comment: ""
            })
        }
        // send api request to add comment to this post
        
    }

	render(){
        const post = this.props.post
        if(this.state.expand){
            return (<div className="postObject2">
            <div className="postleft">
                <img id="postObjectImage" alt="" src={post.image_url}/>
                <Button id="exit" variant="outline-info" onClick={this.exitClicked}><X/></Button>
                <div id="info">
                    <Link to='/ProfilePage' id="user">{post.username}</Link>
                    <Button id="like" variant="outline-info" onClick={this.likeClicked}>{this.state.likes} {this.state.liked ? <HeartFill/> : <Heart/>}</Button>
                    <span id="dest"><strong> {post.destination} </strong></span>
                    <span id="location"> {post.sightseeingLocation} </span> <br/>
                </div>
                <div id="captionContainer"></div>
                <p id="caption">{post.caption}</p>
                {post.rating === 1 && <span className="rating2"> ★✰✰✰✰ </span>}
                {post.rating === 2 && <span className="rating2"> ★★✰✰✰ </span>}
                {post.rating === 3 && <span className="rating2"> ★★★✰✰ </span>}
                {post.rating === 4 && <span className="rating2"> ★★★★✰ </span>}
                {post.rating === 5 && <span className="rating2"> ★★★★★ </span>}
            </div>
            <div className="commentSection">
                <div className="comments">
                    {this.state.comments.map((c)=>{
                        return (<div key={c._id}className="comment">
                            <img alt = "profile" className ="pp" src="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"/>
                            <span className="commentEl1"> {c.username} </span>
                            <span className = "commentEl2" >{c.content}</span>
                        </div>)
                    })}
                    <div id="leaveComment">
                        <FormControl type="text" placeholder="Type your comment here" id="commentBox" value= {this.state.comment} onChange={this.handleChange}></FormControl>
                        <Button variant="light" id="send" onClick={this.leaveComment}><ChatLeftFill/></Button>
                    </div>
                </div>
            </div>
        </div>)

        } else {
            return (
                <div className="postObject">
                <img className="postImage" alt="" src={post.image_url}/>
                <div className="infoContainer">
                <Link to='/ProfilePage' id="user2">{post.username}</Link><br/>
                <Button id="like2" variant="outline-info" onClick={this.likeClicked}>{this.state.likes} {this.state.liked ? <HeartFill/> : <Heart/>}</Button>
                <span id="dest2"><strong> {post.destination} </strong></span>
                <span id="location2"> {post.sightseeingLocation} </span>
                </div>
                <div className="captionContainer">
                <p id="caption2">{post.caption}</p>
                {post.rating === 1 && <span className="rating2"> ★✰✰✰✰ </span>}
                {post.rating === 2 && <span className="rating2"> ★★✰✰✰ </span>}
                {post.rating === 3 && <span className="rating2"> ★★★✰✰ </span>}
                {post.rating === 4 && <span className="rating2"> ★★★★✰ </span>}
                {post.rating === 5 && <span className="rating2"> ★★★★★ </span>}
                </div>
                <button id="expand" onClick={this.expand}><ArrowsAngleExpand/></button>
                <Button id="commentButton" variant="light" onClick={this.expand}><ChatLeftFill/></Button>

                </div>
            )
        }
    }
}
export {Post as default};
