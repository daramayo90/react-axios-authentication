const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3500;

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});