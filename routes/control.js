var express = require('express');
const ControlModel = require('../models/ControlModel');
var router = express.Router();

router.get('/', async (req, res) =>{
    var control = await ControlModel.find();
       res.render('control/index', {control:control})
})
router.get('/add', (req, res) =>
{
    res.render('control/add')
})

router.post('/add', async (req, res) =>{
    var control = req.body;
    await ControlModel.create(control);
    res.redirect('/control/admin')
})

router.get('/admin', async (req, res) =>
{
    var control = await ControlModel.find();
    res.render('control/admin', {control:control})
})

router.get('/detail/:id', async(req, res) =>{
    var id = req.params.id;
    var control = await ControlModel.findById(id);
    res.render('control/detail', {control:control})
})

router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    var control = await ControlModel.find({ name: new RegExp(keyword, "i") });
    res.render('control/index', { control: control });
 })

 router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var control = await ControlModel.findById(id);
    res.render('control/edit', { control: control })
 })
 
 router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var control = req.body;
    await ControlModel.findByIdAndUpdate(id, control);
    res.redirect('/control/admin')
 })
module.exports = router;