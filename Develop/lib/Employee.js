// TODO: Write code to define and export the Employee class
class Employee {
    // Just like constructor functions, classes can accept arguments
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    employeeName() {
        return this.name;
    }
    employeeId() {
        return this.id;
    }
    employeeEmail() {
        return this.email;
    }
}

module.exports = Employee;