// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Manager extends Employee {
    constructor(id, name, email, officenumber) {
        super(id, name, email);
        this.officenumber = officenumber;
    }
    getRole(){
        return "Manager";
    }


    getSchool() {
        return this.officenumber;
    }
}

module.exports = Manager;