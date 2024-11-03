import express from 'express';
import morgan from 'morgan';
import listRouter from './routes/list-route.js';
import gameRouter from './routes/game-route.js';

const app = express();

app.use(morgan('dev'));

app.use('/games', listRouter);
app.use('/game', gameRouter);

export default app;