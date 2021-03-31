//jshint esversion:6

const MongoClient  = require('mongodb').MongoClient;
const assert = require('assert');
// Replace the uri string with your MongoDB deployment's connection string.
//this is the connection url
const url= 'mongodb://localhost:27017';

const dbName= 'fruitsDB';
//the mongo client connects to the mongodb database
//if frutisdb does not exist, it creates a new one
const client = new MongoClient(url, {useNewUrlParser: true});

//use connect method to connect to the server

client.connect(function(err){
 assert.equal(null,err);
 console.log("successfully connected to the server");

 const db =client.db(dbName);
    findDocuments(db, function(){
 client.close();
    });
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents(data) in key value pairs
  collection.insertMany([
    {name : "Apple", 
    score : 8, 
    review : "Great Fruit!"
    }, 
    {
    name : "Orange", 
    score : 5, 
    review : "decent Fruit"
    },{
    name : "Pear", 
    score : 2, 
    review : "Basic Fruit"
    }
    //validation line
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

//how to find the documents

const findDocuments = function(db, callback){
    //get the document collection
    const collection = db.collection('fruits');
    //find some collections
    collection.find({}).toArray(function(err, fruits){
        assert.equal(err, null);
        console.log("found the following records:");
        console.log(fruits);
        callback(fruits);
    });
}