import React from 'react';
import "./styles.css";
import NavBar from '../components/navBar/navBar.component';
import CreateTimeline from './CreateTimeline';
import {HomeBanner} from '../components/HomeBanner/homeBanner.component';
import {Footer} from '../components/footer/footer.component';
import {SearchSection} from '../components/SearchSection/searchSection.component.js';
import { getDestinations } from '../actions/destination';


class TimeLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: [],
            destination: [],
            destinationList: [],
            user: this.props.user
        }; 
    }

    componentDidMount(){
        getDestinations(this);
    }

    handleChange = (event)=> {
        // event is button, event.target.value is the button value
        const target = event.target
        const value = target.value
        const name = target.name
        if(name === "rating"){
            const rat = this.state.rating
            if (rat.includes(parseInt(value))) {
                const new_rat = rat.filter(d => d !== parseInt(value))
                this.setState({rating: new_rat})
            } else {
                this.setState({rating: [...rat, parseInt(value)]})
            }
           
        } else {
            const dest = this.state.destination
            if (dest.includes(value)) {
                const new_dest = dest.filter(d => d !== value)
                this.setState({destination: new_dest})
            } else {
                this.setState({destination: [...dest, value]})
            }

        }
    };

    randomClicked = () =>{
        this.setState({
            destination: [this.state.destinationList[Math.floor(Math.random()*this.state.destinationList.length)]]
        });
    }

    reset = () => {
        this.setState({
            destination: [],
            rating: []
        })
    }


    render(){
        // select box can be put in seperate component which grabs all destinations

        let destinationBanner = {
            id: 2,
            destination: "Toronto",
            rating: 3,
            caption: "I did not expect the CN tower to be this big!",
            location: "CN Tower",
            img: "https://smartcdn.prod.postmedia.digital/nationalpost/wp-content/uploads/2021/01/CN-Tower-2.png",
            user: "user",
            likes: 13,
            comments: []
        };

        return <div className="timeline">
            <NavBar user={this.state.user}/>

            <HomeBanner destination={destinationBanner} />
            
            <SearchSection destinationList={this.state.destinationList} destination={this.state.destination} rating={this.state.rating} handleChange={this.handleChange} randomClicked={this.randomClicked} />

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
                            <CreateTimeline destination = {this.state.destination} rating = {this.state.rating} username={this.state.user ? this.state.user.username : ''}/>
                        </div>
                    </div>
                </div>
            </div>

            <Footer user={this.state.user} />
        </div>
    }
}

// put these in seperate react components later


export {TimeLine as default};