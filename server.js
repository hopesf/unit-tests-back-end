const express = require('express');

const app = express();
app.use(express.json());

const  db =  require('./helpers/db.js')();
const  movies =  require('./models/movie');

app.get('/', (req,res)=>{
    res.send('burasi Filmlerin ana sayfasidir.');
});

app.post('/kayit', (req,res)=>{
   const { name, category, imdb} = req.body;

    movies.findOrCreate({
        name,category,imdb
    }, (err, movie) =>{
        res.json(movie);
    });
});

app.get('/movies', (req,res)=>{
    movies.find( (err,data)=>{
       res.json(data);
    });
});

app.get('/movie/:searchid', (req,res)=>{
    const searchID = (req.params.searchid);
    movies.findById(searchID, (err,data)=>{
        res.json(data);
    });
});

app.delete('/movie/:movieId',(req,res) =>{
    movies.findByIdAndRemove(req.params.movieId,(err,data)=>{
        res.json(data);
    });
});

app.get('/category/:category',(req,res)=>{

   const categoryName = (req.params.category);
    movies.find( { category: categoryName}, (err,data)=>{
       res.json(data);
    });
});



module.exports = app.listen(3000);             // port'u export etmek, mocha icin cok onemli.
