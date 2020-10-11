const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

//  joins all given path segments together using the platform-specific separator
// path.join('./','AA','BB') will return './AA/BB'
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

require("dotenv").config({ path: "variables.env" });
const User = require("./models/User");
const Post = require("./models/Post");

mongoose
  .connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true,useUnifiedTopology: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
