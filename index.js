const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'), // import built in node modules fs and path 
  path = require('path'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

let topTenMovies = [
    {
      title: 'Movie1',
      genre: 'Genre1',
      director: 'Director1'
    },
    {
      title: 'Movie2',
      genre: 'Genre2',
      director: 'Director2'
    },
    {
      title: 'Movie3',
      genre: 'Genrea3',
      director: 'Director3'
    },
    {
      title: 'Movie4',
      genre: 'Genre4',
      director: 'Director4'
    },
    {
      title: 'Movie5',
      genre: 'Genre5',
      director: 'Director5'
    },
    {
      title: 'Movie6',
      genre: 'Genre6',
      director: 'Director6'
    },
    {
      title: 'Movie7',
      genre: 'Genre7',
      director: 'Director7'
         },
    {
      title: 'Movie8',
      genre: 'Genre8',
      director: 'Director8'
    },
    {
      title: 'Movie9',
      genre: 'Drama9',
      director: 'Director9'
    },
    {
      title: 'Movie10',
      genre: 'Genre10',
      director: 'Director10'
    }
  ];

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

// GET requests

app.get('/', (req, res) => {
    res.send('Welcome to myFlix movie page!  Enter "/documentation.html" for more help.');
  });

  app.use(express.static('public'));
  
  app.get('/movies', (req, res) => {
    res.json(topTenMovies);
  });

/* 
  Return a list of ALL movies to the user
  app.get('/movies', (req, res) => {
    res.send('Successful GET request returning data on all the movies');
  });
  */

  //Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by movie's title to the user
  app.get('/movies/:movieTitle', (req, res) => {
    res.send('Successful GET request returning JSON data on a specific movie');
  });

  //Return data about a specific genre by genre's name to the user
  app.get('/movies/genre/:genreName', (req, res) => {
    res.send('Successful GET request returning a description of a specific genre');
  });

  //Return data about a director (bio, birth year, death year) by director's name
  app.get('/movies/directors/:directorName', (req, res) => {
    res.send('Successful GET request returning data on the director of a specific movie');
  });

  //Allow new users to register
  app.post('/users', (req, res) => {
    res.send('Successful GET request returning data showing the registration information and ID for a new user');
  });

  //Allow users to update their user info (username)
  app.put('/users/:userName', (req, res) => {
    res.send('Successful PUT request returning updated registration information for a specific user');
  });

  //Allow users to add a movie to their list of favorites (showing only a text that a movie has been added)
  app.post('/users/movies/:movieName', (req, res) => {
    res.send('Successful POST request showing that an "unspecified" movie has been added');
  });

  //Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed)
  app.delete('/users/movies/:movieName', (req, res) => {
    res.send('Successful DELETE request showing that an "unspecified" movie has been deleted');
  });

  //Allow existing users to deregister (showing only a text that a user email has been removed)
  app.delete('/users/:userName', (req, res) => {
    res.send('Successful DELETE request showing that an "unspecified" user has been deleted');
  });

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});