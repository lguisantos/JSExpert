const assert = require("assert")
const Employee = require("./employee");
const Util = require("./util");
const GENDER = {
    male: 'male',
    female: 'female'
}

{
    const employee = new Employee({
        name: 'XuxaDaSilva',
        gender: GENDER.female
    })

    assert.throws(() => employee.birthYear, { message: 'Age not found!' })
}

const CURRENT_YEAR = 2021
Date.prototype.getFullYear = ()=> CURRENT_YEAR // Deixando o valor fixo para não quebrar no futuro
{
    const employee = new Employee({
        name: 'Joaozinho',
        gender: GENDER.male,
        age: 20
    })

    assert.deepStrictEqual(employee.name, "Mr. Joaozinho")
    //nao temos metodo get para estas propriedades, logo retornam undefined
    assert.deepStrictEqual(employee.age, undefined)
    assert.deepStrictEqual(employee.gender, undefined)
    assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40))
    assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32))

    const EXPECTED_BIRTH_YEAR = 2021
    assert.deepStrictEqual(employee.birthYear, EXPECTED_BIRTH_YEAR)
}