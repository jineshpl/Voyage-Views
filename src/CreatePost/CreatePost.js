import React from 'react';
//import '../stylesheet.css';
import "./styles.css";
import NavBar from '../components/navBar/navBar.component';
import { allPosts } from '../info';
import {Footer} from '../components/footer/footer.component';
import { withRouter } from "react-router-dom";
import { createPost } from '../actions/createPost';

class CreatePost extends React.Component {
    state = {
    	rating: "",
    	destination: "",
    	caption: "",
    	sightseeingLocation: "",
    	img: null,
    	newAttraction: "",
		username: this.props.username,
		submitYourOwn: false,
    	posts: allPosts,
		validate: "needs-validation",
		user: this.props.user
    };

    handleChange = (event)=> {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        });
    };

	handleAttraction = (event)=> {
        const target = event.target
        const value = target.value
		if (value === "Submit Your Own"){
			this.setState({
				submitYourOwn: true,
			});
		} else{
			this.setState({
				submitYourOwn: false,
			});
		}
		this.setState({
			sightseeingLocation: value
		});
    };

	submitAttraction = (event) => {
		//send attraction to admin
	}

    selectImage = (event)=>{
    	const file = event.target.files[0]
    	this.setState({
    		img: URL.createObjectURL(file)
    	});
    };

    createPost = (event)=>{
		event.preventDefault();
		this.setState({
			validate: "needs-validation"
		});
		if (this.state.destination === "" || this.state.rating === "" || this.state.img === null){
			this.setState({
				validate: "was-validated"
			});
		} else{
			createPost(event.target, this);
			// const newPost = {
			// 	id: this.state.id,
			// 	destination: this.state.destination,
			// 	rating: Number(this.state.rating),
			// 	caption: this.state.caption,
			// 	location: this.state.sightseeing,
			// 	img: this.state.img,
			// 	user: this.state.user,
			// 	likes: 0,
			// 	comments: []
			// }
			// if (this.state.submitYourOwn){
			// 	newPost.location = ""
			// }
			// const postsList = this.state.posts;
			// postsList.unshift(newPost);
			// this.setState({
			// 	posts: postsList
			// });
			// this.props.history.push("../TimeLine");
			this.props.history.push("../");
		}	
    };

    render(){
        return(
			<div className="body">
				<NavBar user={this.state.user}/>
				<div className="createPost">
					<form className={this.state.validate} onSubmit={this.createPost} noValidate>
						<h3 className="createPostTitle"> Create New Post</h3>
						<div className="row"> 
							<div className="col-5">
								<div className="form-group p-3">
									<strong>Image</strong>
									<input onChange={this.selectImage} name="image" type="file" className="form-control-file m-2 p-2" required/>
									<div className="invalid-feedback">Please provide an image.</div>
									<img className="postimg" alt="" src={this.state.img}/>
								</div>
							</div>
							<div className="col-7">
								<div className="form-group p-2">
									<strong>Rating</strong>
									<select className="form-control select m-2 p-2 " name = "rating" value = {this.state.rating} onChange={this.handleChange} required>
										<option hidden disabled value = "">Choose...</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
									<div className="invalid-feedback">Please choose a rating.</div>
								</div>
								<div className="form-group p-2">
									<strong>Destination</strong>
									<select className="form-control select m-2 p-2" name = "destination" value = {this.state.destination} onChange={this.handleChange} required>
										<option hidden disabled value = "">Choose...</option>
										<option>Vancouver</option>
										<option>Toronto</option>
										<option>Montreal</option>
										<option>New York</option>
									</select>
									<div className="invalid-feedback">Please pick a destination.</div>
								</div>
								<div className="form-group p-2">
									<strong>Attraction (optional)</strong>
									<select className="form-control select m-2 p-2" name = "sightseeingLocation" value = {this.state.sightseeingLocation} onChange={this.handleAttraction}>
										<option value = "">None</option>
										<option>CN Tower</option>
										<option>Niagara Falls</option>
										<option>Times Square</option>
										<option>Submit Your Own</option>
									</select>
								</div>
								<div className="form-group p-2">
									<strong>Submit Your Own Attraction</strong>
									{!this.state.submitYourOwn ?
										(<textarea className="form-control caption m-2 p-2" rows="1" placeholder="Enter Attraction" onChange={this.handleChange} disabled/>) :
									(<textarea className="form-control caption m-2 p-2" rows="1" placeholder="Enter Attraction" onChange={this.handleChange}></textarea>)}
								</div>
								{!this.state.submitYourOwn ?
										(<button className= "submitButton btn btn-primary" disabled={!this.state.value}>Submit </button>) :
									(<button className= "submitButton btn btn-primary" onClick={this.submitAttraction}>Submit</button>)}
								<div className="form-group p-2 pt-4">
									<strong>Caption</strong>
									<textarea name = "caption" className="form-control caption m-2 p-2" rows="5" placeholder="Enter Caption" onChange={this.handleChange}></textarea>
								</div>
								<button type = "submit" className= "postButton btn btn-primary" value={this.state.caption} name="caption">Post</button>
							</div>
						</div>
					</form>
				</div>
				<Footer user={this.state.user}/>
			</div>
        )
    }
}

export default withRouter(CreatePost);
