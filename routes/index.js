var express = require('express');
var router = express.Router();
const {board} = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/list', async function(req, res, next) {
  const list = await board.findAll();
  console.log('list : ', list);
  res.render('list', {boards:list});
});
router.get('/add', function(req, res, next) {
  res.render('board');
});
router.post('/add', async (req, res, next)=> {
  console.log('등록 라우터!');
  console.log('req.body : ', req.body);
  await board.create({
    board_no: null,
    title: req.body.title,
    store_name: req.body.store_name,
    star: req.body.star,
    nick: req.body.nick,
    content: req.body.content,
  });
  res.redirect('/list');
});

module.exports = router;
