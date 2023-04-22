import express, { request, response } from "express";

const app = express()
const port = 3002

app.get('/', (request, response) => {
    response.send("Hello World!")
    }
)

app.get('/gallery', (request, response) => {
    //response.send('View the gallery')
    const y = `x^2 - 3x + 4`
    const p = 3
    const q = 1.5
    response.send(`PQ-Formula of ${y} is calculated to x=${(-p)/2 + Math.sqrt((p/2)**2 - q)}`)
})

app.get('/about', (request, response) => {
    response.send('About me and my work')
})

app.get('/contact', (request, response) => {
    response.send('A contact form including name, mail, phone, text, and a send button')
})

app.listen(port, () => {
    console.log(`Server running on ${port}`)
    console.log(`http://localhost:${port}`)
    }
)