import gameService from '../services/game-service.js';
import {Request, Response} from 'express';
import Game from '../models/Game.js';
import { EntryDate, Ranking } from '../models/GameEnums.js';
import handleServerError, {handleBadRequest, handleNotFound} from '../utils/error-handling.js';


const fetchGameList = async(req: Request, res: Response) =>  {
    try {
        const result = await gameService.fetchGameList();
        res.status(200).json(result.rows);
    } catch (err){
        handleServerError(err, res);
    }
}

const fetchGameByID = async(req: Request, res: Response, next: Function, paramsId: string) => {
    const id = parseInt(paramsId, 10);

    if(isNaN(id)){
        handleBadRequest(res, 'Invalid game ID format');
        return;
    }

    try {
        const result = await gameService.fetchGameByID(id);

        if(result.rowCount === 0){
            handleNotFound(res, 'Game');
            return;
        }

       req.game = result.rows[0];
       next();

    } catch (err) {
        handleServerError(err, res);
    }
}

const fetchGameByRanking = async(req: Request, res: Response) => {

    const order = req.params.order.toUpperCase() as Ranking;

    if(!(order in Ranking)){
        handleBadRequest(res, `Value must be ${Ranking.BEST} or ${Ranking.WORST}`)
        return;
    }

    const best = order === Ranking.BEST;

    try {
        const result = await gameService.fetchGameByRanking(best);
        res.status(200).json(result.rows);
    } catch (err) {
        handleServerError(err, res);
    }

}


const fetchGameByDate = async(req: Request, res: Response) => {
   
    const date = req.params.date.toUpperCase() as EntryDate;

    if(!(date in EntryDate)){
        handleBadRequest(res, `Value must be ${EntryDate.NEW} or ${EntryDate.OLD}`)
        return;
    }

    const recent = date === EntryDate.NEW;

    try {
        const result = await gameService.fetchGameByDate(recent);
        res.status(200).json(result.rows);
    } catch (err) {
        handleServerError(err, res);
    }
}

const fetchGameByJam = async(req: Request, res: Response) => {

    try {
        const result = await gameService.fetchGameByJam(req.params.jam);

        if(result.rowCount === 0){
            handleNotFound(res, 'Jam');
            return;
        }

        res.status(200).json(result.rows);
    } catch (err){
        handleServerError(err, res);
    }
}

const fetchGameByType = async(req: Request, res: Response) => {
    try {
        const result = await gameService.fetchGameByType(req.params.type);

        if(result.rowCount === 0){
            handleNotFound(res, 'Game type');
            return;
        }
        res.status(200).json(result.rows);
    } catch (err){
        handleServerError(err, res);
    }
}

const getGame = (req: Request, res: Response) => {
   

    try {
        const result = req.game; 
        res.status(200).send(result);
    } catch (err) {
        handleServerError(err, res);
    }
}

const addGame = async(req: Request, res: Response) => {
    const game: Partial<Game> = req.body;

    //checking for non-optional properties
    if(!game.title || !game.project || !game.date_submitted){
        handleBadRequest(res, 'Missing non-option properties title, project or date_submitted');
        return;
    }

    try {
        const result = await gameService.addGame(game as Game);
        res.status(201).json(result.rows);
    } catch (err) {
        handleServerError(err, res);
    }
}

const editGame = async(req: Request, res: Response) => {
    console.log('editing');
    console.log(req.game)
}

const deleteGame = async(req: Request, res: Response) => {
    console.log('deleting game');
    console.log(req.game)
}

export default {
    fetchGameList,
    fetchGameByID,
    fetchGameByRanking,
    fetchGameByDate,
    fetchGameByJam,
    fetchGameByType,
    getGame,
    addGame,
    editGame,
    deleteGame
}

