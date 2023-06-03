const router = require('express').Router()

router.get('/', (req, res)=>{
    console.log("welcome to home route")
    res.send("welcome to home route")
})

module.exports = router;