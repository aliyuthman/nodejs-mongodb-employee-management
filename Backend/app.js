const mongoose = require("mongoose");
const express = require("express");
const app = express();

const employees = require("./routes/employees");
const departments = require("./routes/departments");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/Employee-DB");
};

//router
app.use("/api/employees", employees);
app.use("/api/departments", departments);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running on " + port);
});

connect()
  .then(async (connection) => {
    console.log("Hello, Server!");
  })
  .catch((e) => console.error(e));
