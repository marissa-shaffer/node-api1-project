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
  
    const newUser = db.createUser({
      name: req.body.name,
      bio: req.body.bio,
    })
    .then((newUser) => {
      res.status(201).json(newUser)
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
  const id = req.params.id
  const user = db.getUserById(id)
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
      errorMessage: "The user information could not be retrieved.",
    })
  })
})

server.delete("/users/:id", (req, res) => {
  const id = req.params.id
  const user = db.getUserbyID(id)
  .then((user) => {
    if (user) {
      db.deleteUser(id)
      res.json(user).end()
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

server.put("/users/:id", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user.",
    })
  }

  db.updateUser(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist.",
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        errorMessage: "The user information could not be modified.",
      })
    })
})

server.listen(8080, () => {
	console.log("server started")
})