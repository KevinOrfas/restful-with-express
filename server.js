'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let games = require('./gamedata.json');
console.log(games);

app.get('/api/games', (request,response) => {
    if (!games) {
        response.status(404).json({ message: 'No games found'})
    }
    response.json(games);
});

app.get('/api/games/:id', (request,response) => {
    const requestId = request.params.id;
    let game = games.filter(game => {
        return game.id == requestId;
    });

    if (!game) {
        response.status(404).json({ message: 'No game found'})
    }

    response.json(game[0]);
});

app.post('/api/games', (request,response) => {
    const game = {
        id: games.length + 1,
        name: request.body.name,
        created: new Date(),
        groups: []
    };

    games.push(game);

    response.json(game);
});



const hostname = 'localhost';
const port = 3001;

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



