const { default: mongoose, Collection } = require("mongoose");

let recipeModel = mongoose.Schema({

    name:String,
    type:{type:String,enum:['Breakfast','Lunch','Dinner','Dessert','Snack']},
    servings:Number,
    prepTime:Number,
    description:String,
    instructions:String
   
},
{
    Collection: 'recipes'
});

module.exports = mongoose.model('Recipe', recipeModel,'recipelist');