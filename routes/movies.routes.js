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
    Movie.find()
    .then (allMovies => res.render('movies/movies.hbs', {movies: allMovies}))
    .catch(err => res.send(err))
})

router.get('/:id', (req,res) =>{
    const { id } = req.params;
    Movie.findById(id)
    .populate('cast')
    .then(selectedMovie => res.render('movies/movie-details.hbs', {movie: selectedMovie}))
    .catch(err => res.send(err))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
    .then(deletedFilm => res.redirect('/movies'))
    .catch(err => res.send(err))
})

router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    const findMovie = Movie.findById(id);
    const findCast = Celebrity.find();

    Promise.all([findMovie, findCast])
    .then(movieInfo => res.render('movies/edit-movie.hbs', {movie: movieInfo}))
    .catch(err => res.send(err))
})

router.post('/:id', (req, res)=>{
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(id, {title, genre, plot, cast}, {new: true})
    .then(updatedMovie => res.redirect(`/movies/${id}`))
    .catch(err => res.send(err));
}
)



module.exports = router;