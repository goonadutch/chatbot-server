const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 3003

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// API Routes
let chatBotAPI = require("./routes/api/chatbot")

app.use("/api/chatbot", chatBotAPI)

app.get("/", (_, res) => {
	res.status(200).send({ text: "API ENDPOINT ACTIVE" })
})
