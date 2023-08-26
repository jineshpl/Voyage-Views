// put hardcoded users and posts here


const post1 = {
    id: 1,
    destination: "Vancouver",
    rating: 4,
    caption: "Vancouver was amazing! Love the mountains and didn't mind the rain",
    location: "Stanely Park",
    img: "https://images.musement.com/cover/0079/95/stanleyp-jpg_header-7894856.jpeg?q=50&fit=crop&auto=format&w=1024&h=400",
    user: "user",
    likes: 98,
    comments: [{id:1, user: "user", comment: "This is a nice post right????"}]
};

const post2 ={
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

const post3 = {
    id: 3,
    destination: "Montreal",
    rating: 3,
    caption: "Love the fall colours",
    location: "Mount Royal",
    img: "https://www.monicasuma.com/wp-content/uploads/2011/01/IMG_49611.jpg",
    user: "user",
    likes: 1,
    comments: []
}
const post4 = {
    id: 4,
    destination: "New York",
    rating: 5,
    caption: "So many buildings",
    location: "",
    img: "https://cdn.vox-cdn.com/thumbor/0z6MnbiSKqLdLMlBWh-Soxgnlmo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18993323/shutterstock_788608396.jpg",
    user: "user",
    likes: 2,
    comments: []
}

const admin = {
    username: "admin",
    password: "admin",
    firstName: "admin",
    lastName: "admin",
    description: "this is the admin account",
    location: "Toronto",
    profilePic: "profile.png",
    posts: []
};

const user1 = {
    username: "user",
    password: "user",
    firstName: "user",
    lastName: "one",
    description: "I love to travel!",
    location: "Toronto",
    profilePic: "profile.png",
    posts: [post1, post2, post3, post4]
};


const allUsers = [admin, user1]
const allPosts = [post1, post2, post3, post4]

export {user1, allPosts, allUsers, admin} 