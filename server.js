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
            errorMessage: "The user information could not be retrieved."
        })
    }

    if(!id) {
        return res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
})

server.listen(8080, () => {
	console.log("server started")
})