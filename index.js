import express from 'express'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

mongoose.connect(
    'mongodb+srv://festus:fideliaS123@crashcourse.yf3mn.mongodb.net/crashcourse?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(
    null,
    (error) => console.error('Error connecting: ' + error)
)

const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    Role: String,
})
userSchema.method({
    findSimilar: function() {
        return mongoose.model('User').find({ role: this.role })
    }
})

let User = mongoose.model('User', userSchema)
let newUser = new User({
    name: 'Festus',
    password: '123456',
    email: 'festusyuma@gmail.com',
    role: 'admin'
})

newUser.findSimilar(doc => {
    console.log('find by role' + doc)
})

/*
user.save().then((error, doc) => {
    console.log('user save' + doc)
    console.log('user save error' + error)
})*/
