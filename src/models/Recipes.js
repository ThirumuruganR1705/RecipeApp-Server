import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl1: { type: String, required: true },
    imageUrl2: { type: String, required: true },
    imageUrl3: { type: String, required: true },
    imageUrl4: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    preparationTime: { type: Number, required: true },
    cuisines: { type: String, required: true },
    calories: { type: String, required: true },
    fats: { type: String, required: true },
    carbs: { type: String, required: true },
    proteins: { type: String, required: true },
    rating: { type: String, required: true },
    servings: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

export const RecipeModel = mongoose.model("recipe", RecipeSchema);

