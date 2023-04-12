const EmployeesDB = {
  employees: require("../model/Employees.json"),
};

const getAllEmployees = (req, res) => {
  res.json(EmployeesDB.employees);
};

module.exports = { getAllEmployees };
