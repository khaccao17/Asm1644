var express = require('express');
var router = express.Router();
const OrdinaryModel = require('../models/OrdinaryModel');

router.get('/', async (req, res) =>{
    var ordinarys = await OrdinaryModel.find();
       res.render('ordinary/index', {ordinarys:ordinarys})
})
router.get('/add', (req, res) =>
{
    res.render('ordinary/add')
})

router.post('/add', async (req, res) =>{
    var ordinarys = req.body;
    await OrdinaryModel.create(ordinarys);
    res.redirect('/ordinary/admin')
})

router.get('/admin', async (req, res) =>
{
    var ordinarys = await OrdinaryModel.find();
    res.render('ordinary/admin', {ordinarys:ordinarys})
})

router.get('/detail/:id', async(req, res) =>{
    var id = req.params.id;
    var ordinarys = await OrdinaryModel.findById(id);
    res.render('ordinary/detail', {ordinarys:ordinarys})
})

router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    var ordinarys = await OrdinaryModel.find({ name: new RegExp(keyword, "i") });
    res.render('ordinary/index', { ordinarys: ordinarys });
 })

 router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var ordinarys = await OrdinaryModel.findById(id);
    res.render('ordinary/edit', { ordinarys: ordinarys })
 })
 
 router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var ordinarys = req.body;
    await OrdinaryModel.findByIdAndUpdate(id, ordinarys);
    res.redirect('/ordinary/admin');
 })
module.exports = router;