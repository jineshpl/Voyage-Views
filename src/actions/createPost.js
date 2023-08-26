import ENV from './../config.js'
const API_HOST = ENV.api_host

export const createPost = (form, formComp) => {
    const url = `${API_HOST}/posts`;

    const imageData = new FormData(form);

    // const post = {
    //     destination: formComp.state.destination,
    //     rating: Number(formComp.state.rating),
    //     caption: formComp.state.caption,
    //     sightseeingLocation: formComp.state.sightseeingLocation,
    //     username: formComp.state.user}

    const request = new Request(url, {
        method: "post",
        body: imageData,
        // headers: {
        //     Accept: "application/json, text/plain, */*",
        //     "Content-Type": "application/json"
        // }
    });

    fetch(request).then(function(res){
        if (res.status === 200){
            // Post Added
        }
        else{
            alert("Post couldn't be added")
            // Error: Post couldn't be added. Tell user.
        }
    })
}


