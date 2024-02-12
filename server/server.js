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