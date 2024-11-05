import { pool } from '../helpers/db.js';
import { Router } from 'express';
import { emptyOrRows } from '../helpers/utils.js';
import { auth } from '../helpers/auth.js';

const todoRouter = Router();

todoRouter.get('/', (req,res,next) => 
{
    pool.query('select * from task', (error,result) => {
        if (error) {
            return next(error); 
        }
        return res.status(200).json(emptyOrRows(result)); 
    });
});

todoRouter.post('/create', auth, (req,res,next) => 
{
   pool.query('insert into task (description) values ($1) returning *',
        [req.body.description],
        (error,result) => {
            if (error) {
                return next(error);
            }
            return res.status(200).json({id: result.rows[0].id});
        }
   );
});

todoRouter.delete('/delete/:id', auth, (req,res,next) => 
{
    const id = parseInt(req.params.id);

    pool.query('delete from task where id = $1',
        [id],
        (error,result) => {
            if (error) {
                return next(error);
            }
            return res.status(200).json({id: id});
        }
    );
});

export default todoRouter;