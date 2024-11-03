import pool from '../config/db.js';
import Game from '../models/Game.js';

const fetchGameList = async() => {
    const result = await pool.query('SELECT * FROM games');
    return result;
}

const fetchGameByID = async(id: number) => {
    const result = await pool.query('SELECT * FROM games WHERE id=$1', [id]);
    return result;
}

const fetchGameByRanking = async(ascending: boolean) => {
    const result = await pool.query(`SELECT * FROM games ORDER BY ranking::float / total_entries ${ascending ? 'ASC' : 'DESC'}`);
    return result;
}

const fetchGameByDate = async(recent: boolean) => {
    const result = await pool.query(`SELECT * FROM games ORDER BY date_submitted ${recent ? 'DESC' : 'ASC'}`);
    return result;
}

const fetchGameByJam = async(jam:string) => {
    const result = await pool.query('SELECT * FROM games WHERE jam=$1', [jam]);
    return result;
}

const fetchGameByType = async(type: string) => {
    const result = await pool.query('SELECT * FROM games WHERE project=$1', [type]);
    return result;
}

const addGame = async(game: Game) => {

    const optional = {
        jam: game.jam ?? null,
        ranking: game.ranking ?? null,
        total_entries: game.total_entries ?? null,
        engine: game.engine ?? null
    }

    const parameters: string[] = ['$1', '$2', '$3'];
    const values: (string | number | Date)[] = [game.title, game.project, game.date_submitted];
    const columns: string[] = ['title', 'project', 'date_submitted'];

    Object.entries(optional).forEach(([key, value]) => {
        if(value !== null){
            parameters.push('$' + (parameters.length + 1))
            values.push(value);
            columns.push(key);
        }
    });

    const querySTR = `INSERT INTO games(${columns.join(', ')}) VALUES(${parameters.join(', ')})`;
    const result = await pool.query(querySTR, values);
    return result;
}

export default {
    fetchGameList,
    fetchGameByID,
    fetchGameByRanking,
    fetchGameByDate,
    fetchGameByJam,
    fetchGameByType,
    addGame
}