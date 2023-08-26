import React from 'react';
import "./styles.css";
import Post from '../CreatePost/Post';
import { getPosts } from '../actions/post';


class CreateTimeline extends React.Component{
    
    state = {
        postsList: [] // all posts being displayed
    }
    componentDidMount(){
        getPosts(this)
    }

    render(){
        if (!this.state.postsList) return '';
        const destination = this.props.destination
        const rating = this.props.rating

        if(destination.length === 0 && rating.length === 0){
            return this.state.postsList.map((p)=>
            <div key={'post-col-' + p._id} className="col-md-4 col-sm-6">
                <div className="post">
                    <Post key={p._id} post={p} username = {this.props.username}/>
                </div>
            </div>
            )
             
        } else if(destination.length === 0){
            const ratedPosts = this.state.postsList.filter((post)=>{
                return rating.includes(post.rating)
            })
            if(ratedPosts.length===0){
                return <div className = "noDest">There are no destinations for your current selection</div>
            } else {
                return ratedPosts.map((p)=>
                <div key={'post-col-' + p._id} className="col-md-4 col-sm-6">
                    <div className="post">
                        <Post key={p._id} post={p} username = {this.props.username}/>
                    </div>
                </div>
            )
            }
                
        } else if(destination.length !== 0 && rating.length === 0 ){
            const desPost = this.state.postsList.filter((p)=> {
                return destination.includes(p.destination)
            })
            if(desPost.length === 0){
                return <div className = "noDest">There are no destinations for your current selection</div>
            } else {
                return desPost.map((p)=>
                <div key={'post-col-' + Math.random()} className="col-md-4 col-sm-6">
                    <div className="post">
                        <Post key={p._id} post={p} username = {this.props.username}/>
                    </div>
                </div>
            )
            }
        } else{
            const filtered = this.state.postsList.filter((p)=>{
                return rating.includes(p.rating) && destination.includes(p.destination)
            })
            if(filtered.length === 0){
                return <div className = "noDest">There are no destinations for your current selection</div>
            } else {
                return filtered.map((p)=>
                <div key={'post-col-' + p._id} className="col-md-4 col-sm-6">
                    <div className="post">
                        <Post key={p._id} post={p} username = {this.props.username}/>
                    </div>
                </div>
            )

            }

        }
    }
}

export {CreateTimeline as default}