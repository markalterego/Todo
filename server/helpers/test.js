import { hash } from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { pool } from './db.js';

const __dirname = import.meta.dirname;
const { sign } = jwt;

const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname,'../db.sql'), 'utf-8');
    pool.query(sql);
}

const insertTestUser = async (email, password, next) => {
    const hashedPassword = await hash(password, 10);
    await pool.query('insert into account (email,password) values ($1,$2)', [email,hashedPassword]);
}

const getToken = (email) => {
    return sign({user: email}, process.env.JWT_SECRET_KEY);
}

export { getToken, initializeTestDb, insertTestUser };
