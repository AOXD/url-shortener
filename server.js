'use strict';

const express = require('express');
const path = require('path');
const mongo = require('mongodb').MongoClient;

const routes = require('./app/routes/index.js');
const api = require('./app/api/url-reducer.js');

const app = express();
const port = process.env.PORT || 8080;

mongo.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/url-shortener',
(err, db) => {
    if (err) throw new Error('Database unable to connect!');
    else console.log('Successfully connected to MognoDB on port 27017!');

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    db.createCollection("sites", {
        capped: true,
        size: null,
        max: 5000
    });

    routes(app, db);
    api(app, db);

    app.listen(port, () => {
        console.log(`App is now listening on port ${port}!`);
    });

});
