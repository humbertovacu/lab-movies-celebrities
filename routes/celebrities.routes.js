const Celebrity = require('../models/Celebrity.model');

const router = require('express').Router();


router.get('/create',(req, res)=>
    res.render('celebrities/new-celebrity.hbs')
)

router.post('/create', (req, res)=> {
 const { name, occupation, catchPhrase } = req.body;
 Celebrity.create({name, occupation, catchPhrase})
 .then (createdCeleb => res.redirect('/celebrities'))
 .catch (err => res.render('celebrities/new-celebrity.hbs'));
}
)

module.exports = router;