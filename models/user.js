import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Account already exists"],
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Please enter your email"],
        minLength: [6, "Your password must be at least 6 characters long"],
        select: false, //dont send back password after request
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    readingList: {
        type: Array,
        required: false        
    }
})

// ENCRYPTION 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


export default mongoose.models.User || mongoose.model('User', userSchema)




User: {
    userName: ""
    password: ""
    readingList: [{
                    "postName": {
                        "subheader1": ["bullet1", "bullet2"],
                        "subheader2": ["bullet1", "bullet2"]
                    }
                }]
    }



// Flow: New bullets are only added to a user's readinglist when the bullet is published to MongoDB, 
// that way we can just add and remove bullets and don't need to flag if they've been read.
// Otherwise if the RL is constantly checking for bullets that have been added after the follow date, 
// then we need to keep the bullets in the Users RL object and flag that they've been read to prevent already seen bullets from appearing.

// Need a script for adding new posts (no need to update RLs for a new post)
// And another script to add bullets (+ subheaders), which also then adds the bullets to any RL following the post


// Adding a Post: Nothing for RL
// Updating a Post: Check RL objects to see if user is following the post, if so, add the bullet w subheader to the user RL -- script only adds one bullet at a time, or updates on SH at a time?

// Following a Post: Add the post to the user's list of tracked posts
// Unfollowing a Post: Remove the post from the user's list of tracked posts
// Marking a bullet as Read: remove the bullet from the user's RL