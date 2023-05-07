const  User  = require('../models/user.schemas');
const bcrypt = require("bcrypt");

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
        // Auth block.
        try {
            const user = await User.findOne({ where: { 
            email: data.email
            }});
            
            if(!user) {
                throw new Error("user not found");
            }

            const passwordMatch = bcrypt.compare(data.password, user.password)
            
            if(!passwordMatch) {
                throw new Error("password incorrect");
            }
            // Auth worked
            return user;

        } catch(err) {
            console.log(err)
            throw err
        }
    },
    getSessionUser: async function(email) {
        const signedInUser = await User.findOne({ where: {
            email: email
        }})

        return signedInUser
    },
    encryptPassword: async function(password) {
        const response = await bcrypt.hash(password, 10)
        .then(hash => (hash))
        .catch(err => {
            console.log(err)
            res.send('Invalid password')
        });
        return response
    },
    unEncryptPassword: function(password, hash) {
        bcrypt.compare(password, hash)
        .then(result => {
            return result
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = createCtrl