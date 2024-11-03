import express from 'express';
import gameController from '../controllers/game-controller.js';

const router = express.Router();

router.use(express.json());
router.param('id', gameController.fetchGameByID);

router.post('/', gameController.addGame);

router
.route('/:id')
.get(gameController.getGame)
.put(gameController.editGame)
.delete(gameController.deleteGame);

export default router;