const express = require('express');
const cors = require('cors');

require('dotenv').config();
require('./config/connection');




// admin signup function
const { signup } = require('./controllers/admin.controller');
const port = 3625;

// import routes
const adminApi = require('./routes/admin.route');

const newsletterApi = require('./routes/newsletter.route');


const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json({ message: 'server work!' }))


// use routes
app.use('/admin', adminApi);
app.use('/newsletter', newsletterApi);


app.listen(port, () => {
    console.log(`server lister on http://127.0.0.1:${port}`);
    signup();
})