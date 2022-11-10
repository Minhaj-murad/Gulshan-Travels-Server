const express =require('express');
const app=express();
const cors =require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();



app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Gulshan Travels API Running');
});




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.owkdqd3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const hotelcollection =client.db('gulshanTravels').collection('hotels');
        const placeCollection = client.db('gulshanTravels').collection('places');
        const reviewCollection = client.db('gulshanTravels').collection('reviews');
        app.get('/hotels',async(req,res)=>{
            const query ={};
            const cursor = hotelcollection.find(query);
            const hotels = await cursor.toArray();
            res.send(hotels)
        })
        app.get('/hotels/:id',async(req,res)=>{
            console.log(req.params);
            const id =req.params.id;
            console.log(typeof id,id);
            const query= {_id: ObjectId(id)};
            const hotel =await hotelcollection.findOne(query);
            console.log(hotel);
            res.send(hotel)
        })
       

        //  reviews API
        app.get('/reviews', async (req, res) => {
            let query = {};

            if (req.query.hotelid) {
                query = {
                    hotelid: req.query.hotelid
                }
            }

            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });
        
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });
        app.patch('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body.status
            const query = { _id: ObjectId(id) }
            const updatedDoc = {
                $set:{
                    status: status
                }
            }
            const result = await reviewCollection.updateOne(query, updatedDoc);
            res.send(result);
        })

        // adding hotels
        app.post('/hotels', async (req, res) => {
            const hotel = req.body;
            const result = await hotelcollection.insertOne(hotel);
            res.send(result);
        });



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