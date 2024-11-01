import express from 'express';
import morgan from 'morgan';
import gameController from './controllers/game-controller.js';

const app = express();

// middleware that is not bound to a path and is called for any request that comes in
app.use(morgan('dev'));

// Routes
app.get('/game/:id', gameController.fetchGameByID);
app.get('/games', gameController.fetchGameList);
app.get('/games/ranking/:order', gameController.fetchGameByRanking);
app.get('/games/submission/:date', gameController.fetchGameByDate);
app.get('/games/jam/:jam', gameController.fetchGameByJam);
app.get('/games/project/:type', gameController.fetchGameByType);

export default app;