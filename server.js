const express = require("express")
const db = require("./database")

const server = express()

server.use(express.json())

server.post("/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user",
        })
    }
    
    db.createUser(req.params.id)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      })
    })
})


server.get("/users", (req, res) => {
  const users = db.getUsers()

 if (users) {
    res.json(users)
  } else {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved."
    })
  }
})

server.get("/users/:id", (req, res) => {
  db.getUserById(req.params.id)
  .then((user) => {
    if (user) {
      res.json(user)
    } else {
      res.status.apply(404).json({
        message: "The user with the specified ID does not exist.",
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      errorMessage: "The user information could not be retrieved.",
    })
  })
})

server.delete("/users/:id", (req, res) => {
  db.deleteUser(req.params.id)
  .then((user) => {
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      errorMessage: "The user could not be removed" ,
    })
  })
})

server.listen(8080, () => {
	console.log("server started")
})