const express =require('express');
const app=express();
const cors =require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Gulshan Travels API Running');
});

const hotels=require('./data.json');

app.get('/hotels', (req, res) =>{
    res.send(hotels);
});

app.listen(port, ()=>{
    console.log(`Gulshan Travels is running on port ${port}`);
})