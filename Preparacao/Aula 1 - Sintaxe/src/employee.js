const Entitybase = require("./entityBase");
const Util = require("./util");


class Employee extends Entitybase {
    static #TAXES_PERCENTUAL = 0.2
    #grossPay = 5000.40

    get grossPay() {
        return Util.formatCurrency(this.#grossPay)
    }

    get netPay(){
        const result = this.#grossPay - (this.#grossPay * Employee.#TAXES_PERCENTUAL)
        return Util.formatCurrency(result)
    }
}

module.exports = Employee