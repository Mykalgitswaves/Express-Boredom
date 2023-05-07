const  User  = require('../models/user.schemas');

const createCtrl = {
    // Create a user if one does not exist already;
    createUser: async function(formData) {
        await User.sync()
        User.create({
            fullName: formData.name,
            email: formData.username,
            password: formData.password,
            YOE: formData.YOE,
        });
    },
    getAllUsers: async function() {
        const users = await User.findAll()
        if(!users) {
            return console.log('no users');
        }
    },
    signIn: async function(formData) {
        const data = formData;
    
        const user = await User.findOne({ where: { 
          email: data.email
    }});
        console.log(user)
        return user
    },
    getSessionUser: async function(email) {
        const signedInUser = await User.findOne({ where: {
            email: email
        }})
        return signedInUser
    }
}

module.exports = createCtrl