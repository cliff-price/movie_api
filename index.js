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
      title: 'Movie 1',
    },
    {
      title: 'Movie 2',
    },
    {
      title: 'Movie 3',
    },
    {
      title: 'Movie 4',
    },
    {
      title: 'Movie 5',
    },
    {
      title: 'Movie 6',
    },
    {
      title: 'Movie 7',
    },
    {
      title: 'Movie 8',
    },
    {
      title: 'Movie 9',
    },
    {
      title: 'Movie 10',
    }
  ];

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

// GET requests

app.get('/', (req, res) => {
    res.send('Welcome to my movie page!  Enter "/movies" to see a list of my top 10 movies.  Enter "/documentation" for more help.');
  });
  
  /*app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });

  app.use('/documentation', express.static('public'));
  
  app.use('/documentation', express.static('public/documentation.html'));
  */
  app.use('/documentation', express.static(path.join(__dirname, 'public')))
  
  app.get('/movies', (req, res) => {
    res.json(topTenMovies);
  });

  app.get('/secreturl', (req, res) => {
    res.send('This is a secret url with supzer top-secret content.');
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