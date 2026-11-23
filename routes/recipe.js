let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// this line connected the router with the model we made
let Recipe = require('../models/recipe');


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


module.exports = router;