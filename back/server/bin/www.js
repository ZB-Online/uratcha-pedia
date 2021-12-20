const express = require('express');
const app = express();
const router = require('../routes/index');
const cookieParser = require('cookie-parser')
const PORT = 7979;

app.use(express.static('public'));
app.use(express.json());
app.use('/', router);
app.use(cookieParser())

app.listen(PORT, () => console.log(`Dev Server listening on port ${PORT}!`));
