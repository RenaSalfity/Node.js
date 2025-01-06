/*
רינה סלפיתי 209143098
קאסם חליליה 207674227
*/
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const { products } = require("./datajs8");
const { people } = require("./datajs8");

app.get("/", (req, res) => {
  res.send(
    '<h1> Home Page</h1><a href="/api/products">products</a><br><a href="/api/people">people</a>'
  );
});
app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image, price, desk } = product;
    return { id, name, image, price, desk };
  });
  res.json(newProducts);
});
app.get("/api/people", (req, res) => {
  const peopleList = products.map((people) => {
    const { id, name } = people;
    return { id, name };
  });
  res.json(peopleList);
});

// Route to return all users

app.get("/api/users", (req, res) => {
  res.json(people);
});

// Route to filter products by price
app.get("/api/products/:productPrice", (req, res) => {
  const productPrice = parseInt(req.params.productPrice);
  console.log(productPrice);

  if (isNaN(productPrice)) {
    return res.status(400).send("Invalid query parameters");
  }

  const filteredProducts = products.filter((p) => p.price >= productPrice);
  res.json(filteredProducts);
});

// Route to return a person by ID
app.get("/api/people/:id", (req, res) => {
  const peopleId = parseInt(req.params.id);
  const person = users.find((u) => u.id === peopleId);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("Person not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
