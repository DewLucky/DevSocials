// Authentication
const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt') // async fxn

// just checking and learning how to create a new user.
// Creating a new user is an async operation so call fxn 
// should be async fxn, get is just for experiment
// router.get('/register', async (req, res)=>{
//     const user = await new User({
//         username: "Lucky",
//         email: "lucky@gmail.com",
//         password: "123456"
//     })
    
//     await user.save()
//     res.send("new user created")
// }) 


/*Now what we will do is, go to postman, to create a new
user, we will use post request to our localhost route, and 
we will send the user data as a raw json file in body of the 
request. 

in response, we will send the created user data in return. 
and we will use try and catch block, in try block if user 
is successfully created, we wiil send the new user created 
otherwise in catch we will send the error. 



Another problem is: we should not expose our passwords to 
anywhere, whether it is private database or your personal 
database. Always encrypt your passwords. 

hence you will use: npm install bcrypt(a library for hashing of passwords)
*/

// REGISTER
router.post('/register', async (req, res)=>{
    try {
        // generate a hashed unique password from given input
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword // store hashed password in your db
        })

        const user = await newUser.save();
        res.status(200).json(user)

    } catch(err){
        res.status(500).json(err);
    }
})

// LOGIN
router.post('/login', async (req, res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(404).json("User not found || Incorrect email")
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        
        if(!validPassword){
            res.status(400).json("wrong password");
            return;
        }  

        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;