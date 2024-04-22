const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

require('./config/mongoose.config');
require ('./routes/sighting.routes')(app);
require('dotenv').config();

app.listen(port, () => console.log(`***** listening on port ${port}`));