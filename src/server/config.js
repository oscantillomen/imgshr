const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const errorHandler = require('errorhandler');

const routes = require('../routes/index.js')

module.exports = app => {
    // Settings 
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout : 'main',
        partialDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: 'hbs',
        helpers: require('./helpers')
    }));

    app.set('view engine', '.hbs')

    // Middlewares
    app.use(cookieParser());
    app.use(session({ secret: "Shh, its a secret!" }));
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Routes
    routes(app);

    // static files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    // Errorhandlers
    if ('development' == app.get('env')) {
        app.use(errorHandler)
    }

    return app;
}