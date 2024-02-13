const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 9285;


app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server listening on port [${port}]`);
})

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('/feed/:userId', (req, res) => {
    const { userId } = req.params;
    // Retrieve user preferences or interests based on userId
    // Check if user preferences are available
    // Filter articles based on user preferences
    res.status(200).json(filteredArticles);
});
app.get('/articles/:category', (req, res) => {
    const { category } = req.params;

    const {searchTerm, date } = req.query;//adds option to send date where all returned articles will be posted before that date


    res.status(200).json(articles);
});

app.get('/bookmarks/:userId', (req, res) => {
    const { userId } = req.params;


    res.status(200).json(bookmarkedArticles);
});

app.post('/report', (req, res) => {
    const { articleId, userId, reason, title } = req.body;

    // Check if articleId, userId, reason, and title are provided
    if (!articleId || !userId || !reason || !title) {
        return res.status(400).json({ message: 'articleId, userId, reason, and title are required' });
    }

    // Logic to save the report to the database or handle it accordingly
    // For demonstration, let's log the report details
    console.log(`Article ${articleId} ("${title}") reported by user ${userId} for reason: ${reason}`);

    res.status(200).json({ message: 'Article reported successfully' });
});


// Register a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists

    // Save user to database (or mock users array)

    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user by username

    //validate user

    // Return some token to the client
    res.status(200).json({ message: 'Login successful' });
});
app.post('/logout', (req, res) => {
    // Implement logout logic here
    res.status(200).json({ message: 'Logout successful' });
});