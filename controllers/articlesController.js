const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// Current Path = '/articles'

// GET index
router.get('/', (req, res) => {
  // Get data for all articles
  db.Article.find({}, (err, allArticles) => {
    if (err) return console.log(err);

    const context = { allArticles };

    // render template
    res.render('articles/index', context);
  })
});

// GET new
router.get('/new', (req, res) => {
  res.render('articles/new');
});

// GET show
router.get('/:articleId', (req, res) => {
  db.Article.findById(req.params.articleId, (err, articleById) => {
    if (err) return console.log(err);
    
    res.render('articles/show', articleById);
  })
});

// POST create
router.post('/', (req, res) => {
  db.Article.create(req.body, (err, newArticle) => {
    if (err) return console.log(err);

    res.redirect(`/articles/${newArticle.id}`);
  });
});

// GET edit
router.get('/:articleId/edit', (req, res) => {
  db.Article.findById(req.params.articleId, (err, foundArticle) => {
    if (err) return console.log(err);

    const context = {
      article: foundArticle,
    }

    res.render('articles/edit', context);
  });
})

// DELETE destroy
router.delete('/:articleId', (req, res) => {
  db.Article.findByIdAndDelete(req.params.articleId, (err) => {
    if (err) return console.log(err);

    res.redirect('/articles');
  });
});

// PUT update
router.put('/:articleId', (req, res) => {
  // make query to update database
  db.Article.findByIdAndUpdate(
    req.params.articleId,
    req.body,
    { new: true },
    (err, updatedArticle) => {
      if (err) return console.log(err);
      
      // redirect to show route for that article
      res.redirect(`/articles/${updatedArticle.id}`);
    }
  );
});

module.exports = router;