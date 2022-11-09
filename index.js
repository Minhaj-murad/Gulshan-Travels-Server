const express =require('express');
const app=express();
const cors =require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Gulshan Travels API Running');
});




const uri = "mongodb+srv://gulshanTravels:lwUvUABvkcruvA0q@cluster0.owkdqd3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{

    }

finally {
        
}

}
run().catch(error => console.log(error));






// app.get('/hotels/:id', (req, res) => {
//     const id =parseInt(req.params.id) ;
//     const selectedhotelsid = hotels.rooms.find(hotel => hotel.id == id);
//     console.log(selectedhotelsid);
//     res.send(selectedhotelsid);
// });
app.listen(port, ()=>{
    console.log(`Gulshan Travels is running on port ${port}`);
})