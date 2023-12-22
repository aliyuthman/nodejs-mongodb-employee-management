const express = require("express");
const { Department } = require("../models/department");
const { route } = require("./employees");
const router = express.Router();

router.get("/", async (req, res) => {
  const departments = await Department.find().sort("departmentName");
  res.send(departments);
});

router.post("/", async (req, res) => {
  let department = new Department({
    departmentName: req.body.departmentName,
    location: req.body.location,
  });

  department = await department.save();
  res.send(department);
});

router.put("/:id", async (req, res) => {
  const department = await Department.findByIdAndUpdate(
    req.params.id,
    {
      departmentName: req.body.departmentName,
      location: req.body.location,
    },
    { new: true }
  );

  if (!department) return res.status(400).send("No such department");

  res.send(department);
});

router.delete("/:id", async (req, res) => {
  const department = await Department.findByIdAndDelete(req.params.id);

  if (!department) return res.status(404).send("No such department");

  res.send(department);
});

router.get("/:id", async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (!department) return res.status(404).send("No such department");

  res.send(department);
});

module.exports = router;
