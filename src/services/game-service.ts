import pool from '../config/db.js';

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
    const result = pool.query('SELECT * FROM games WHERE project=$1', [type]);
    return result;
}

export default {
    fetchGameList,
    fetchGameByID,
    fetchGameByRanking,
    fetchGameByDate,
    fetchGameByJam,
    fetchGameByType
}