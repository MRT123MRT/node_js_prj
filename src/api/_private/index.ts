import express from 'express';
import middleware from './middleware';
import database from '../../../knex';

const router = express.Router();

router.use('/', middleware);

router.get('/', (req, res) => {
    res.status(200).json({
        msg: `Hello ${req.body.user.username} today is ${new Date().toDateString()} `
    });
});

router.get('/echo', (req, res) => {
    res.status(200).json({
        msg: `The message is ${req.query.msg}`
    });
});

let array: any[] = [];

router.get('/array', (req, res) => {
    res.status(200).json({ array });
});


router.get('/array/:index', (req, res) => {

    res.status(200).json({ value: array[req.params.index] });
});

router.post('/promote', async (req, res) => {

    if ((req.body.user.username as string).startsWith('admin') == false)
        return res.sendStatus(403);
        
    if(req.body.username == null || req.body.username.startsWith('admin') == true)
        return res.sendStatus(400); 

    try {
        let user = await database('users').where('username', req.body.username).first();
        user.username = 'admin_' + user.username;

        await database('users').where('username', req.body.username).update(user)

        res.status(200).json({ username: user.username });
    }
    catch
    {
        res.sendStatus(400);
    }
});


router.post('/array', (req, res) => {


    if ((req.body.user.username as string).startsWith('admin') == false)
        return res.sendStatus(403);

    array.push(req.body.array as any[]);

    res.status(200).json({ array });
});

router.put('/array/:index', (req, res) => {

    if ((req.body.user.username as string).startsWith('admin') == false)
        return res.sendStatus(403);

    try {

        array[parseInt(req.params.index)] = req.body.array;
    } catch
    {
        return res.sendStatus(400);
    }

    res.sendStatus(200);

});


router.delete('/array/:index', (req, res) => {

    if ((req.body.user.username as string).startsWith('admin') == false)
        return res.sendStatus(403);

    try {

        array = array.splice(parseInt(req.params.index), 1);
    } catch
    {
        return res.sendStatus(400);
    }

    res.sendStatus(200);
});

router.delete('/array/', (req, res) => {

    if ((req.body.user.username as string).startsWith('admin') == false)
        return res.sendStatus(403);

    array = [];

    res.sendStatus(200);
});



router.get('/getUser', (req, res) => {
    res.status(200).json(req.body.user);
});

export default router;
