// To handle: create, update, delete, get
// info of the user and for auth, we use a different file.

const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
// router.get('/', (req, res)=>{
//     console.log("welcome to /api/users route")
// it was just for experiment
//     res.send("welcome to /api/users route")
// })

// create user
// already implimented in auth js



// get user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const userName = req.query.username;
  try {
    const user = userId 
    ? await User.findById(userId) 
    : await User.findOne({username: userName});
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can update only your account");
  }
});

// delete user
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id);

      res.status(200).json("Your account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can delete only your account");
  }
});

// follow a user

router.put("/:id/follow", async (req, res) => {
  console.log(req.body.userId, req.params.id);
  if (req.body.userId !== req.params.id) {
    try {
      const userToBeFollowed = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!userToBeFollowed.followers.includes(req.body.userId)) {
        await userToBeFollowed.updateOne({ $push: { followers: req.body.userId } });
        console.log("follower updated");
        await currentUser.updateOne({$push:{followings: req.params.id}});
        console.log("following updated")
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const userToBeUnFollowed = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (userToBeUnFollowed.followers.includes(req.body.userId)) {
          await userToBeUnFollowed.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({$pull:{followings: req.params.id}});
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you don't follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you can't unfollow yourself");
    }
  });

module.exports = router;
