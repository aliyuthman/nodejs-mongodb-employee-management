const express = require("express");
const { Employee } = require("../models/employee");
const { Department } = require("../models/department");
const router = express.Router();

router.get("/", async (req, res) => {
  const employees = await Employee.find().sort("name");
  res.send(employees);
});

router.post("/", async (req, res) => {
  const department = await Department.findById(req.body.departmentId);
  if (!department)
    return res.status(400).send("This department does not exist");

  let employee = new Employee({
    name: req.body.name,
    department: {
      _id: department._id,
      departmentName: department.departmentName,
      location: department.location,
    },
  });

  employee = await employee.save();

  res.send(employee);
});

router.put("/:id", async (req, res) => {
  const department = await Department.findById(req.body.departmentId);
  if (!department)
    return res.status(400).send("This department does not exist");

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,

    {
      name: req.body.name,
      ddepartment: {
        _id: department._id,
        departmentName: department.departmentName,
        location: department.location,
      },
    },
    { new: true }
  );

  if (!employee) return res.status(400).send("No such department");

  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);

  if (!employee) return res.status(404).send("No such department");

  res.send(employee);
});

router.get("/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) return res.status(404).send("No such employee");

  res.send(employee);
});

module.exports = router;
