import gameService from '../services/game-service.js';
import {Request, Response} from 'express';
import RESPONSES from '../utils/responses.js';


const fetchGameList = async(req: Request, res: Response) =>  {
    try {
        const result = await gameService.fetchGameList();
        res.status(200).json(result.rows);
    } catch (err){
        console.error(err);
        res.status(500).json(RESPONSES.ERROR);
    }
}

const fetchGameByID = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if(isNaN(id)){
        res.status(400).json({ error: 'Invalid game ID format'});
        return;
    }

    try {
        const result = await gameService.fetchGameByID(id);

        if(result.rowCount === 0){
            res.status(404).json({ error: 'Game not found' });
            return;
        }

        res.status(200).send(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json(RESPONSES.ERROR);
    }
}

const fetchGameByRanking = async(req: Request, res: Response) => {

    const order = req.params.order.toUpperCase();

    if(order !== 'ASC' && order !== 'DESC'){
        res.status(400).json({error: 'Bad request: Value must be ASC or DESC'});
        return;
    }

    const best = order === 'ASC' ? true : false;

    try {
        const result = await gameService.fetchGameByRanking(best);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json(RESPONSES.ERROR);
    }

}


const fetchGameByDate = async(req: Request, res: Response) => {
   
    const date = req.params.date.toUpperCase();

    if(date !== 'NEW' && date !== 'OLD'){
        res.status(400).json({error: 'Bad Request. Value must be new or old.'});
        return;
    }

    const recent = date === 'NEW' ? true : false;

    try {
        const result = await gameService.fetchGameByDate(recent);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json(RESPONSES.ERROR);
    }
}

const fetchGameByJam = async(req: Request, res: Response) => {

    try {
        const result = await gameService.fetchGameByJam(req.params.jam);

        if(result.rowCount === 0){
            res.status(404).json({ error: 'Jam not found'});
            return;
        }

        res.status(200).json(result.rows);
    } catch (err){
        console.error(err);
        res.status(500).json(RESPONSES.ERROR);
    }
}

const fetchGameByType = async(req: Request, res: Response) => {
    try {
        const result = await gameService.fetchGameByType(req.params.type);

        if(result.rowCount === 0){
            res.status(404).json({ error: 'No such game type'})
            return;
        }
        res.status(200).json(result.rows);
    } catch (err){
        console.error(err);
        res.status(500).json(RESPONSES.ERROR);
    }
}

export default {
    fetchGameList,
    fetchGameByID,
    fetchGameByRanking,
    fetchGameByDate,
    fetchGameByJam,
    fetchGameByType
}

