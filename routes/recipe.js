let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// this line connected the router with the model we made
let Recipe = require('../models/recipe');
const recipe = require('../models/recipe');


// Reading operation

router.get('/',async(req,res,next) =>{
    try{
        const Recipelist = await Recipe.find();
        res.render('Recipes/list',{
            title:'Recipes',
            Recipelist:Recipelist
        })
    }
    catch(err){
        res.render('Recipes/list',{
            error:'Error on server'
        })
    }
})

// Creation operation

//Getting operations
router.get('/add', async(req,res,next) => {

    try{ res.render('Recipes/add',{
        title: 'Add Recipe'
    });
        
    }
    catch(err){
        res.render('Recipes/list',{
            error:'Error on server'
        })
    }
});

//Adding operations
router.post('/add', async(req,res,next) => {
     try{ 
        let newRecipe = Recipe({
            "name":req.body.name,
            "type":req.body.type,
            "servings":req.body.servings,
            "prepTime":req.body.prepTime,
            "description":req.body.description,
            "instructions":req.body.instructions
        });
        Recipe.create(newRecipe).then(() =>{
            res.redirect('/recipes')
        });   
    }
    catch(err){
        res.render('Recipes/list',{
            error:'Error on server'
        })
    }
});




//Updating operations
router.get('/edit/:id', async(req,res,next) => {
    try{ 
        const id = req.params.id;
        const recipeToEdit = await Recipe.findById(id);
        res.render('Recipes/edit',{
            title:'Edit Recipe',
            Recipe:recipeToEdit
        })
          
    }
    catch(err){
        console.error(err);
        next(err);
        }
 
});



//Posting operations
router.post('/edit/:id', async(req,res,next) => {


    try{
        let id = req.params.id;
        let updatedRecipe = Recipe({

            '_id':id,
            "name":req.body.name,
            "type":req.body.type,
            "servings":req.body.servings,
            "prepTime":req.body.prepTime,
            "description":req.body.description,
            "instructions":req.body.instructions
        })
        Recipe.findByIdAndUpdate(id,updatedRecipe).then(()=>{

            res.redirect('/recipes')
        })
        
    
          
    }
    catch(err){
        console.error(err);
        res.render('Recipes/list',{
            error:'Error on server'})
    }




});





//Getting operations
router.post('/delete/:id', async(req,res,next) => {
    try{ 
        let id = req.params.id;
        Recipe.deleteOne({_id:id}).then(()=>{
            res.redirect('/recipes')
        })
        
    }
    catch(err){
        res.render('Recipes/list',{
            error:'Error on server'
        })
    }



});


module.exports = router;