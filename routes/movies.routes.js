const router = require('express').Router();
const Movie = require('../models/Movies.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/create',(req,res)=>{
    Celebrity.find()
    .then(allCelebrities => res.render('movies/new-movie.hbs', {celebrities: allCelebrities}))
})

router.post('/create',(req,res)=>{
    const { title, genre, plot, cast } = req.body;
    Movie.create({title, genre, plot, cast})
     .then (() => res.redirect('/movies'))
     .catch(err => console.log(err))
})

router.get('/', (req,res)=>{
    res.render('movies/movies.hbs')
})

module.exports = router;