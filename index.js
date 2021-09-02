const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    updateDatabase()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

async function updateDatabase() {
  try {
    const firstRecipe = await Recipe.create({
      title: "Spaghetti Carbonara",
      level: "Easy Peasy",
      ingredients: ["3 large free-range egg yolks", "40 g Parmesan cheese , plus extra to serve", "1 x 150 g piece of higher-welfare pancetta", "200 g dried spaghetti", "1 clove of garlic", "extra virgin olive oil"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1558_1_1436795948.jpg?tr=w-800,h-1066",
      duration: 10,
      creator: "Gennaro",
    });

    console.log(firstRecipe.title);

    const allRecipes = await Recipe.insertMany(data);

    allRecipes.forEach((recipe) => {
      console.log(recipe.title);
    });

    await Recipe.findOneAndUpdate(
      {title:"Rigatoni alla Genovese"},
      {duration: 100},
    );

    await Recipe.deleteOne({title: "Carrot Cake"});
    console.log("Carrot Cake successfully deleted");

  } catch (e) {
      console.log("error occurred", e);
  } finally {
      mongoose.connection.close();
  }

}