import express from 'express';
import _public from './_public'; //using word 'public' directly causes errors in typescript and express
import _private from './_private'; //using word 'public' directly causes errors in typescript and express

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    data: 'API - 👋🌎🌍🌏',
    status: 'Ok',
  });
});

router.use('/public', _public);
router.use('/private', _private);

export default router;
