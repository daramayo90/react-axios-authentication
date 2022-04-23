const app = require('./app');
const port = process.env.PORT || 8800;

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});