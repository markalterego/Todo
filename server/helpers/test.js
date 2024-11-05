import fs from 'fs';
import path from 'path';
import { pool } from './db.js';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

const __dirname = import.meta.dirname;
const { sign } = jwt;

const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname,'../db.sql'), 'utf-8');
    pool.query(sql);
}

const insertTestUser = (email, password, next) => {
    hash(password, 10, (error, hashedPassword) => {
        pool.query('insert into account (email,password) values ($1,$2)',
            [email,hashedPassword]);
    });
}

const getToken = (email) => {
    return sign({user: email}, process.env.JWT_SECRET_KEY);
}

export { initializeTestDb, insertTestUser, getToken};