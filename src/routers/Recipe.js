import express from 'express'
import { RecipeModel } from '../models/Recipes.js'
import { userModel } from '../models/Users.js';


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        return res.json(response);
    }
    catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const newRecipes = new RecipeModel(req.body);
    try {
        await newRecipes.save();
        return res.json({ message: "Recipe added successfully" });
    }
    catch (err) {
        res.json(err);
    }
});

router.put("/", async (req, res) => {

    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await userModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        return res.json({ savedRecipes: user.savedRecipes });
    }
    catch (err) {
        res.json(err);
    }
});

router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        res.json(err);
    }
})

router.get("/savedRecipes", async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        })
        res.json({ savedRecipes });
    } catch (err) {
        res.json(err);
    }
})
router.post("/ids", async(req,res)=>
{
    console.log("Call")
    try{
        const response = await RecipeModel.findById(req.body.recipeID);
        console.log("response sent")
        res.json({response});
    }
    catch(err)
    {
        res.json(err);
    }
})

export { router as recipeRouter };