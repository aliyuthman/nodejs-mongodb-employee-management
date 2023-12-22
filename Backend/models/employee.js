const mongoose = require("mongoose");
const Department = require("./department");

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

exports.employeeSchema = employeeSchema;
exports.Employee = Employee;
