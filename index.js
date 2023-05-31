const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT= process.enc.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });


// const { MongoClient } = require('mongodb');
// const cwd = process.cwd();
// const connectionStringURI = `mongodb://127.0.0.1:27017`;

// const client = new MongoClient(connectionStringURI);
// let db;

// const dbName = 'SocialNetwork';

// client.connect()
//     .then(() => {
//         console.log('connected succesfullly to MondoDB');
//         db = client.db(dbName);

//         app.listen(port, () => {
//             console.log(`Example app listening at http://localhost:${port}`);
//         });
//     })
//     .catch((err) => {
//         console.log('Mongo connection error: ', err.message);
//     });
// app.use(express.json())

// // Post request to create a single document to collection
// app.post('/create', (req, res) => {
//     db.collection('SocialNetworkCollection')
//         .insertOne()
//         .then()
//         .catch()

// });