const express = require("express")
const db = require("./database")

const server = express()

server.use(express.json)



server.listen(8080, () => {
	console.log("server started")
})