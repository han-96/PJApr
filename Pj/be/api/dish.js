const express = require("express");
const authMdw = require("../middlewares/auth");
const DishService = require("../services/dish");
const {createDish,getFour,getDishById} = require('../services/dish');
const router = express.Router();

router.post('/add-dish', async (req, res) => {
    try{
        const result = await createDish(req.body.newDish,req.body.newDescription)
        res.json(result)
    }catch(e){
        res.status(400).json({Error:e.message})
    }
})
router.get('/get-4/:skip', async (req,res)=>{   
    const results = await getFour(Number(req.params.skip))
    res.json(results)
})
router.get('/detail/:id',async (req,res)=>{
    try{
        const result = await getDishById(req.params.id)
        res.json(result)
    }catch(e){
        res.status(400).json({Error:e.message})
    }
})

module.exports = router