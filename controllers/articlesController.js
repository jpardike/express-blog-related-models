const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// Current Path = '/articles'

// GET new
router.get('/new', (req, res) => {
  res.render('articles/new');
});

router.get('/:articleId', (req, res) => {
  db.Article.findById(req.params.articleId, (err, articleById) => {
    if (err) return console.log(err);

    res.render('articles/show', {
      title: articleById.title,
      body: articleById.body
    });
  })
});

// POST create
router.post('/', (req, res) => {
  console.log('hit post route');
  console.log(req.body);

  db.Article.create(req.body, (err, newArticle) => {
    if (err) return console.log(err);

    res.redirect(`/articles/${newArticle.id}`);
  });
})

module.exports = router;