const mongoose = require("mongoose");

// Department Schema
const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});


const Department = mongoose.model("Department", departmentSchema);

exports.Department = Department;
