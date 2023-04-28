import express, { request, response } from "express";

const app = express()
const port = 3000

app.get('/', (request, response) => {
    response.send("Hello World!")
    }
)

app.get('/gallery', (request, response) => {
    response.send('View the gallery')
})

app.get('/gallery/:slug', (request, response) => {
    const requestString = request.params.slug
    
    const imageDbFake = [
    ["chocolate-chip", "Cocolate Chip","A tasty, sugary cookie filled with chocolate chips.", 3.50],
    ["white-chocolate", "White Chocolate", "A tasty, sugary cookie made of white chocolate.", 3.95], 
    ["vegan", "Vegan", "A not so tasty, sugary cookie that is based on plant products.", 2.35]
    ];

    if (imageDbFake.some(arr => arr.includes(requestString)) == true) {
        const imageData = imageDbFake.find(arr => arr.includes(requestString))
        const name = imageData[1]
        const description = imageData[2]
        const price = imageData[3]
        response.send(`${name} <br/> ${description}. <br/> It costs $${price}.`)
    } else {
        response.send(`An image with the name "${requestString}" could not be found.`)
    }
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