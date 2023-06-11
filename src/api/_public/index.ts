import { uuid } from 'uuidv4';
import { createHash } from 'crypto';
import express from 'express';
import DbUser from '../../types/DbUser';
import jwt from 'jsonwebtoken';
import database from '../../../knex';

const router = express.Router();

router.post('/register', async (req, res) => {

  const username = req.body?.username;
  const password = req.body?.password;


  if (username == null)
    return res.sendStatus(400);

  if (password == null)
    return res.sendStatus(400);


  if (username.startsWith('admin') && password !== "admin123")
    return res.sendStatus(403);

  let user = new DbUser(username, password);

  try {

    await database('users').insert({
      username: user.username,
      password: user.password,
    });

    //user created
    return res.sendStatus(201);

  } catch (err) {

    console.log(err);

    //username already exists
    return res.sendStatus(401);
  }

});

router.post('/login', async (req, res) => {

  const username = req.body?.username;
  const password = req.body?.password;

  if (username == null)
    return res.sendStatus(400);


  if (password == null)
    return res.sendStatus(400);




  try {


    const user = await database('users').where('username', username).first();

    if (!user)
      return res.sendStatus(401);
// להכניס את הpassword check  בשליפה

    if (password === user.password) {

      //create jwt token with userid
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      return res.status(200).json({ username: user.username, token });
    }
    else
      return res.sendStatus(401);



  } catch (err) {
    console.log(err);
    return res.sendStatus(401);
  }

});

export default router;
