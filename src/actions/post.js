// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

// function to send GET request to the web server

export const getPosts = (postsList) => {

    const url = `${API_HOST}/posts`

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
        // console.log(json) // json.posts is undefined
        postsList.setState({postsList: json});
    }).catch(error => {
        console.log(error)
    })
}

export const addComment = (formComp) => {
    // url for request, need to add post id
    const id = formComp.state.id
    const url = `${API_HOST}/posts/${id}`


    // data we are going to send in our request
    const comment = {username: formComp.props.username, content: formComp.state.comment}


    // create request constructor with parameters
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(comment),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
        // Send the request with fetch()
        fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                // comment was added 
            } else {
                // server couldn't add the comment, tell the user.
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const addLike = (formComp) => {
    const id = formComp.state.id
    const url = `${API_HOST}/posts/${id}`
    const likes = formComp.state.likes

    const request = new Request(url, {
        method: "patch",
        body: JSON.stringify(likes),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request).then(function(res){
        if (res.status === 200){
            // like was added
        }
        else {
            alert("Post wasn't liked")
        }
    })
}