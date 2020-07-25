// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const employee = require("./employee");
class engineer extends employee {
    constructor(id, name, email, school) {
        super(id, name, email);
        this.school = school;
    }
    getRole(){
        return "Intern";
    }


    getSchool() {
        return this.school;
    }
}

module.exports = engineer;