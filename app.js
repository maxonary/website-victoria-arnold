import express, { request, response } from "express";

const app = express()
const port = 3002

app.get('/', (request, response) => {
    response.send("Hello World!")
    }
)

app.get('gallery', (request, response) => {
    response.send('View the gallery')
})

app.get('about', (request, response) => {
    response.send('About me and my work')
})

app.get('contact', (request, response) => {
    response.send('A contact form including name, mail, phone, text, and a send button')
})

app.listen(port, () => {
    console.log("Server running on port 3002")
    console.log("http://localhost:3002")
    }
)