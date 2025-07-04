const express = require('express');
const router = express.Router();
const fn = require('../common/fn');
const sample = require('../modules/sample/sampleController');
const account = require('../modules/account/accountController');
const hero = require('../modules/hero/heroControllers');
const menu = require('../modules/menuMakanan/menuControllers');

router.get('/', async (req, res) => {
  res.send('Welcome to Node Api');
});


router.post('/login', fn.otorisasi(['public']), account.login);
router.post('/register', fn.otorisasi(['public']), account.register);
router.get('/users', fn.otorisasi(['admin']), sample.getData);
router.post('/addData', fn.otorisasi(['admin']), sample.addData);
router.patch('/updateData', fn.otorisasi(['admin']), sample.updateData);
router.delete('/delData', fn.otorisasi(['admin']), sample.delData);

// Hero routes
router.get('/hero', fn.otorisasi(['public']), hero.getAllHero);
router.get('/hero/:id', fn.otorisasi(['public']), hero.getHeroById);
router.post('/hero', fn.otorisasi(['admin']), hero.addHero);
router.patch('/hero/:id', fn.otorisasi(['admin']), hero.updateHero);
router.delete('/hero/:id', fn.otorisasi(['admin']), hero.deleteHero);

// Menu Makanan routes
router.get('/menu', fn.otorisasi(['public']), menu.getAllMenu);
router.get('/menu/:id', fn.otorisasi(['public']), menu.getMenuById);
router.post('/menu', fn.otorisasi(['admin']), menu.addMenu);
router.patch('/menu/:id', fn.otorisasi(['admin']), menu.updateMenu);
router.delete('/menu/:id', fn.otorisasi(['admin']), menu.deleteMenu);

module.exports = router;


//  1. jika tidak ada fn.otorisasi => maka public,
//  2. jika ada fn.otorisasi tanpa role => maka login,
//  3. jika ada fn.otorisasi dengan role => maka login dan role harus sesuai,
