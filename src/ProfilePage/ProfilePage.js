import React from 'react';
import NavBar from '../components/navBar/navBar.component';
import './styles.css';
import profile from '../profile.png';
import Post from '../CreatePost/Post';
import {Footer} from '../components/footer/footer.component';
import { getPosts } from '../actions/post';

class ProfilePage extends React.Component {
    render(){
        return(
            <div>
                <div className="profileDiv">
                    <NavBar  user={this.props.user}/>
                        <div className="card flex-row flex-rap profileInfo mt-5">
                            <div className="card-header header">
                                <img className="profileImage"  alt="Profile" src={ profile }/>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-10 text-white">
                                        <h2 className="card-title name text-white">My name is: {this.props.user.firstName + " " + this.props.user.lastName}</h2>
                                        <h6 className="text-white mt-5"> My username is: @{this.props.user.username} {this.props.user.verified ? <i className="fas fa-star"></i> : <small>(Getting Verified Soon)</small>}</h6>
                                    </div>
                                </div>
                                <div className="description">
                                    <h5 className="text-white">A little about myself:</h5>
                                    <p className="card-text text-white">{this.props.user.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row posts">
                            <CreateUserPosts user={this.props.user}/>
                        </div>
                </div>
            <Footer user={this.props.user}/>
            </div>
        )
    }
}

class CreateUserPosts extends React.Component{

    state = {
        postsList: [] // all posts being displayed
    }
    componentDidMount(){
        getPosts(this)
    }
    render(){
        const userPosts = this.state.postsList;
        return userPosts.map((p) => 
            <div key={'post-col-' + p._id} className="col-md-4 col-sm-6">
                <div className="post">
                    <Post key={p.id} post={p} user={this.props.user} username = {this.props.username}/>
                </div>
            </div>
        )
    }
}

export {ProfilePage as default};