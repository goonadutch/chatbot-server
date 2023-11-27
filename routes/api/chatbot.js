const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const router = express.Router()
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args))

const PALM_API_KEY = process.env.PALM_API_KEY
const PALM_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=${PALM_API_KEY}`

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.get("/", (_, res) => {
	res.status(200).render("CHAT API ONLINE")
})

router.post("/chat", async (req, res) => {
	let { messages } = req.body

	if(!messages) {
		return res.status(400).json({ error: "No messages provided" })
	}

	try {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt: {
					context:
						"Be a good chatbot that can answer almost any question that an adult may have. Try to answer with just simple sentences. Your response will not include any bold text, or points or any things. Your response will not exceed more than 5 lines. Just straight sentences. Try to be as concise as possible",
					examples: [
						{
							input: { content: "You will respond to all the things I say in just clean sentences. Just normal text. Don't include points or bold texts. Just plain sentences. Be very exact.  Make sure your response will be less than 5 sentences. It should not have paragraphs as well." },
							output: {
								content:
									"I am doing well, thank you for asking. I'll be exact and will make sure my response will be simple sentences than do not exceed 5 sentences and no paragraphs. How are you doing today? What would you like to speak about today?",
							},
						},
					],
					messages: messages,
				},
				temperature: 0.25,
				top_k: 40,
				top_p: 0.95,
				candidate_count: 1,
			}),
		}

		let response = await fetch(PALM_API_ENDPOINT, requestOptions)
		let data = await response.json()
		return res.status(201).json(data.candidates[0].content)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: `An erroroccurred: ${error}` })
	}
})

module.exports = router
