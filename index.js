// implement your API here
const db = require("./data/db.js"); // import the db functions;

const express = require("express"); // define the server;
const server = express(); // instantiate the server;
const port = "4000";

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
      console.log("User: ", user);
      res.json(user);
    })
    .catch(error => {
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

////////////// POST REQUEST //////////////////
// CREATE USER

// If the request body is missing the name or bio property:

// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
// If the information about the user is valid:

// save the new user the the database.
// return HTTP status code 201 (Created).
// return the newly created user document.
// If there's an error while saving the user:

// cancel the request.
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the user to the database" }.

server.post("/api/users", (req, res) => {
  const user = req.body;

  if (user.name && user.bio) {
    res.status(201).json(user);
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
    return;
  }
  db.insert(user)
    .then(user => {
      console.log("New User:", user);
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

////////////// PUT REQUEST /////////////////
// UPDATE USER

// When the client makes a PUT request to /api/users/:id:

// If the user with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.
// If the request body is missing the name or bio property:

// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
// If there's an error when updating the user:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The user information could not be modified." }.
// If the user is found and the new information is valid:

// update the user document in the database using the new information sent in the reques body.
// return HTTP status code 200 (OK).
// return the newly updated user document.

server.put("/api/users/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const updateUser = req.body;

  if (!id) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
  if (updateUser.name && updateUser.bio) {
    res.status(201).json(updateUser);
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
    return;
  }
  db.update(id, updateUser)
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

////////////// DELETE REQUEST /////////////////
// DELETE USER
// When the client makes a DELETE request to /api/users/:id:

// If the user with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.
// If there's an error in removing the user from the database:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The user could not be removed" }.

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(user => {
      if (user) {
        console.log("deleted id:", user);
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

server.listen(port, () => console.log(`server listening on port: ${port}`));
