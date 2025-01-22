const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const products = require("./products.json");

app.use(express.static(path.join(__dirname, "assets")));

app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
  }
});
app.use((req, res, next) => {
  //send error
  // res.status(404).send("<h1>File Not Found</h1>");
  //or send static error page
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});

/*
// ** Route for main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// ** Route for CSS
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'style.css'));
});

// ** Route for JS
app.get('/js.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'js.js'));
});

// ** Route for image
app.get('/1.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '1.jpg'));
});

// Route for about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
})
// 404 error handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
*/
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
