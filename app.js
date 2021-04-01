//jshint esversion:6

const mongoose  = require('mongoose');
//make connection to mongodb server and looks for fruitsDB
mongoose.connect("mongodb://localhost:27017/fruitDB",{ useNewUrlParser:true });

const fruitSchema =new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required for data entry!"] 
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

//mongoose model
const Fruit =mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit ({
  name: "Apple",
  rating: 10,
  review: "Ok I reckon."
});

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema //embedding a fruit document inside thedocuemt.
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "great fruit"
});

const  person = new Person({
  name: "Amy",
  age: 37,
  favouriteFruit: pineapple
});
const grapes = new Fruit({
  name: "grapes",
  score: 10,
  review: "goes with everything"
});

const  person2 = new Person({
  name: "John",
  age: 30,
  favouriteFruit: grapes
});
person2.save();
person.save(); 

const kiwi = new Fruit({
  name: "kiwi",
  score: 5,
  review: "average"
});
const orange = new Fruit({
  name: "grape friuit",
  score: 10,
  review: "delcious"
});

Fruit.insertMany([pineapple, kiwi, grapes], function(err){
  if(err){
    console.log(err);
  } else{
    console.log("success");
  }
});
// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("successfully saved to db");
//   }
// });
Fruit.find(function(err,fruits){
  if (err){
    console.log(err);
  } else {
    mongoose.connection.close();
//loop through fruits array from database and console.log the fruits name.
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});
// Fruit.updateOne({name:"grapes"},{name:"peach"}, function(err){
//   if(err){
//     console.log(err);
//   }else {
//     console.log("Successfully updated fruit");
//   }
// });

Fruit.deleteOne({name: "Apple"}, function(err){
  if(err){
    console.log(err);
  }else {
    console.log("Successfully deleted document");
  }
});
  
Person.deleteOne({name: "John", function(err){
  if (err){
    console.log(err);
  } else {
    console.log("successfully deleted people");
  }
}});

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