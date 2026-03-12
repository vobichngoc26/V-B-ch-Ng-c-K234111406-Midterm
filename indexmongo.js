const express = require("express");
const app = express();
const port = 3002;

const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(morgan("combined"));

app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: "login-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30 }
}));

const client = new MongoClient("mongodb://127.0.0.1:27017");

let database;

async function startServer() {
  await client.connect();
  database = client.db("MidtermTest");
  app.listen(port, () => {
    console.log("Server running on port", port);
  });
}
startServer();

const Customers = () => database.collection("customer");
const Employees = () => database.collection("employee");
const Products = () => database.collection("products");
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const hash = await bcrypt.hash(password, 10);

  if (role === "customer") {
    const exist = await Customers().findOne({ username });
    if (exist) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    await Customers().insertOne({
      username,
      password: hash,
      createdAt: new Date()
    });

  } else if (role === "employee") {
    const exist = await Employees().findOne({ username });
    if (exist) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    await Employees().insertOne({
      username,
      password: hash,
      createdAt: new Date()
    });

  } else {
    return res.status(400).json({ message: "Invalid role" });
  }

  res.json({ message: "Register success" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let user = await Employees().findOne({ username });
  let role = "employee";

  if (!user) {
    user = await Customers().findOne({ username });
    role = "customer";
  }

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Wrong password" });
  }

  req.session.username = user.username;
  req.session.role = role;

  res.json({
    message: "Login success",
    username: user.username,
    role: role
  });
});

app.get("/me", (req, res) => {
  if (!req.session.username) {
    return res.json({ logged: false });
  }

  res.json({
    logged: true,
    username: req.session.username,
    role: req.session.role
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logout success" });
  });
});
app.get("/products", async (req, res) => {
  const data = await Products().find({}).toArray();
  res.json(data);
});
const { ObjectId } = require("mongodb");

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Products().findOne({
    _id: new ObjectId(id)
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});
app.post("/products", async (req, res) => {

  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
    createdAt: new Date()
  };

  const result = await Products().insertOne(product);

  res.json({
    message: "Product created",
    id: result.insertedId
  });

});
app.put("/products/:id", async (req, res) => {

  const id = req.params.id;

  const update = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image
  };

  await Products().updateOne(
    { _id: new ObjectId(id) },
    { $set: update }
  );

  res.json({
    message: "Product updated"
  });

});
app.delete("/products/:id", async (req, res) => {

  const id = req.params.id;

  await Products().deleteOne({
    _id: new ObjectId(id)
  });

  res.json({
    message: "Product deleted"
  });

});