const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const router = express.Router()
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args))

router.get("/", (_, res) => {
	res.status(200).render("CHAT API ONLINE")
})

module.exports = router
