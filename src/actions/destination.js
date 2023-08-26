// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

// function to send GET request to the web server

export const getDestinations = (destinationList) => {

    const url = `${API_HOST}/destination`

    // call fetch on URL
    fetch(url).then(res =>{
        if(res.status === 200){
            // return promise that resolves with JSON body
            return res.json();
        } else {
            alert("Could not get posts")
        }
    }).then(json =>{
        // resolves promise with JSON body
        destinationList.setState({destinationList: json.map(({ location }) => location)});
    }).catch(error => {
        console.log(error)
    })
}