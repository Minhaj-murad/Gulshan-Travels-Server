const express =require('express');
const app=express();
const cors =require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Gulshan Travels API Running');
});
app.listen(port, ()=>{
    console.log(`Gulshan Travels is running on port ${port}`);
})