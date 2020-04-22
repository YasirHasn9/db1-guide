const express = require("express")
const welcomeRouter = require("./welcome/welcome-router")
const messagesRouter = require("./messages/messages-router")

const server = express()
const port = process.env.PORT || 4000

server.use(express.json())
server.use("/", welcomeRouter)
server.use("/messages", messagesRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})


// SELECT <columns> from <table> where columns = value 
// example
// select email 
// from users
// where name = "name user";
