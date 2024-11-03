import pool from '../config/db.js';
import Game from '../models/Game.js';

const fetchGameList = async() => await pool.query('SELECT * FROM games');
const fetchGameByID = async(id: number) => await pool.query('SELECT * FROM games WHERE id=$1', [id]);

// ranking is determined as a percentage compared with the total amount of entries in a competition (10th place of 10 entries is very different than 10th place of 1000 entries)
const fetchGameByRanking = async(ascending: boolean) => await pool.query(`SELECT * FROM games ORDER BY ranking::float / total_entries ${ascending ? 'ASC' : 'DESC'}`);
const fetchGameByDate = async(recent: boolean) => await pool.query(`SELECT * FROM games ORDER BY date_submitted ${recent ? 'DESC' : 'ASC'}`);
const fetchGameByJam = async(jam:string) => await pool.query('SELECT * FROM games WHERE jam=$1', [jam]);
const fetchGameByType = async(type: string) => await pool.query('SELECT * FROM games WHERE project=$1', [type]);

// there are many optional columns in the game table, we must add these values dynamically, whilst still using parameterized queries for safety
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