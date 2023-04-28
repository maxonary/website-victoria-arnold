import express, { request, response } from "express";
const { firestore, storage } = require("./firebase");
const upload = require("./multerConfig");
const app = express()


app.use(express.json());

app.use(express.static('dist'))

// Receive image
app.get("/gallery", async (req, res) => {
    try {
      const imagesRef = firestore.collection("images");
      const snapshot = await imagesRef.get();
      const imageUrls = [];
  
      snapshot.forEach((doc) => {
        const imageUrl = doc.data().url;
        imageUrls.push(imageUrl);
      });
  
      let html = "<!DOCTYPE html><html><body>";
      imageUrls.forEach((url) => {
        html += `<img src="${url}" alt="Image" style="width: 300px; height: auto; margin: 10px">`;
      });
      html += "</body></html>";
  
      res.send(html);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
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

// Create image
app.post("/images", upload.single("image"), async (req, res) => {
  try {
    const { originalname, mimetype, filename, path } = req.file;
    const imagesRef = firestore.collection("images");
    const result = await imagesRef.add({
      originalName: originalname,
      mimeType: mimetype,
      fileName: filename,
      url: path,
    });

    res.status(201).send({ id: result.id, url: path });
  } catch (error) {
    console.error("Error creating image:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Read images
app.get("/images", async (req, res) => {
  // Refer to the previous answer for this route
});

// Update image
app.put("/images/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { originalname, mimetype, filename, path } = req.file;
    const imageRef = firestore.collection("images").doc(id);

    await imageRef.update({
      originalName: originalname,
      mimeType: mimetype,
      fileName: filename,
      url: path,
    });

    res.send({ id, url: path });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete image
app.delete("/images/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const imageRef = firestore.collection("images").doc(id);
    const image = await imageRef.get();

    if (!image.exists) {
      res.status(404).send("Image not found");
      return;
    }

    const fileName = image.data().fileName;
    const file = storage.bucket().file(fileName);

    await Promise.all([imageRef.delete(), file.delete()]);

    res.send({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/about', (request, response) => {
    response.send('About me and my work')
})

app.get('/contact', (request, response) => {
    response.send('A contact form including name, mail, phone, text, and a send button')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on ${port}`)
    console.log(`http://localhost:${port}`)
    }
)