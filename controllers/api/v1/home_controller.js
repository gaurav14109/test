const { json } = require('body-parser');
const Post = require('../../../models/post');

const User = require('../../../models/user');



module.exports.home = async function(req, res){

    try{
         // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({ //populating comments from post to all user in post populate user and likes
            path: 'comments',//comment
            populate: {
                path: 'user',//user//further populating user of the comment
             
            },
            populate: {
                path: 'likes'//likes likes of the comment populate.
            }
        })
        .populate('likes');
    
        let users = await User.find({});
        
      return   new Promise((resolve, reject) => {
            console.log('Initial');
            const data = {
                posts:  posts, //also passing post data to home controller.
                all_users: users//passing users data to home controller if user is there
            };
            resolve( res.json(data));
        })
         

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
