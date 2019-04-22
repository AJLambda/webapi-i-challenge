// implement your API here
const express = require("express"); // define the server;
const server = express(); // instantiate the server;
const port = "4000";
const db = require("./data/db.js"); // import the db functions;

//parses body and add it to req object
const parser = express.json();
server.use(parser);

////////////// GET REQUEST //////////////////

// GET ALL USERS

// When the client makes a GET request to /api/users:
// If there's an error in retrieving the users from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The users information could not be retrieved." }.
server.get("/api/users", (req, res) => {
  console.log("Users " + db.find());
  db.find()
    .then(user => {
      console.log("User -> ", user);
      res.json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

// GET SPECIFIC USER BY ID

// When the client makes a GET request to /api/users/:id:
// If the user with the specified id is not found:
// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.
// If there's an error in retrieving the user from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The user information could not be retrieved." }.

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});
