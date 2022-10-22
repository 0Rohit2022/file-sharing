const express = require('express');
require('dotenv').config()
require('../db/server')
const app = express();
const PORT = process.env.PORT || 8000;
const allrouters = require('../routers/routers');

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');
app.use('/', allrouters)

app.listen(PORT, () => {
    console.log(`Server is running live on port no.${PORT}`);
})