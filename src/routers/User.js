import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import { userModel } from '../models/Users.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    // console.log(user)
    if (user) {
        return res.json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ username: req.body.username, password: hashedPassword })
    await newUser.save()
        .then(() => res.json({ message: "User created sucessfull" }))
        .catch((e) => res.json({ message: e.message }))

});
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
        return res.json({ message: "User doesn't exists" });
    }

    const isPasswordVaild = await bcrypt.compare(password, user.password);

    if (!isPasswordVaild) {
        return res.json({ message: "The password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, "recipescode");
    return res.json({ token, userID: user._id, username });
});

export { router as userRouter };
