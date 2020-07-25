// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const employee = require("./employee");
class manager extends employee {
    constructor(id, name, email, officenumber) {
        super(id, name, email);
        this.officenumber = officenumber;
    }
    getRole(){
        return "Manager";
    }


    getSchool() {
        return this.school;
    }
}

module.exports = manager;