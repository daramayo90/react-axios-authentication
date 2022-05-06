const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 3500;

app.get('/', (req, res) => {
    //res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));