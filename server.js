const express = require("express")
const db = require("./database")

const server = express()

server.use(express.json)

server.get("/", (req, res) => {
   res.json({
       message: "Welcome to my User API"
   })  
})

server.get("/users", (req, res) => {
    const users = db.getUsers()

    if(users) {
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

    if (user) {
        res.json(user)
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved.",
        })
    }

    if(!id) {
        return res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    }
})

server.post("/users", (req, res) => {
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
    })
	if (!req.body.name || !req.body.bio) {
		return res.status(400).json({
			errorMessage: "Please provide name and bio for the user.",
		})
	} if (newUser) {
        res.status(201).json(newUser)
    } else {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database",
        })
    }

	res.json(newUser)
})

server.put("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

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

server.delete("/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)
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

server.listen(8080, () => {
	console.log("server started")
})