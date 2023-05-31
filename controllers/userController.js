const {User}= require('../models') ;
module.expors = {
// GET all users
async getUsers(req, res){
    try{
        const users = await User.find();
        res.json(users)
    }catch(err){
        res.status(500).json(err);
    }
},

// GET a single user by its _id and populated thought and friend data
// async getSingleUser(req,res){
//     try{
//         const user = await User
//         .findOne({_id:req.params.})
//     }
// }
// POST a new user:


}