const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();

const MONGO_URI = 'mongodb://localhost:27017/mern-auth'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("Mongodb is connected to", db.connection.host))
  .catch((err) => console.error(err));

  let Usermodel = mongoose.model('users', {
    name: String,
    email: String,
    password: String
    })

   router.post('/registeruser', (req, res) => {
    
    let newUser = new Usermodel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save((err) => {
    if(err){
        res.send('Something went wrong');
    }else{
        res.send('User registration successfull');
    }
  })
})

    router.post('/loginuser', (req, res) => {
        Usermodel.find({
            username: req.body.email,
            password: req.body.password
        }, (err, documents) => {
            if(err){
                res.send('Something went wrong');
            }else
                if(documents.length == 0){

                    res.send('Login failed');
                }else {
                    res.send('Login successfull');
                }
        })
    })

    router.post('/getusers', (req, res) => {
        Usermodel.find({}, (err, documents) => {
            if(err){
                res.send('Something went wrong');
            }else {
                res.send(documents);
            }
        })
    })

module.exports = router;

