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

router.get('/', (req, res)=>{
    Celebrity.find()
    .then(allCelebrities => res.render('celebrities/celebrities.hbs', {celebrities: allCelebrities}))
    .catch(err => res.send(err));
}
)

router.get('/:id', (req, res)=> {
   const { id } = req.params;
   Celebrity.findById(id)
   .then(foundCelebrity => res.render('celebrities/celebrity-details.hbs', {celebrity: foundCelebrity}))
   .catch(err => res.send(err));
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params;
    Celebrity.findByIdAndRemove(id)
    .then(deletedCelebrity => res.redirect('/celebrities'))
    .catch(err => res.send(err))
})

router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    Celebrity.findById(id)
    .then(foundCelebrity => res.render('celebrities/celebrity-edit.hbs',{celebrity: foundCelebrity}))
    .catch (err => res.send(err));
})

router.post('/:id', (req, res)=> {
    const { id } = req.params;
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.findByIdAndUpdate(id, {name, occupation, catchPhrase}, {new: true})
    .then (editedCelebrity => res.redirect(`/celebrities/${id}`))
    .catch (err => res.send(err));
})

module.exports = router;