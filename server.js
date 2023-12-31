const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const app = express();
const auth = require("./middleware/auth");

// connect 
connectDB();

app.get("/", (req, res) => res.send("API is Running"))

//Init Middleware -> this helps the api to fetch the requests
app.use(express.json({ extended: false }))
app.use(cors())
// app.use(bodyParser.json())

// Define routes
app.use("/api/users", require('./routes/api/users'))
app.use("/api/auth", require('./routes/api/auth'))
app.use("/api/profile", auth, require('./routes/api/profile'))
app.use("/api/posts", require('./routes/api/posts'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));