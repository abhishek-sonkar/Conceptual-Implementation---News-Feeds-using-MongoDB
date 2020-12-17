const express = require('express')
const app = express()
const port = 8080
const { newsArticleModel } = require('./connector');

const onePageArticleCount = 10

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/newFeeds', async (req, res) => {
    res.send(await newsArticleModel.find().skip(sanatize(req.query.offset, 0)).limit(sanatize(req.query.limit, 10)));
});

const sanatize = (val, defaultVal) => {
    if (val === null || val === undefined || isNaN(Number(val))) {
        return defaultVal;
    }
    return Number(val);
};

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;