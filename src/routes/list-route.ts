import express from 'express';
import gameController from '../controllers/game-controller.js';

const router = express.Router();

router.get('/', gameController.fetchGameList);
router.get('/ranking/:order', gameController.fetchGameByRanking);
router.get('/submission/:date', gameController.fetchGameByDate);
router.get('/jam/:jam', gameController.fetchGameByJam);
router.get('/project/:type', gameController.fetchGameByType);

export default router;