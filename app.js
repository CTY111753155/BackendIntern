const express = require('express');
const app = express();

const CurrencyRoutes = require('./routes/currency');
app.use(CurrencyRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`);
})