const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());




//Mongodb Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dtgtx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
    await client.connect();

    //Sofa item data
    const furnitureStock = client.db('furnitureSofa').collection('inventoryItem');
    

  //jwt ///Auth
  app.post('/login', async(req, res)=>{
  const user = req.body;
  const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {
    expiresIn:'1d'
  });
  res.send({accessToken});
  })






    app.get('/myItem', async(req, res) => {
      const email = req.query.email;
        const query = {email: email};
        const cursor = furnitureStock.find(query);
        const products = await cursor.toArray();
       res.send(products);
    })

    app.get('/inventoryItem', async(req, res) => {
      const query = {};
      const cursor = furnitureStock.find(query);
      const products = await cursor.toArray();
     res.send(products);
  })
    







    //Add data
    //get data
 
    app.post("/inventoryItem", async(req, res) => {
    const inventory = req.body;
    if(!inventory.name || !inventory.price){
        return res.send({success: false, error: "Please Provide all information Properly"});
    }
    const result = await furnitureStock.insertOne(inventory);
    })

//put
app.put("/inventoryItem/:id", async(req, res) => {
const id = req.params.id;
const updateUser = req.body;
const filter = {_id: ObjectId(id)};
const options = { upsert: true};
const updateDoc = {
$set: {
  quantity: updateUser.quantity
}

};
const result = await furnitureStock.updateOne(filter, updateDoc, options)
res.send(result);

})






  //Delete
  app.delete('/inventoryItem/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await furnitureStock.deleteOne(query);
    res.send(result);
  })

  app.delete('/myItem/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await furnitureStock.deleteOne(query);
    res.send(result);
  })



  //Chair data Item

  const furnitureChair = client.db('furnitureChair').collection('chairInventory');
    app.get('/chairInventory', async(req, res) => {
        const query = {};
        const cursor = furnitureChair.find(query);
        const products = await cursor.toArray();
       res.send(products);
    })


    app.get('/chairItem', async(req, res) => {
      const email = req.query.email;
        const query = {email: email};
        const cursor = furnitureChair.find(query);
        const products = await cursor.toArray();
       res.send(products);
    })






    //Add data
    app.post("/chairInventory", async(req, res) => {
    const inventory = req.body;
    if(!inventory.name || !inventory.price){
        return res.send({success: false, error: "Please Provide all information Properly"});
    }
    const result = await furnitureChair.insertOne(inventory);
    })



  //Delete
  app.delete('/chairInventory/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await furnitureChair.deleteOne(query);
    res.send(result);
  })




  //Bed data Item

  const furnitureBed = client.db('furnitureBed').collection('bedInventory');
    app.get('/bedInventory', async(req, res) => {
        const query = {};
        const cursor = furnitureBed.find(query);
        const products = await cursor.toArray();
       res.send(products);
    })


    app.get('/bedItem', async(req, res) => {
      const email = req.query.email;
        const query = {email: email};
        const cursor = furnitureBed.find(query);
        const products = await cursor.toArray();
       res.send(products);
    })







    //Add data
    app.post("/bedInventory", async(req, res) => {
    const inventory = req.body;
    if(!inventory.name || !inventory.price){
        return res.send({success: false, error: "Please Provide all information Properly"});
    }
    const result = await furnitureBed.insertOne(inventory);
    })



  //Delete
  app.delete('/bedInventory/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await furnitureBed.deleteOne(query);
    res.send(result);
  })




//Computer Table
  const furnitureTable = client.db('furnitureTable').collection('tableInventory');
    app.get('/computerInventory', async(req, res) => {
        const query = {};
        const cursor = furnitureTable.find(query);
        const products = await cursor.toArray();
       res.send(products);
    })

    app.get('/computerItem', async(req, res) => {
      const email = req.query.email;
        const query = {email: email};
        const cursor = furnitureTable.find(query);
        const products = await cursor.toArray();
       res.send(products);
    })








    //Add data
    app.post("/computerInventory", async(req, res) => {
    const inventory = req.body;
    if(!inventory.name || !inventory.price){
        return res.send({success: false, error: "Please Provide all information Properly"});
    }
    const result = await furnitureTable.insertOne(inventory);
    })



  //Delete
  app.delete('/computerInventory/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await furnitureTable.deleteOne(query);
    res.send(result);
  })



//Single Table

const furnitureSingle = client.db('furnitureSingleSofa').collection('singleInventory');
app.get('/singleInventory', async(req, res) => {
    const query = {};
    const cursor = furnitureSingle.find(query);
    const products = await cursor.toArray();
   res.send(products);
})

app.get('/singleItem', async(req, res) => {
  const email = req.query.email;
    const query = {email: email};
    const cursor = furnitureSingle.find(query);
    const products = await cursor.toArray();
   res.send(products);
})





//Add data
app.post("/singleInventory", async(req, res) => {
const inventory = req.body;
if(!inventory.name || !inventory.price){
    return res.send({success: false, error: "Please Provide all information Properly"});
}
const result = await furnitureSingle.insertOne(inventory);
})



//Delete
app.delete('/singleInventory/:id', async(req, res) => {
const id = req.params.id;
const query = {_id: ObjectId(id)};
const result = await furnitureSingle.deleteOne(query);
res.send(result);
})



//Office Table Inventory
const furnitureOfficeTable = client.db('furnitureOfficeTable').collection('officeInventory');
app.get('/tableInventory', async(req, res) => {
    const query = {};
    const cursor = furnitureOfficeTable.find(query);
    const products = await cursor.toArray();
   res.send(products);
})


app.get('/tableItem', async(req, res) => {
  const email = req.query.email;
    const query = {email: email};
    const cursor = furnitureOfficeTable.find(query);
    const products = await cursor.toArray();
   res.send(products);
})




//Add data
app.post("/tableInventory", async(req, res) => {
const inventory = req.body;
if(!inventory.name || !inventory.price){
    return res.send({success: false, error: "Please Provide all information Properly"});
}
const result = await furnitureOfficeTable.insertOne(inventory);
})



//Delete
app.delete('/tableInventory/:id', async(req, res) => {
const id = req.params.id;
const query = {_id: ObjectId(id)};
const result = await furnitureOfficeTable.deleteOne(query);
res.send(result);
})














}
catch(error) {
    console.log(error)
}

    finally{

    }

}
run().catch(console.dir);














app.get('/', (req, res) => {
    res.send('Furniture Stock is running')
})

app.listen(port, () => {
    console.log('furniture is selling', port);
})