require('dotenv').config();
let mongoose = require("mongoose");
var Schema = mongoose.Schema;

//connect to our mongooseDB Atlas with environment variable as the URI
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//defining our Person Schema
const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})
//convert our personSchema into a model
let Person = mongoose.model("Person", personSchema);

//create a person model
const createAndSavePerson = (done) => {
  let Francesca = new Person({
    name: "Francesca",
    age: 30,
    favoriteFood: ["Sushi", "Bakso"]
  });
  
  Francesca.save(function(err,data){
    if (err){
      console.log(err)
    }
    else{
      done(null, data)
    }
  })
};

let arrayOfPeople = [
  {name:"Anto", age:21, favoriteFood:["Nasi","Ikan"]},
  {name:"Budi", age:23, favoriteFood:["Mie", "Bakso"]},
  {name:"Charlie", age:25, favoriteFood:["Pizza"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people)=>{
    if (err){
      console.log(err);
    }
    else{
      done(null, people);
    }
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, personFound)=>{
    if (err){
      console.log(err);
    }
    else{
      done(null, personFound);
    }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err, foodFound)=>{
    if (err){
      console.log(err);
    }
    else{
      done(null, foodFound);
    }
  })
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
