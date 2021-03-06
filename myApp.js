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
  Person.findById({_id:personId}, function(err, found){
    if(err){
      console.log(err);
    }
    else{
      done(null, found);
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId}, function(err, person){
    if (err){
      console.log(err);
    }
    else{
      person.favoriteFoods.push(foodToAdd);
      person.save((err, updated)=>{
        if(err){
          console.log(err);
        }
        else{
          done(null, updated);
        }
      })
    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new: true}, (err, updated)=>{
    if(err){
      console.log(err);
    }
    else{
      done(null, updated)
    }
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deleted)=>{
    if (err){
      console.log(err);
    }
    else{
      done(null,deleted);
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err, removed)=>{
    if(err){
      console.log(err);
    }
    else{
      done(null, removed);
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: {$all:[foodToSearch]}})
    .sort({name:"asc"})
    .limit(2)
    .select("-age")
    .exec((err, filteredResult)=>{
      if(err){
        console.log(err);
      }
      else{
        done(null, filteredResult);
      }
    })  
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
