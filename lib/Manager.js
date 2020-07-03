// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./lib/Employee");

class Manager extends Employee{
    constructor(name, id, email) {
        super(name, id, email);
    }
}

module.exports = Manager;