// -------------------------- REQUIREMENTS
// Core Modules
// 3rd Party Modules
// Custom Modules
const express = require('express');
const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');

// -------------------------- MIDDLEWARE


// -------------------------- ROUTES

// Home Route
app.get('/', (req, res) => {
  res.render('index');
});


// -------------------------- LISTENER
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
