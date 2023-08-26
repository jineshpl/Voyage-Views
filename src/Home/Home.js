import React from 'react';
import NavBar from '../components/navBar/navBar.component';
import {Footer} from '../components/footer/footer.component';
import {HomeBanner} from '../components/HomeBanner/homeBanner.component';
import {SearchSection} from '../components/SearchSection/searchSection.component.js';
import HomePost from '../Home/HomePost';

import '../components/footer/footer.component.css'
import { getPosts } from '../actions/post';

const destinations = ["Vancouver", "Toronto", "New York", "California"]


export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: [],
            destination: [],
            user: this.props.user
        };
    }

    handleChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        if (name === "rating") {
            const rat = this.state.rating
            if (rat.includes(parseInt(value))) {
                const new_rat = rat.filter(d => d !== parseInt(value))
                this.setState({ rating: new_rat })
            } else {
                this.setState({ rating: [...rat, parseInt(value)] })
            }

        } else {
            const dest = this.state.destination
            if (dest.includes(value)) {
                const new_dest = dest.filter(d => d !== value)
                this.setState({ destination: new_dest })
            } else {
                this.setState({ destination: [...dest, value] })
            }

        }
    };

    randomClicked = () => {
        this.setState({
            destination: [destinations[Math.floor(Math.random() * destinations.length)]]
        });
    }

    render() {

        let destinationBanner = {
            id: 1,
            destination: "Vancouver",
            rating: 4,
            caption: "Vancouver was amazing! Love the mountains and didn't mind the rain",
            location: "Stanely Park",
            img: "https://images.musement.com/cover/0079/95/stanleyp-jpg_header-7894856.jpeg?q=50&fit=crop&auto=format&w=1024&h=400",
            user: "user",
            likes: 98,
            comments: [{user: "user", comment: "This is a nice post right????"}]
        }
        
        return (
            
            <div>
                <NavBar user={this.state.user} />

                <HomeBanner destination={destinationBanner} />

                <SearchSection destination={this.state.destination} rating={this.state.rating} handleChange={this.handleChange} randomClicked={this.randomClicked} />

                <div className="posts-section">
                    <div className="container">
                        <div id="posts-header">
                            <div className="row text-center">
                                <div className="col-md-12">
                                    <h3>Checkout these destinations</h3>
                                </div>
                            </div>
                        </div>
                        <div id="posts">
                            <div className="row">
                                <CreateTimeline destination={this.state.destination} rating={this.state.rating} changePost={this.props.changePost} />
                            </div>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
}


// Code token from timeline
class CreateTimeline extends React.Component{

    state = {
        postList: [] // all posts being displayed
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
                    <HomePost key={p._id} post={p} username = {this.props.username}/>
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
                        <HomePost key={p._id} post={p} username = {this.props.username}/>
                    </div>
                </div>
            )
            }
                
        } else if(destination.length !== 0 && rating.length === 0 ){
            const desPost = this.state.postList.filter((p)=> {
                return destination.includes(p.destination)
            })
            if(desPost.length === 0){
                return <div className = "noDest">There are no destinations for your current selection</div>
            } else {
                return desPost.map((p)=>
                <div key={'post-col-' + Math.random()} className="col-md-4 col-sm-6">
                    <div className="post">
                        <HomePost key={p._id} post={p} username = {this.props.username}/>
                    </div>
                </div>
            )
            }
        } else{
            const filtered = this.state.filter((p)=>{
                return rating.includes(p.rating) && destination.includes(p.destination)
            })
            if(filtered.length === 0){
                return <div className = "noDest">There are no destinations for your current selection</div>
            } else {
                return filtered.map((p)=>
                <div key={'post-col-' + p._id} className="col-md-4 col-sm-6">
                    <div className="post">
                        <HomePost key={p._id} post={p} username = {this.props.username}/>
                    </div>
                </div>
            )

            }

        }
    }
}

export default Home
