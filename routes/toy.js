var express = require('express');
const ToyModel = require('../models/ToyModel');
const OrdinaryModel = require('../models/OrdinaryModel');
const ControlModel = require('../models/ControlModel');
var router = express.Router();


router.get('/', async (req, res) =>{
    var toys = await ToyModel.find();
    var ordinarys = await OrdinaryModel.find();
    var control = await ControlModel.find();
       res.render('toy/index', {toys:toys, ordinarys:ordinarys, control:control})
})

router.get('/detail/:id', async(req, res) =>{
    var id = req.params.id;
    var toys = await ToyModel.findById(id);
    res.render('toy/detail', {toys:toys})
})

router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    var ordinarys = await OrdinaryModel.find({ name: new RegExp(keyword, "i")})
    var control = await ControlModel.find({name: new RegExp(keyword, "i")})
    res.render('toy/index', { ordinarys:ordinarys, control:control });
 })

module.exports = router;