const express = require("express");
const { userValidateObj, signinValidateObj } = require("./validate");
const { Users, Posts } = require("./db");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./auth");
const multer = require("multer");
const upload = multer();
const rootRouter = express.Router();
const PASSWORD = "confidential";

rootRouter.post("/signup", async (req, res) => {
  const user = req.body;
  const { success } = userValidateObj.safeParse(user);
  const existingUser = await Users.findOne({
    user_email: user.user_email,
  });
  if (!success) {
    return res.status(422).json({
      msg: "Incorrect inputs",
    });
  }
  if (existingUser) {
    return res.status(409).json({
      msg: "User exists, login instead!",
    });
  }
  const newUser = await Users.create(user);
  const userId = newUser._id;
  if (newUser) {
    const token = jwt.sign({ userId }, PASSWORD);
    return res.status(200).json({
      token: token,
    });
  }
});

rootRouter.post("/signin", async (req, res) => {
  const { user_email, user_password } = req.body;
  const { success } = signinValidateObj.safeParse({
    user_email,
    user_password,
  });
  if (!success) {
    return res.status(422).json({
      msg: "Incorrect inputs",
    });
  }
  const currentUser = await Users.findOne({ user_email, user_password });
  if (!currentUser) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
  const userId = currentUser._id;
  if (currentUser) {
    const token = jwt.sign({ userId }, PASSWORD);
    return res.status(200).json({
      token: token,
    });
  }
});

rootRouter.post(
  "/post",
  authMiddleware,
  async (req, res) => {
    const post_text = req.body.post_text;
    const post_url = req.body.post_url;
    const createPost = await Posts.create({
      userId: req.userId,
      post_text,
      post_url,
    });
    if (createPost) {
      return res.status(200).json({
        msg: "post uploaded successfully",
      });
    }
  }
);

rootRouter.get("/posts", async (req, res) => {
  try {
    const posts = await Posts.find({});
      return res.status(200).json(
        {
          posts
        }
      )
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});



rootRouter.get("/user_details", authMiddleware, async (req, res) => {
  const userdetails = await Users.findOne({ _id: req.userId });
  const details = {
    user_name: userdetails.user_name,
    name: userdetails.name,
    user_email: userdetails.user_email,
    user_image: userdetails.user_image,
    user_website: userdetails.user_website,
    user_bio: userdetails.user_bio,
    user_age: userdetails.user_age,
  };
  return res.json({
    details
  });
});

rootRouter.put("/addUserDetials", authMiddleware, async (req, res) => {
  const userdetails = req.body;
  Users.updateOne(
    { _id: req.userId },
    {
      $set: {
        name: userdetails.name,
        user_image: userdetails.user_image,
        user_website: userdetails.user_website,
        user_bio: userdetails.user_bio,
        user_age: userdetails.user_age,
      },
    }
  ).then(() => {
    res.json({
      msg: "userDetials Updated",
    });
  });
});



rootRouter.post("/liked/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await Posts.updateOne(
      { _id: postId },
      { $inc: { likes_count: 1 } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Fetch updated likes count
    const updatedPost = await Posts.findOne({ _id: postId });
    res.json({ likes_count: updatedPost.likes_count });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

rootRouter.get("/like/:id",async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await Posts.findOne({ _id: postId }, 'likes_count');
    if (!result) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ likes_count: result.likes_count });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});


rootRouter.get("/recent-three", authMiddleware, async (req, res) => {
  try {
    const recentUsers = await Users.find({}).sort({ createdAt: -1 }).limit(3);

    res.status(200).json(
      {recentUsers});
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch recent users" });
  }
});

rootRouter.put('/addUserDetials', authMiddleware, (req, res) => {
    const userdetails = req.body;

    Users.updateOne(
        { _id: req.userId },
        {
            "$set": {
                name: userdetails.name,
                user_image: userdetails.user_image,
                user_website: userdetails.user_website,
                user_bio: userdetails.user_bio,
                user_age: parseInt(userdetails.user_age)
            }
        }
    ).then(() => {
        res.json({
            msg: "User details updated"
        });
    }).catch((error) => { // Error handling
        res.status(500).json({
            msg: "Error updating user details",
            error: error.message
        });
    });
});

rootRouter.get('/getUserDetails/:userId',authMiddleware,async(req,res)=>{
  const postId = req.params.userId;
  try{
    const user = await Users.findOne({_id : postId})
    const user_name = user.user_name;
    const user_image = user.user_image;
  
    res.status(200).json({
      user_name,
      user_image
    })
  }
  catch(e){
    res.status(500).json({ message: "An error occurred", e});
  }
})

module.exports = rootRouter;
