const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 9285;
const bcrypt = require('bcrypt');
const {Sequelize, DataTypes} = require('sequelize');
const session = require('express-session');
const passport = require('passport');
const env = require('dotenv');
const saltRounds = 10;

env.config();
app.use(bodyParser.json());
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASS, {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
});
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false // Ensure id is not nullable
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false // Ensure email is not nullable
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false // Ensure password is not nullable
    },
    preferences: {
        type: DataTypes.TEXT // preferences can be nullable
    }
}, {
    // Specify existing table name
    tableName: 'users',
    // Disable Sequelize's automatic timestamps
    timestamps: false
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully to pg.');
    } catch (error) {
        console.error('Unable to connect to the pg database:', error);
    }
})();
app.listen(port, () => {
    console.log(`Server listening on port [${port}]`);
})

app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('/feed/:userId', (req, res) => {
    const {userId} = req.params;//replace id with auth tokens
    // Retrieve user preferences or interests based on userId
    // Check if user preferences are available
    // Filter articles based on user preferences
    res.status(200).json(filteredArticles);
});
app.get('/articles/:category', (req, res) => {
    const {category} = req.params;

    const {searchTerm, date} = req.query;//adds option to send date where all returned articles will be posted before that date
// replace date with piginate

    res.status(200).json(articles);
});

app.get('/bookmarks/:userId', (req, res) => {
    const {userId} = req.params;//replace user id with tokens


    res.status(200).json(bookmarkedArticles);
});//add post and delete

app.post('/report', (req, res) => {
    const {articleId, userId, reason, title} = req.body;

    // Check if articleId, userId, reason, and title are provided
    if (!articleId || !userId || !reason || !title) {
        return res.status(400).json({message: 'articleId, userId, reason, and title are required'});
    }

    // Logic to save the report to the database or handle it accordingly
    // For demonstration, let's log the report details
    console.log(`Article ${articleId} ("${title}") reported by user ${userId} for reason: ${reason}`);

    res.status(200).json({message: 'Article reported successfully'});
});


// Register a new user
app.post('/register', (req, res) => {
    const {username, password} = req.body;

    // Check if user already exists

    // Save user to database (or mock users array)

    res.status(201).json({message: 'User registered successfully'});
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    // Find user by username

    //validate user

    // Return some token to the client
    res.status(200).json({message: 'Login successful'});
});
app.post('/logout', (req, res) => {
    // Implement logout logic here
    res.status(200).json({message: 'Logout successful'});
});