const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/user', userRoute);

app.get('/', (req, res) => {
    res.send('This is backend');
})

app.listen(5000, () => {
    console.log('Server started on port: 5000');
})